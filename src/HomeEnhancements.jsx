import {useEffect} from 'react'

const BLUE='#0047BA'
const AQUA='#2FC2B6'

function buildHtml(){
  const phone='https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80'
  const newsletter='https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80'
  const trends=[
    ['Pinzas pequeñas','Ferretería Ferran','0,99€','https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80'],
    ['Anillo de caramelo','Gominolas Happy Ring','0,35€','https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=500&q=80'],
    ['Imán Barcelona','Souvenirs La Rambla','3,50€','https://images.unsplash.com/photo-1528283648649-33347faa5d9b?auto=format&fit=crop&w=500&q=80'],
    ['Aceite arbequina','Casa Gispert','8,90€','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80']
  ]
  return `
  <section class="fgo-extra fgo-reembolso">
    <div class="fgo-reembolso-copy">
      <span class="fgo-kicker">Reembolso y financiación</span>
      <h2>Disfruta ahora, paga después y recibe tu cashback.</h2>
      <p>Paga tu compra en 4 cuotas, sin intereses, y conserva tus ventajas faciliteaGO en comercios locales adheridos.</p>
      <button type="button">Consigue tu cashback</button>
    </div>
    <div class="fgo-phone-card">
      <img src="${phone}" alt="Compra confirmada en móvil"/>
      <div class="fgo-floating fgo-floating-one">Pago en 4 plazos</div>
      <div class="fgo-floating fgo-floating-two">Ya tienes tu cashback</div>
    </div>
  </section>

  <section class="fgo-extra fgo-advantages">
    <div class="fgo-adv-title">En faciliteaGO todo son ventajas</div>
    <div class="fgo-adv-item"><span>▣</span><b>Sin intereses ni comisiones</b><small>Pago flexible en compras seleccionadas</small></div>
    <div class="fgo-adv-item"><span>◎</span><b>Garantía CaixaBank</b><small>Entorno de confianza para comprar local</small></div>
    <div class="fgo-adv-item"><span>▤</span><b>Envío y devolución sencilla</b><small>Recogida en tienda o envío a domicilio</small></div>
  </section>

  <section class="fgo-extra fgo-trends">
    <div class="fgo-title-row">
      <div><h2>Tendencias de la semana</h2><p>Los productos más vendidos ahora mismo en Cataluña.</p></div>
      <span>Top ventas</span>
    </div>
    <div class="fgo-trend-grid">
      ${trends.map((t,i)=>`<article class="fgo-trend-card"><img src="${t[3]}" alt="${t[0]}"><div><small>#${i+1} más vendido</small><h3>${t[0]}</h3><p>${t[1]}</p><b>${t[2]}</b></div></article>`).join('')}
    </div>
  </section>

  <section class="fgo-extra fgo-newsletter">
    <div class="fgo-newsletter-card">
      <img src="${newsletter}" alt="Persona usando móvil"/>
      <div class="fgo-newsletter-form">
        <span class="fgo-kicker">Ventajas exclusivas</span>
        <h2>¡Suscríbete a nuestra newsletter!</h2>
        <p>Recibe mensualmente promociones, rutas de comercio local y campañas de cashback cerca de ti.</p>
        <div class="fgo-form-grid"><input placeholder="Nombre *"><input placeholder="Email *"></div>
        <label><input type="checkbox"> Acepto recibir comunicaciones de faciliteaGO</label>
        <button type="button">Suscribirme</button>
      </div>
    </div>
  </section>`
}

export default function HomeEnhancements(){
  useEffect(()=>{
    const cssId='fgo-home-enhancements-css'
    if(!document.getElementById(cssId)){
      const style=document.createElement('style')
      style.id=cssId
      style.textContent=`
        .fgo-home-extra-root{max-width:1280px;margin:0 auto;padding:0 16px}.fgo-extra{margin:34px 0}.fgo-reembolso{background:#F3F0E6;border-radius:0;padding:34px 9%;display:grid;grid-template-columns:1.1fr .9fr;gap:36px;align-items:center}.fgo-kicker{display:inline-flex;font-weight:900;color:${BLUE};background:white;border:1px solid #e4e4e7;border-radius:999px;padding:8px 12px;font-size:12px}.fgo-reembolso h2,.fgo-trends h2,.fgo-newsletter h2{font-size:36px;line-height:1.05;font-weight:950;margin:14px 0 12px}.fgo-reembolso p,.fgo-trends p,.fgo-newsletter p{font-size:17px;color:#3f3f46}.fgo-reembolso button,.fgo-newsletter button{margin-top:22px;border:0;border-radius:999px;background:#004852;color:white;padding:16px 30px;font-weight:950;font-size:16px}.fgo-phone-card{position:relative;border-radius:22px;overflow:hidden;min-height:250px}.fgo-phone-card img{width:100%;height:280px;object-fit:cover;border-radius:22px}.fgo-floating{position:absolute;background:#004852;color:white;border-radius:10px;padding:10px 14px;font-weight:900;box-shadow:0 14px 30px #0002}.fgo-floating-one{left:8%;top:42%}.fgo-floating-two{left:24%;top:63%;background:${AQUA};color:#02332e}.fgo-advantages{background:#004852;color:white;border-radius:10px;margin-top:22px;padding:32px 42px;display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:28px;box-shadow:0 8px 18px #0002}.fgo-adv-title{font-size:28px;font-weight:950;border-right:1px solid #ffffff80;display:flex;align-items:center}.fgo-adv-item span{font-size:30px;display:block;margin-bottom:10px}.fgo-adv-item b{display:block;font-size:17px}.fgo-adv-item small{display:block;margin-top:6px;color:#d7eeee}.fgo-title-row{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:18px}.fgo-title-row span{background:#e6fbf8;color:#007a70;font-weight:950;border-radius:999px;padding:9px 14px}.fgo-trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.fgo-trend-card{background:white;border:1px solid #e4e4e7;border-radius:28px;overflow:hidden;box-shadow:0 10px 24px #0000000c}.fgo-trend-card img{width:100%;height:150px;object-fit:cover}.fgo-trend-card div{padding:18px}.fgo-trend-card small{color:${AQUA};font-weight:950}.fgo-trend-card h3{font-size:20px;font-weight:950;margin:6px 0}.fgo-trend-card p{font-size:14px;color:#71717a;margin:0 0 12px}.fgo-trend-card b{font-size:22px;color:${BLUE}}.fgo-newsletter{background:#346B72;padding:72px 12%;margin-bottom:0}.fgo-newsletter-card{background:white;border-radius:28px;padding:24px;display:grid;grid-template-columns:.85fr 1.15fr;gap:38px;align-items:center}.fgo-newsletter-card>img{width:100%;height:350px;object-fit:cover;border-radius:22px}.fgo-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:22px 0}.fgo-form-grid input{border:1px solid #a1a1aa;border-radius:12px;padding:15px;font-size:15px}.fgo-newsletter label{display:flex;gap:10px;font-size:14px;color:#3f3f46}@media(max-width:900px){.fgo-reembolso,.fgo-newsletter-card,.fgo-advantages{grid-template-columns:1fr}.fgo-adv-title{border-right:0;border-bottom:1px solid #ffffff80;padding-bottom:18px}.fgo-trend-grid{grid-template-columns:1fr 1fr}.fgo-newsletter{padding:36px 16px}.fgo-form-grid{grid-template-columns:1fr}}@media(max-width:560px){.fgo-reembolso h2,.fgo-trends h2,.fgo-newsletter h2{font-size:28px}.fgo-trend-grid{grid-template-columns:1fr}.fgo-reembolso{padding:28px 18px}.fgo-phone-card img{height:220px}}
      `
      document.head.appendChild(style)
    }
    const rootId='fgo-home-extra-root'
    const render=()=>{
      const existing=document.getElementById(rootId)
      const isHome=[...document.querySelectorAll('h1')].some(h=>h.textContent?.includes('Compra cerca'))
      if(!isHome){existing?.remove();return}
      if(existing)return
      const hero=document.querySelector('main > section')
      if(!hero)return
      const root=document.createElement('div')
      root.id=rootId
      root.className='fgo-home-extra-root'
      root.innerHTML=buildHtml()
      hero.insertAdjacentElement('afterend',root)
    }
    render()
    const observer=new MutationObserver(render)
    observer.observe(document.body,{childList:true,subtree:true})
    return()=>observer.disconnect()
  },[])
  return null
}
