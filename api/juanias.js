import { merchants } from '../src/data/merchants.js'

const CODE = ['FIN', 'BROAD', 'PEAK', '26'].join('')

function normalize(text = '') {
  return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function compactCatalog() {
  return merchants.flatMap((merchant) =>
    merchant.products.map((product) => ({
      merchantId: merchant.id,
      merchantName: merchant.name,
      sector: merchant.sector,
      city: merchant.city,
      address: merchant.address,
      productId: product.id,
      productName: product.name,
      price: product.price,
      description: product.description
    }))
  )
}

function findCatalogItem(catalog, merchantId, productId) {
  return catalog.find((item) => item.merchantId === merchantId && item.productId === productId)
}

function quickLocalAnswer(query, catalog) {
  const q = normalize(query)
  const isConversational = /^(hola|buenas|hey|que tal|qué tal|gracias|ok|vale|quien eres|quién eres)/.test(q)
  if (isConversational || q.length < 8) {
    return {
      answer: 'Soy JuanIA. Puedo hablar contigo como asesor de compra local y, cuando me digas qué necesitas, buscaré dentro del catálogo real de faciliteaGO. Por ejemplo: “voy a hacer una reforma”, “necesito un regalo para un niño” o “quiero algo dulce barato”.',
      recommendations: [],
      followUp: '¿Qué necesitas comprar o resolver?',
      intent: 'conversacion',
      source: 'local_no_key'
    }
  }

  const terms = q.split(/\s+/).filter((word) => word.length > 2)
  const toolIntent = ['herramienta', 'herramientas', 'reforma', 'bricolaje', 'arreglar', 'montar', 'pintar', 'destornillador', 'tornillo', 'cinta', 'llave', 'linterna'].some((term) => q.includes(term))
  const candyIntent = ['dulce', 'gominola', 'chuche', 'caramelo', 'anillo'].some((term) => q.includes(term))
  const giftIntent = ['regalo', 'niño', 'nino', 'infantil', 'juguete'].some((term) => q.includes(term))
  const cheapIntent = ['barato', 'menos de 5', 'menos de 10', 'económico', 'economico'].some((term) => q.includes(term))

  const scored = catalog.map((item) => {
    const hay = normalize(`${item.productName} ${item.description} ${item.merchantName} ${item.sector} ${item.city}`)
    const sector = normalize(item.sector)
    const product = normalize(item.productName)
    let score = 0
    for (const term of terms) if (hay.includes(term)) score += 2
    if (toolIntent) {
      if (sector.includes('ferreter')) score += 30
      if (['destornillador', 'cinta', 'llave', 'guante', 'brida', 'cola', 'linterna', 'alcayata', 'pila', 'metro', 'tornillo', 'cuter', 'cúter', 'brocha', 'silicona', 'pinza'].some((term) => product.includes(term))) score += 25
      if (sector.includes('dulces') || product.includes('anillo')) score -= 100
    }
    if (candyIntent) {
      if (sector.includes('dulces')) score += 25
      if (['anillo', 'caramelo', 'regaliz', 'gominola', 'piruleta', 'mora'].some((term) => product.includes(term))) score += 20
    }
    if (giftIntent) {
      if (['juguetes', 'dulces', 'regalos', 'souvenirs', 'cultura'].includes(item.sector)) score += 15
    }
    if (cheapIntent && item.price <= 10) score += 10
    return { ...item, score }
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.price - b.price)

  const picks = scored.slice(0, toolIntent ? 3 : 4)
  if (!picks.length) {
    return {
      answer: 'No veo una coincidencia clara en el catálogo. Antes de inventarme algo, prefiero afinar: ¿buscas un producto concreto, un regalo, algo por presupuesto o una tienda cerca de Las Ramblas?',
      recommendations: [],
      followUp: 'Dime uso, presupuesto aproximado y si prefieres recogida o envío.',
      intent: 'necesita_aclaracion',
      source: 'local_no_key'
    }
  }

  return {
    answer: toolIntent
      ? 'Para una reforma no te recomendaría cualquier cosa barata: iría a ferretería y priorizaría básicos útiles. Estas opciones son del catálogo real.'
      : 'He buscado dentro del catálogo real de faciliteaGO y estas son las opciones que mejor encajan con lo que pides.',
    recommendations: picks.map((item) => ({
      ...item,
      reason: toolIntent
        ? `Producto útil para bricolaje o arreglos de casa, disponible en ${item.merchantName}.`
        : `Encaja con tu petición y se puede comprar en ${item.merchantName}.`
    })),
    followUp: toolIntent ? '¿La reforma es para pintar, montar muebles o hacer pequeñas reparaciones?' : '¿Quieres que lo filtre por precio, cercanía o tipo de entrega?',
    intent: toolIntent ? 'herramientas_reforma' : 'busqueda_catalogo',
    source: 'local_no_key'
  }
}

function safeJson(text) {
  const clean = String(text || '').replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim()
  const start = clean.indexOf('{')
  const end = clean.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON object found')
  return JSON.parse(clean.slice(start, end + 1))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { query = '', history = [] } = req.body || {}
  const catalog = compactCatalog()

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json(quickLocalAnswer(query, catalog))
  }

  const system = `Eres JuanIA, un asesor conversacional de compra local integrado en faciliteaGO.

Tu comportamiento debe parecer humano, no un bot de búsqueda:
- Puedes conversar aunque no recomiendes nada.
- No empieces siempre con "te propongo 4 opciones".
- No tienes que recomendar siempre. Si el usuario saluda, duda o pregunta algo general, responde normal y pregunta algo útil.
- Si la petición es ambigua, haz una pregunta de seguimiento antes de recomendar demasiadas cosas.
- Si la petición es concreta, recomienda entre 1 y 3 productos. Solo usa 4 si de verdad aporta valor.
- Razona con sentido común. Si pide reforma, herramientas o bricolaje, no recomiendes dulces ni souvenirs.
- Si pide regalos, explica para quién encaja cada producto.
- Si pide presupuesto, respétalo.
- Habla en español natural, cercano, como un dependiente experto de comercio local.

Regla crítica de catálogo:
- Solo puedes recomendar productos que aparezcan en CATALOGO.
- No inventes comercios, productos, precios, stock, horarios ni promociones.
- Si no hay producto adecuado, dilo y pregunta para afinar.

Devuelve SOLO JSON válido, sin markdown:
{
  "answer":"respuesta conversacional natural",
  "recommendations":[{"merchantId":"","productId":"","reason":"motivo concreto y humano"}],
  "followUp":"pregunta breve opcional",
  "intent":"etiqueta corta"
}`

  const prompt = `${system}

Contexto de negocio:
- FaciliteaGO es un marketplace de comercio local en Cataluña.
- Cashback general: 4%.
- Cupón que el usuario puede introducir manualmente en carrito: ${CODE}.

Historial reciente de conversación:
${JSON.stringify(history.slice(-10))}

Mensaje actual del usuario:
${query}

CATALOGO permitido:
${JSON.stringify(catalog)}`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          topP: 0.95,
          maxOutputTokens: 1200,
          responseMimeType: 'application/json'
        }
      })
    })

    if (!response.ok) throw new Error(`Gemini error ${response.status}`)
    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const parsed = safeJson(text)

    const recommendations = (parsed.recommendations || [])
      .map((rec) => {
        const item = findCatalogItem(catalog, rec.merchantId, rec.productId)
        return item ? { ...item, reason: rec.reason || item.description } : null
      })
      .filter(Boolean)
      .slice(0, 4)

    return res.status(200).json({
      answer: parsed.answer || 'Estoy contigo. Dime qué necesitas y busco dentro del catálogo real de faciliteaGO.',
      recommendations,
      followUp: parsed.followUp || '',
      intent: parsed.intent || 'conversacion',
      source: 'gemini'
    })
  } catch (error) {
    return res.status(200).json({ ...quickLocalAnswer(query, catalog), source: 'local_error', detail: error.message })
  }
}
