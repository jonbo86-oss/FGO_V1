import { merchants } from '../src/data/merchants.js'

const CODE = ['FIN', 'BROAD', 'PEAK', '26'].join('')

function normalize(text = '') {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term))
}

function prefilter(query, limit = 24) {
  const q = normalize(query)
  const words = q.split(/\s+/).filter((w) => w.length > 2)
  const catalog = flattenCatalog()
  const toolIntent = hasAny(q, ['herramienta', 'herramientas', 'reforma', 'bricolaje', 'arreglar', 'montar', 'taladro', 'destornillador', 'tornillo', 'tornillos', 'cinta', 'llave', 'guante', 'linterna', 'ferreteria', 'casa'])
  const candyIntent = hasAny(q, ['anillo', 'caramelo', 'gominola', 'dulce', 'chuche'])
  const giftIntent = hasAny(q, ['regalo', 'nino', 'niño', 'infantil', 'juguete'])
  const cheapIntent = hasAny(q, ['barato', 'menos de 5', 'menos de cinco', 'economico', 'económico'])
  const routeIntent = hasAny(q, ['ruta', 'paseo', 'recorrido'])

  const scored = catalog.map((item) => {
    const hay = normalize(`${item.productName} ${item.description} ${item.merchantName} ${item.sector} ${item.city}`)
    const sector = normalize(item.sector)
    const product = normalize(item.productName)
    let score = 0

    for (const w of words) if (hay.includes(w)) score += 2

    if (toolIntent) {
      if (sector.includes('ferreteria')) score += 14
      if (hasAny(product, ['destornillador', 'cinta', 'llave', 'guante', 'brida', 'cola', 'linterna', 'alcayata', 'pila', 'metro', 'tornillo', 'cuter', 'brocha', 'silicona', 'pinza'])) score += 12
      if (hasAny(normalize(item.merchantName), ['ferreteria', 'ferretería'])) score += 10
      if (sector.includes('dulces') || product.includes('anillo')) score -= 50
    }

    if (candyIntent) {
      if (sector.includes('dulces')) score += 10
      if (hasAny(product, ['anillo', 'caramelo', 'mix', 'regaliz', 'nube', 'piruleta', 'mora'])) score += 10
    }

    if (giftIntent) {
      if (['juguetes', 'dulces', 'regalos', 'souvenirs'].includes(sector)) score += 7
      if (hasAny(product, ['puzzle', 'peluche', 'cartas', 'peonza', 'juego', 'caramelo', 'taza', 'iman', 'imán'])) score += 5
    }

    if (cheapIntent && item.price <= 5) score += 8
    if (routeIntent && item.city === 'Barcelona') score += 5
    if (q.includes('pinza') && product.includes('pinza')) score += 12
    if (q.includes('anillo') && product.includes('anillo')) score += 12

    return { ...item, score }
  }).filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.price - b.price)
    .slice(0, limit)

  if (scored.length) return scored

  if (toolIntent) {
    return catalog
      .filter((item) => normalize(item.sector).includes('ferreteria'))
      .sort((a, b) => a.price - b.price)
      .slice(0, limit)
  }

  return catalog.sort((a, b) => a.price - b.price).slice(0, limit)
}

function fallbackAnswer(query, candidates) {
  const picks = candidates.slice(0, 4)
  return {
    answer: `Te propongo ${picks.length} opción${picks.length === 1 ? '' : 'es'} del catálogo faciliteaGO. Todas son productos reales de comercios adheridos y mantienen el 4% de cashback.`,
    recommendations: picks.map((p) => ({
      merchantId: p.merchantId,
      merchantName: p.merchantName,
      productId: p.productId,
      productName: p.productName,
      price: p.price,
      reason: `Encaja con tu búsqueda y está disponible en ${p.merchantName}.`
    }))
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { query = '' } = req.body || {}
  const candidates = prefilter(query)

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json({ ...fallbackAnswer(query, candidates), source: 'fallback' })
  }

  const prompt = `Eres JuanIA, asistente de compra local de faciliteaGO. Recomienda SOLO productos de la lista de candidatos. No inventes comercios ni productos. Si el usuario pide herramientas, reforma o bricolaje, prioriza productos de ferretería y excluye dulces salvo que los pida expresamente. Devuelve JSON válido sin markdown con esta forma: {"answer":"texto breve y natural","recommendations":[{"merchantId":"","merchantName":"","productId":"","productName":"","price":0,"reason":"motivo"}]}. Máximo 4 recomendaciones. Menciona cashback del 4% si aporta valor. Cupón disponible: ${CODE}. Consulta del usuario: ${query}. Candidatos: ${JSON.stringify(candidates)}`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    })

    if (!response.ok) throw new Error(`Gemini error ${response.status}`)
    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const clean = text.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim()
    const parsed = JSON.parse(clean)

    const allowed = new Set(candidates.map((c) => `${c.merchantId}::${c.productId}`))
    const recommendations = (parsed.recommendations || [])
      .filter((r) => allowed.has(`${r.merchantId}::${r.productId}`))
      .slice(0, 4)

    if (!recommendations.length) return res.status(200).json({ ...fallbackAnswer(query, candidates), source: 'fallback_empty' })
    return res.status(200).json({ answer: parsed.answer, recommendations, source: 'gemini' })
  } catch (error) {
    return res.status(200).json({ ...fallbackAnswer(query, candidates), source: 'fallback_error', detail: error.message })
  }
}
