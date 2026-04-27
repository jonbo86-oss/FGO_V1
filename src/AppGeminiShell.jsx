import React,{useEffect,useState} from 'react'
import AppManualCoupon from './AppManualCoupon.jsx'
import GeminiJuanIA from './GeminiJuanIA.jsx'
import HomeEnhancements from './HomeEnhancements.jsx'
import CashbackPage2 from './CashbackPage2.jsx'

export default function AppGeminiShell(){
  const [page,setPage]=useState('app')
  useEffect(()=>{
    const open=()=>{setPage('cashback');setTimeout(()=>scrollTo(0,0),0)}
    window.addEventListener('fgo:navigate-cashback',open)
    return()=>window.removeEventListener('fgo:navigate-cashback',open)
  },[])
  if(page==='cashback') return <CashbackPage2 onBack={()=>{setPage('app');setTimeout(()=>scrollTo(0,0),0)}}/>
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
