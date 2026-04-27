import React from 'react'
import AppManualCoupon from './AppManualCoupon.jsx'
import GeminiJuanIA from './GeminiJuanIA.jsx'

export default function AppGeminiShell(){
  return <>
    <style>{`
      button[class*="bottom-5"]:not(.gemini-juanias-button){display:none!important;}
      div[class*="bottom-24"]:not(.gemini-juanias-panel){display:none!important;}
      .gemini-juanias-panel,.gemini-juanias-button{display:grid;}
      .gemini-juanias-panel{display:block;}
    `}</style>
    <AppManualCoupon/>
    <GeminiJuanIA/>
  </>
}
