'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'A786 Satta पर results कब update होते हैं?',
    a: 'A786 Satta पर available results को market update होने के बाद update किया जाता है। Users यहाँ latest available result information देख सकते हैं।',
  },
  {
    q: 'क्या यहाँ पुराने results भी मिल जाते हैं?',
    a: 'हाँ, available historical information charts के माध्यम से देखी जा सकती है। अलग-अलग sections में previous result data को organized format में रखा गया है।',
  },
  {
    q: 'क्या A786 Satta mobile पर use करना आसान है?',
    a: 'हाँ, A786 Satta का website layout mobile-friendly है। आप mobile device से available result और chart information आसानी से access कर सकते हैं।',
  },
  {
    q: 'सबसे ज़्यादा लोग कौन से results देखने आते हैं?',
    a: 'Visitors अलग-अलग popular sections की latest available information देखते हैं, जिनमें Delhi Bazar, Faridabad, Ghaziabad, Gali और Disawar जैसे sections शामिल हैं।',
  },
  {
    q: 'क्या नए users के लिए समझना आसान है?',
    a: 'हाँ, A786 Satta पर information को simple और organized format में present किया गया है, जिससे visitors relevant section को आसानी से समझ और access कर सकते हैं।',
  },
  {
    q: 'क्या एक ही जगह पर सभी markets देख सकते हैं?',
    a: 'हाँ, A786 Satta पर multiple market sections उपलब्ध हैं। Visitors अपनी जरूरत के अनुसार संबंधित section में जाकर available information देख सकते हैं।',
  },
  {
    q: 'Charts का use क्यों किया जाता है?',
    a: 'Charts में available historical results को date-wise organize किया जाता है, जिससे previous information को एक जगह पर देखना और navigate करना आसान होता है।',
  },
  {
    q: 'Faridabad के results कब मिलते हैं?',
    a: 'Faridabad section में available results market update के अनुसार publish किए जाते हैं। Latest available information संबंधित chart और result page पर देखी जा सकती है।',
  },
  {
    q: 'क्या सभी major markets cover होते हैं?',
    a: 'A786 Satta पर कई popular sections उपलब्ध हैं, जिनमें Faridabad, Ghaziabad, Gali, Disawar और Delhi Bazar शामिल हैं।',
  },
  {
    q: 'लोग A786 Satta को क्यों prefer करते हैं?',
    a: 'A786 Satta का focus available result और chart information को simple और organized format में present करना है, जिससे visitors relevant information तक आसानी से पहुँच सकें।',
  },
  {
    q: 'क्या अलग-अलग results compare कर सकते हैं?',
    a: 'हाँ, अलग-अलग sections की available historical information को individually देखकर visitors विभिन्न market data को compare कर सकते हैं।',
  },
  {
    q: 'Charts में क्या information मिलती है?',
    a: 'Charts में available previous results को date-wise organize किया जाता है। इससे historical information को एक ही जगह पर देखना आसान होता है।',
  },
  {
    q: 'क्या daily check करने के लिए ये platform सही है?',
    a: 'A786 Satta पर available latest updates और result information को regularly check किया जा सकता है। Information availability market updates पर depend करती है।',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-8 mb-4">
      <div className="section-bar mb-3">
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
      </div>

      <div className="space-y-2">
        {FAQS.map((f, i) => (
          <div key={i} className="faq-item">
            <button
              type="button"
              className="faq-q touch-fb"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="pr-3 leading-snug">
                {f.q.toUpperCase()}
              </span>

              <span
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border-2 border-yellow-400"
                style={{
                  color: '#c9a800',
                  background: open === i ? '#FFE000' : '#fff',
                }}
              >
                {open === i ? (
                  <Minus size={13} strokeWidth={2.5} />
                ) : (
                  <Plus size={13} strokeWidth={2.5} />
                )}
              </span>
            </button>

            {open === i && (
              <div
                id={`faq-answer-${i}`}
                className="faq-a animate-slide-up"
              >
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}