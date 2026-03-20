'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  { q: 'What is Satta King?', a: 'Satta King is a number-based result game originating in India. A number between 00–99 is drawn and declared as the winning number. Our website provides updated results and historical charts for all major satta games.' },
  { q: 'Can I play Satta on this website?', a: 'No. This website is strictly for informational purposes only. We only display results and historical charts. We do not facilitate, promote or allow any form of gambling or betting.' },
  { q: 'How often are results updated?', a: 'Results are updated as soon as they are officially declared. Each game has a fixed time window shown on the home page.' },
  { q: 'Can I see previous years record charts?', a: 'Yes. Our Monthly Chart section provides month-by-month results for every game. Browse back through previous months to view complete historical records.' },
  { q: 'Do I need to register to check results?', a: 'No registration is required. All results, charts and historical data are freely accessible to everyone without any sign-up or login.' },
  { q: 'Can I predict the winning number?', a: 'No. Satta King results are completely random and cannot be predicted. We only provide historical data and strongly advise against relying on any predictions.' },
  { q: 'Does this website offer a leak number?', a: 'No. We do not provide any leak numbers, tips or predictions. Anyone claiming to offer guaranteed satta numbers is fraudulent. Beware of scams.' },
  { q: 'Is using this site legal in India?', a: 'Gambling laws vary by state in India. This website only displays result information and does not involve any monetary transactions. Check your local laws before accessing gambling-related content.' },
  { q: 'What is the timing of Disawar?', a: 'Disawar is the earliest game, declared around 5:00 AM to 6:00 AM. It is one of the most popular and oldest satta games in India.' },
  { q: 'What is the timing of Faridabad?', a: 'Faridabad Satta result is usually declared around 6:00 PM to 7:00 PM every day.' },
  { q: 'What is the timing of Gali Satta?', a: 'Gali Satta result is usually declared around 11:30 PM to 12:00 AM every night.' },
  { q: 'What is the timing of Delhi Bazar Satta?', a: 'Delhi Bazar Satta result is usually declared around 5:00 PM to 6:00 PM.' },
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
