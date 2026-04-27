import React,{useEffect,useState} from 'react'
import AppManualCoupon from './AppManualCoupon.jsx'
import GeminiJuanIA from './GeminiJuanIA.jsx'
import HomeEnhancements from './HomeEnhancements.jsx'
import CashbackPage from './CashbackPage.jsx'

export default function AppGeminiShell(){
  const [cashbackPage,setCashbackPage]=useState(()=>location.hash==='#cashback')
  useEffect(()=>{
    const update=()=>setCashbackPage(location.hash==='#cashback')
    addEventListener('hashchange',update)
    document.addEventListener('click',e=>{
      const btn=e.target.closest?.('.fgo-cashback-cta')
      if(btn){e.preventDefault();location.hash='cashback';setCashbackPage(true);scrollTo(0,0)}
    })
    return()=>removeEventListener('hashchange',update)
  },[])
  if(cashbackPage)return <CashbackPage onBack={()=>{history.pushState('',document.title,location.pathname+location.search);setCashbackPage(false);setTimeout(()=>scrollTo(0,0),0)}}/>
  return <>
    <style>{`
      button[class*="bottom-5"]:not(.gemini-juanias-button){display:none!important;}
      div[class*="bottom-24"]:not(.gemini-juanias-panel){display:none!important;}
      .gemini-juanias-panel,.gemini-juanias-button{display:grid;}
      .gemini-juanias-panel{display:block;}
    `}</style>
    <AppManualCoupon/>
    <HomeEnhancements/>
    <GeminiJuanIA/>
  </>
}
