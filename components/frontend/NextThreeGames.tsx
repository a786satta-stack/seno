'use client'
import { useState, useEffect } from 'react'
import { Clock, Bell } from 'lucide-react'

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
    const getNextGames = () => {
      const now = new Date()
      const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes()
      const parsedGames = STATIC_GAMES.map(game => {
        const [timeStr, modifier] = game.time.split(' ')
        let [hours, minutes] = timeStr.split(':').map(Number)
        if (modifier === 'PM' && hours !== 12) hours += 12
        if (modifier === 'AM' && hours === 12) hours = 0
        return { ...game, totalMinutes: hours * 60 + minutes }
      })
      parsedGames.sort((a, b) => a.totalMinutes - b.totalMinutes)
      let filtered = parsedGames.filter(g => g.totalMinutes > currentTimeInMinutes)
      if (filtered.length < 3) {
        filtered = [...filtered, ...parsedGames].slice(0, 3)
      } else {
        filtered = filtered.slice(0, 3)
      }
      setUpcoming(filtered)
    }
    getNextGames()
    const interval = setInterval(getNextGames, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="section-bar mb-4"><h2>आने वाले गेम्स</h2></div>
      <div className="grid grid-cols-1 gap-3">
        {upcoming.map((game, i) => (
          <div
            key={`${game.name}-${i}`}
            className={`sk-card animate-slide-up d${i + 1}`}
            style={{ borderLeft: `5px solid ${game.color}` }}
          >
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${game.color}, #FFE000)` }}
                >
                  <Bell size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-none tracking-wide truncate" style={{ color: '#111100' }}>
                    {game.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: '#c9a800' }}>
                    <Clock size={11} />
                    <span>खुलने का समय: {game.time}</span>
                  </div>
                </div>
              </div>
              <span className="badge-waiting animate-shimmer shrink-0" style={{ fontSize: '10px' }}>
                जल्द आ रहा है
              </span>
            </div>
            <div className="h-1 w-full" style={{ background: '#FFF9C4' }}>
              <div className="h-full animate-shimmer" style={{ width: '40%', background: game.color, opacity: 0.6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
