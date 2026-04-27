import React from 'react'

const BLUE = '#0047BA'
const AQUA = '#2FC2B6'
const DARK = '#004852'
const CODE = ['FIN', 'BROAD', 'PEAK', '26'].join('')

function Logo(){
  return <div className="leading-none text-left">
    <div className="text-3xl sm:text-4xl font-black tracking-tight">facilitea <span style={{color:AQUA}}>GO</span></div>
    <div className="-mt-1 text-right text-xs font-bold text-zinc-700">by CaixaBank</div>
  </div>
}

function Benefit({icon,title,text}){
  return <div className="rounded-3xl bg-white/10 p-5">
    <div className="text-3xl mb-3">{icon}</div>
    <b className="text-lg block">{title}</b>
    <p className="text-white/75 mt-2 text-sm leading-relaxed">{text}</p>
  </div>
}

function Step({n,title,text}){
  return <div className="rounded-[2rem] bg-white border shadow-sm p-7">
    <div className="w-12 h-12 rounded-2xl text-white grid place-items-center font-black" style={{backgroundColor:n===2?AQUA:BLUE}}>{n}</div>
    <h3 className="mt-5 text-2xl font-black">{title}</h3>
    <p className="mt-3 text-zinc-600 leading-relaxed">{text}</p>
  </div>
}

export default function CashbackPage2({onBack}){
  return <main className="min-h-screen bg-white text-zinc-950" style={{fontFamily:'Inter, Quicksand, system-ui, sans-serif'}}>
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={onBack}><Logo/></button>
        <button onClick={onBack} className="px-5 py-3 rounded-full border font-black bg-white hover:bg-zinc-50">← Volver a faciliteaGO</button>
      </div>
    </header>

    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-sm font-black text-zinc-500 mb-5">Reembolso</div>
      <div className="rounded-[2rem] overflow-hidden bg-[#F3F0E6] grid lg:grid-cols-2 gap-8 items-center px-8 md:px-16 py-12">
        <div>
          <span className="inline-flex px-4 py-2 rounded-full bg-white border text-blue-800 font-black text-sm">Pago flexible + cashback</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.02]">Disfruta ahora, paga después y recibe tu cashback.</h1>
          <p className="mt-5 text-xl text-zinc-700 max-w-2xl">Compra en comercios locales adheridos, paga en 4 plazos y conserva tus ventajas faciliteaGO al confirmar el pedido.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBack} className="px-7 py-4 rounded-full text-white font-black" style={{backgroundColor:DARK}}>Ver comercios adheridos</button>
            <button onClick={onBack} className="px-7 py-4 rounded-full bg-white border font-black">Volver a comprar</button>
          </div>
        </div>
        <div className="relative rounded-[2rem] overflow-hidden min-h-[320px] bg-white shadow-inner">
          <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-black/10" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 rounded-xl px-4 py-3 text-white font-black shadow-xl" style={{backgroundColor:DARK}}>Pago en 4 plazos<br/><span className="text-sm font-bold opacity-80">con tarjeta CaixaBank</span></div>
          <div className="absolute left-24 bottom-12 rounded-full px-5 py-3 font-black shadow-xl" style={{backgroundColor:AQUA,color:'#033b36'}}>Ya tienes tu cashback</div>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-2xl p-8 md:p-10 text-white shadow-xl grid md:grid-cols-4 gap-6 items-stretch" style={{backgroundColor:DARK}}>
        <div className="text-3xl font-black md:border-r md:border-white/40 md:pr-8 flex items-center">En faciliteaGO todo son ventajas</div>
        <Benefit icon="▣" title="Pago en 4 plazos" text="Divide tus compras seleccionadas sin perder los beneficios del marketplace local." />
        <Benefit icon="◎" title="Cashback CaixaBank" text="Acumula reembolso sobre tus compras en comercios adheridos." />
        <Benefit icon="▤" title="Recogida o envío" text="Elige recogida en tienda o envío a domicilio según disponibilidad." />
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-6">
      <Step n={1} title="Compra en faciliteaGO" text="Elige productos de comercios locales adheridos y añade el cupón en el carrito cuando aplique." />
      <Step n={2} title="Selecciona pago flexible" text="En el checkout, selecciona CaixaBank Pay, tarjeta o la modalidad de pago compatible con la campaña." />
      <Step n={3} title="Recibe el cashback" text="Tras confirmar el pedido, el reembolso se refleja en tu área Mi cuenta junto con puntos faciliteaGO." />
    </section>

    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="rounded-[2rem] bg-zinc-50 border p-8 md:p-10">
        <h2 className="text-3xl font-black">Condiciones principales</h2>
        <div className="mt-6 grid gap-5 text-sm leading-relaxed text-zinc-700">
          <p><b>1. Venta y entrega:</b> Los productos se compran en faciliteaGO a comercios locales adheridos. La entrega podrá realizarse mediante recogida en tienda o envío a domicilio según disponibilidad del comercio.</p>
          <p><b>2. Pago en plazos:</b> La financiación se muestra como experiencia simulada para la demo. El usuario puede seleccionar pago en 4 plazos, CaixaBank Pay, tarjeta, Bizum o puntos faciliteaGO dentro del checkout.</p>
          <p><b>3. Cashback:</b> El cashback demo se calcula sobre el importe final de compra. En la web actual se aplica un 4% de devolución y se muestra en Mi cuenta tras confirmar el pedido.</p>
          <p><b>4. Cupón:</b> El cupón promocional debe introducirse manualmente en el carrito. Código actual: <b>{CODE}</b>.</p>
          <p><b>5. Naturaleza de la demo:</b> Esta página reproduce el comportamiento comercial de faciliteaGO para presentación del proyecto. No constituye una oferta contractual real ni ejecuta pagos bancarios reales.</p>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-[2rem] p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center" style={{backgroundColor:'#346B72'}}>
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=85" className="w-full h-[330px] object-cover rounded-[1.5rem]" />
        <div className="bg-white rounded-[1.5rem] p-8">
          <span className="text-xs font-black text-blue-800 bg-blue-50 rounded-full px-3 py-2">Ventajas exclusivas</span>
          <h2 className="mt-5 text-3xl md:text-4xl font-black">Recibe promociones y cashback cerca de ti</h2>
          <p className="mt-3 text-zinc-600">Suscríbete para recibir rutas por barrios, productos destacados y campañas de comercio local.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4"><input placeholder="Nombre *" className="rounded-xl border px-4 py-3"/><input placeholder="Email *" className="rounded-xl border px-4 py-3"/></div>
          <label className="mt-5 flex gap-3 text-sm text-zinc-600"><input type="checkbox"/>Acepto recibir comunicaciones de faciliteaGO</label>
          <button className="mt-6 px-7 py-4 rounded-full text-white font-black" style={{backgroundColor:DARK}}>Suscribirme</button>
        </div>
      </div>
    </section>
  </main>
}
