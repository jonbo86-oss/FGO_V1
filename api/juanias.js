import { merchants } from '../src/data/merchants.js'

const CODE = ['FIN', 'BROAD', 'PEAK', '26'].join('')

function normalize(text = '') {
  return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term))
}

function extractBudget(query) {
  const q = normalize(query).replace(',', '.')
  const match = q.match(/(?:menos de|por debajo de|maximo|max|hasta|<)\s*(\d+(?:\.\d+)?)\s*€?/)
  return match ? Number(match[1]) : null
}

function flattenCatalog() {
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
      description: product.description,
      delivery: merchant.delivery,
      cashback: '4%'
    }))
  )
}

function getIntent(query) {
  const q = normalize(query)
  const budget = extractBudget(q)
  const intents = {
    tools: hasAny(q, ['herramienta', 'herramientas', 'reforma', 'bricolaje', 'arreglar', 'montar', 'instalar', 'taladro', 'destornillador', 'tornillo', 'tornillos', 'cinta', 'llave', 'guante', 'linterna', 'ferreteria', 'ferretería', 'casa', 'obra', 'pared', 'pintar']),
    candy: hasAny(q, ['anillo', 'caramelo', 'gominola', 'gominolas', 'dulce', 'chuche', 'chuches', 'regaliz', 'piruleta']),
    gift: hasAny(q, ['regalo', 'regalar', 'detalle', 'sorpresa']),
    child: hasAny(q, ['nino', 'niño', 'nina', 'niña', 'infantil', 'juguete', 'juguetes']),
    souvenir: hasAny(q, ['souvenir', 'recuerdo', 'barcelona', 'turista', 'iman', 'imán', 'postal', 'llavero']),
    food: hasAny(q, ['gourmet', 'comida', 'aceite', 'queso', 'cafe', 'café', 'chocolate', 'miel', 'vermut', 'pack']),
    books: hasAny(q, ['libro', 'libros', 'leer', 'lectura', 'novela', 'comic', 'cómic', 'manga', 'libreria', 'librería']),
    tech: hasAny(q, ['cable', 'cargador', 'auriculares', 'raton', 'ratón', 'teclado', 'powerbank', 'hdmi', 'hub', 'movil', 'móvil']),
    flowers: hasAny(q, ['flores', 'flor', 'ramo', 'rosa', 'planta', 'floristeria', 'floristería']),
    sport: hasAny(q, ['deporte', 'tenis', 'padel', 'pádel', 'pelotas', 'calcetines', 'bidon', 'bidón', 'grip']),
    pets: hasAny(q, ['mascota', 'mascotas', 'perro', 'gato', 'collar', 'correa', 'snack animal']),
    route: hasAny(q, ['ruta', 'paseo', 'recorrido', 'cerca', 'ramblas', 'rambla']),
    cheap: budget !== null || hasAny(q, ['barato', 'economico', 'económico', 'oferta'])
  }
  return { q, budget, ...intents }
}

function scoreItem(item, intent, words) {
  const hay = normalize(`${item.productName} ${item.description} ${item.merchantName} ${item.sector} ${item.city}`)
  const sector = normalize(item.sector)
  const product = normalize(item.productName)
  let score = 0

  for (const word of words) {
    if (hay.includes(word)) score += word.length > 5 ? 3 : 2
  }

  if (intent.budget !== null) {
    if (item.price <= intent.budget) score += 12
    else score -= 20
  }

  if (intent.tools) {
    const toolProducts = ['destornillador', 'cinta', 'llave', 'guante', 'brida', 'cola', 'linterna', 'alcayata', 'pila', 'metro', 'tornillo', 'cuter', 'cúter', 'brocha', 'silicona', 'pinza']
    if (sector.includes('ferreteria')) score += 25
    if (hasAny(product, toolProducts)) score += 20
    if (hasAny(normalize(item.merchantName), ['ferreteria', 'ferretería'])) score += 15
    if (sector.includes('dulces') || product.includes('anillo') || product.includes('caramelo')) score -= 100
  }

  if (intent.candy) {
    if (sector.includes('dulces')) score += 25
    if (hasAny(product, ['anillo', 'caramelo', 'mix', 'regaliz', 'nube', 'lengua', 'piruleta', 'mora'])) score += 18
  }

  if (intent.child || intent.gift) {
    if (['juguetes', 'dulces', 'regalos', 'souvenirs', 'cultura'].includes(sector)) score += 12
    if (hasAny(product, ['puzzle', 'peluche', 'cartas', 'peonza', 'juego', 'caramelo', 'taza', 'iman', 'imán', 'comic', 'cómic', 'manga'])) score += 9
  }

  if (intent.souvenir) {
    if (sector.includes('souvenirs') || sector.includes('regalos')) score += 18
    if (hasAny(product, ['iman', 'imán', 'postal', 'llavero', 'taza', 'abanico', 'camiseta', 'pulsera'])) score += 12
  }

  if (intent.food) {
    if (['gourmet', 'cafes', 'cafés', 'ecomarket'].includes(sector)) score += 16
    if (hasAny(product, ['aceite', 'queso', 'cafe', 'café', 'chocolate', 'miel', 'vermut', 'pack', 'almendra', 'avellana'])) score += 10
  }

  if (intent.books) {
    if (sector.includes('cultura')) score += 16
    if (hasAny(product, ['libro', 'novela', 'comic', 'cómic', 'manga', 'ensayo', 'poesia', 'poesía', 'infantil'])) score += 10
  }

  if (intent.tech) {
    if (sector.includes('tecnologia')) score += 18
    if (hasAny(product, ['cable', 'cargador', 'auriculares', 'raton', 'ratón', 'teclado', 'powerbank', 'hdmi', 'hub'])) score += 12
  }

  if (intent.flowers) {
    if (sector.includes('flores')) score += 18
    if (hasAny(product, ['ramo', 'planta', 'rosa', 'maceta', 'centro'])) score += 12
  }

  if (intent.sport) {
    if (sector.includes('deporte') || sector.includes('bicicletas')) score += 14
    if (hasAny(product, ['pelotas', 'bidon', 'bidón', 'calcetines', 'grip', 'casco', 'luces', 'camara', 'cámara', 'candado'])) score += 10
  }

  if (intent.pets) {
    if (sector.includes('mascotas')) score += 18
    if (hasAny(product, ['snack', 'juguete', 'champu', 'champú', 'correa', 'arena', 'comedero', 'collar'])) score += 10
  }

  if (intent.route && item.city === 'Barcelona') score += 5
  if (item.city === 'Barcelona') score += 1

  return score
}

function prefilter(query, limit = 28) {
  const intent = getIntent(query)
  const words = intent.q.split(/\s+/).filter((w) => w.length > 2 && !['para', 'con', 'una', 'unos', 'unas', 'quiero', 'necesito', 'busco'].includes(w))
  const catalog = flattenCatalog()
  let scored = catalog
    .map((item) => ({ ...item, score: scoreItem(item, intent, words) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.price - b.price)

  if (intent.tools) scored = scored.filter((item) => normalize(item.sector).includes('ferreteria'))
  if (intent.budget !== null) scored = scored.filter((item) => item.price <= intent.budget)

  if (scored.length) return { intent, candidates: scored.slice(0, limit) }

  if (intent.tools) {
    return {
      intent,
      candidates: catalog.filter((item) => normalize(item.sector).includes('ferreteria')).sort((a, b) => a.price - b.price).slice(0, limit)
    }
  }

  return { intent, candidates: catalog.sort((a, b) => a.price - b.price).slice(0, limit) }
}

function fallbackAnswer(query, candidates, intent) {
  const picks = candidates.slice(0, 4)
  const topic = intent.tools ? 'para reforma o bricolaje' : intent.candy ? 'de dulces' : intent.gift || intent.child ? 'para regalo' : 'del catálogo faciliteaGO'
  return {
    answer: `Te propongo ${picks.length} opción${picks.length === 1 ? '' : 'es'} ${topic}. He elegido solo productos reales de comercios adheridos y todos mantienen el 4% de cashback.`,
    recommendations: picks.map((p) => ({
      merchantId: p.merchantId,
      merchantName: p.merchantName,
      productId: p.productId,
      productName: p.productName,
      price: p.price,
      reason: intent.tools
        ? `Es una opción útil para bricolaje o pequeñas reformas y se vende en ${p.merchantName}.`
        : `Encaja con tu búsqueda y está disponible en ${p.merchantName}.`
    })),
    intent: intent.tools ? 'herramientas_reforma' : intent.candy ? 'dulces' : 'general'
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
  const { intent, candidates } = prefilter(query)

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json({ ...fallbackAnswer(query, candidates, intent), source: 'fallback_no_key' })
  }

  const system = `Eres JuanIA, un asesor de compra local dentro de faciliteaGO. Tu trabajo es razonar como vendedor experto, pero con una regla estricta: SOLO puedes recomendar productos que estén en CANDIDATOS. Nunca inventes comercios, productos, precios ni stock.

Criterios:
- Entiende la intención real del usuario, no solo palabras sueltas.
- Si pide herramientas, reforma, bricolaje o arreglar algo, recomienda solo ferretería. No recomiendes dulces, souvenirs ni productos infantiles.
- Si pide un regalo, explica para quién encaja y prioriza producto + precio + comercio.
- Si pide presupuesto, respétalo estrictamente.
- Si no hay suficiente información, da una recomendación prudente y una pregunta de seguimiento.
- Responde en español natural, cercano y útil.
- Devuelve JSON válido sin markdown.

Formato exacto:
{"answer":"respuesta breve con criterio","recommendations":[{"merchantId":"","merchantName":"","productId":"","productName":"","price":0,"reason":"por qué lo recomiendas"}],"followUp":"pregunta opcional breve","intent":"etiqueta"}`

  const prompt = `${system}

Cupón activo introducible en carrito: ${CODE}. Cashback general: 4%.
Historial reciente: ${JSON.stringify(history.slice(-6))}
Consulta actual: ${query}
Intención detectada: ${JSON.stringify(intent)}
CANDIDATOS permitidos: ${JSON.stringify(candidates)}`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.25,
          topP: 0.8,
          maxOutputTokens: 900,
          responseMimeType: 'application/json'
        }
      })
    })

    if (!response.ok) throw new Error(`Gemini error ${response.status}`)
    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const parsed = safeJson(text)

    const allowed = new Set(candidates.map((c) => `${c.merchantId}::${c.productId}`))
    const byKey = new Map(candidates.map((c) => [`${c.merchantId}::${c.productId}`, c]))
    const recommendations = (parsed.recommendations || [])
      .filter((r) => allowed.has(`${r.merchantId}::${r.productId}`))
      .slice(0, 4)
      .map((r) => ({ ...byKey.get(`${r.merchantId}::${r.productId}`), reason: r.reason || byKey.get(`${r.merchantId}::${r.productId}`).description }))

    if (!recommendations.length) return res.status(200).json({ ...fallbackAnswer(query, candidates, intent), source: 'fallback_empty' })
    return res.status(200).json({
      answer: parsed.answer,
      recommendations,
      followUp: parsed.followUp || '',
      intent: parsed.intent || 'general',
      source: 'gemini'
    })
  } catch (error) {
    return res.status(200).json({ ...fallbackAnswer(query, candidates, intent), source: 'fallback_error', detail: error.message })
  }
}
