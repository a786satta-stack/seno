'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  { q: 'A786 Satta पर results कब update होते हैं?', a: 'A786 Satta पर results जैसे ही market declare होता है, तुरंत update कर दिए जाते हैं। Users यहाँ आकर आसानी से latest Faridabad Satta Live Result, Ghaziabad Satta Live Result, Gali Satta Live Result, और Disawar Satta Live Result check कर सकते हैं।' },
  { q: 'क्या यहाँ पुराने results भी मिल जाते हैं?', a: 'हाँ, अगर आप पिछले data को देखना चाहते हैं तो charts available हैं। जैसे Faridabad Satta Chart, Ghaziabad Satta Chart, Gali Satta Chart और Disawar Satta Chart में पुराने results आसानी से मिल जाते हैं।' },
  { q: 'क्या A786 Satta mobile पर use करना आसान है?', a: 'हाँ, website mobile-friendly है। आप कहीं से भी quickly Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result check कर सकते हैं।' },
  { q: 'सबसे ज़्यादा लोग कौन से results देखने आते हैं?', a: 'अक्सर users daily Delhi Bazar Result, Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result  के updates देखने के लिए website visit करते हैं।' },
  { q: 'क्या नए users के लिए समझना आसान है?', a: 'हाँ, results simple format में दिखाए जाते हैं। चाहे आप Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result, सब clear रहता है।' },
  { q: 'क्या एक ही जगह पर सभी markets देख सकते हैं?', a: 'हाँ, A786 Satta पर आप एक साथ कई markets जैसे gali disawar ghaziabad के updates देख सकते हैं।' },
  { q: 'Charts का use क्यों किया जाता है?', a: 'Charts आपको पुराने results समझने में मदद करते हैं। जैसे  Faridabad Satta Chart, Ghaziabad Satta Chart, Gali Satta Chart और Disawar Satta Chart देखकर trend का idea मिल जाता है।' },
  { q: 'Faridabad के results कब मिलते हैं?', a: 'Faridabad market के results daily update होते हैं। आप यहाँ आकर faridabad satta result या satta faridabad result check कर सकते हैं।' },
  { q: 'क्या सभी major markets cover होते हैं?', a: 'हाँ, A786 Satta पर satta bazar faridabad समेत कई major markets के results और updates मिल जाते हैं।' },
  { q: 'लोग A786 Satta को क्यों prefer करते हैं?', a: 'क्योंकि यहाँ updates fast मिलते हैं और data organized रहता है। जैसे Delhi Bazar Result, Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result या charts आसानी से access हो जाते हैं।' },
  { q: 'क्या अलग-अलग results compare कर सकते हैं?', a: 'हाँ, आप different markets के results compare कर सकते हैं, जैसे Delhi Bazar Result, Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result.' },
  { q: 'Charts में क्या information मिलती है?', a: 'Charts में पुराने results date-wise दिखाए जाते हैं, जैसे Faridabad Satta Chart, Ghaziabad Satta Chart, Gali Satta Chart और Disawar Satta Chart, जिससे tracking आसान हो जाती है।' },
  { q: 'क्या daily check करने के लिए ये platform सही है?', a: 'हाँ, जो लोग रोज़ाना updates देखना चाहते हैं, उनके लिए ये platform useful है चाहे वो Delhi Bazar Result, Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result हो या Disawar Satta Result.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mt-8 mb-4">
      <div className="section-bar mb-3"><h2>FREQUENTLY ASKED QUESTIONS</h2></div>
      <div className="space-y-2">
        {FAQS.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-q touch-fb" onClick={() => setOpen(open === i ? null : i)}>
              <span className="pr-3 leading-snug">{f.q.toUpperCase()}</span>
              <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border-2 border-yellow-400"
                style={{ color: '#c9a800', background: open === i ? '#FFE000' : '#fff' }}>
                {open === i ? <Minus size={13} strokeWidth={2.5}/> : <Plus size={13} strokeWidth={2.5}/>}
              </span>
            </button>
            {open === i && <div className="faq-a animate-slide-up">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
