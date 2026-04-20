'use client'
import { useState, useEffect } from 'react'

const STATIC_GAMES = [
  { name: 'कुबेर सिटी', time: '12:15 PM', color: '#f59e0b' },
  { name: 'नोएडा सिटी', time: '12:50 PM', color: '#ef4444' },
  { name: 'सदर बाजार', time: '01:40 PM', color: '#3b82f6' },
  { name: 'ग्वालियर', time: '02:40 PM', color: '#22c55e' },
  { name: 'दिल्ली बाजार', time: '03:10 PM', color: '#a855f7' },
  { name: 'निज़ामाबाद', time: '03:40 PM', color: '#f97316' },
  { name: 'श्री गणेश', time: '04:40 PM', color: '#06b6d4' },
  { name: 'सुल्तानपुर', time: '05:30 PM', color: '#ec4899' },
  { name: 'फरीदाबाद', time: '06:10 PM', color: '#f59e0b' },
  { name: 'अलवर', time: '07:30 PM', color: '#ef4444' },
  { name: 'शिवपुरी', time: '08:30 PM', color: '#3b82f6' },
  { name: 'गाजियाबाद', time: '09:30 PM', color: '#22c55e' },
  { name: 'हरियाणा सिटी', time: '10:35 PM', color: '#a855f7' },
  { name: 'गली', time: '11:30 PM', color: '#f97316' },
  { name: 'दिसावर (DS)', time: '05:10 AM', color: '#06b6d4' },
]

export default function NextThreeGames() {
  const [upcoming, setUpcoming] = useState<typeof STATIC_GAMES>([])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const cur = now.getHours() * 60 + now.getMinutes()
      const parsed = STATIC_GAMES.map(g => {
        const [ts, mer] = g.time.split(' ')
        let [h, m] = ts.split(':').map(Number)
        if (mer === 'PM' && h !== 12) h += 12
        if (mer === 'AM' && h === 12) h = 0
        return { ...g, mins: h * 60 + m }
      }).sort((a, b) => a.mins - b.mins)
      let f = parsed.filter(g => g.mins > cur)
      if (f.length < 3) f = [...f, ...parsed].slice(0, 3)
      else f = f.slice(0, 3)
      setUpcoming(f)
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="section-bar" style={{ marginBottom: 14 }}><h2>आने वाले गेम्स</h2></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {upcoming.map((game, i) => (
          <div key={`${game.name}-${i}`} className={`sk-card animate-slide-up d${i + 1}`}
            style={{ borderLeft: `5px solid ${game.color}` }}>
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${game.color}, #FFE000)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                }}>🔔</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 22, letterSpacing: '0.06em', color: '#111100', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {game.name}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#c9a800', marginTop: 3 }}>
                    ⏰ खुलने का समय: {game.time}
                  </div>
                </div>
              </div>
              <span className="badge-waiting animate-shimmer" style={{ flexShrink: 0, fontSize: 9 }}>जल्द</span>
            </div>
            <div style={{ height: 3, background: '#FFF9C4' }}>
              <div className="animate-shimmer" style={{ width: '35%', height: '100%', background: game.color, opacity: 0.5 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
