'use client'
import { useState, useEffect } from 'react'
import { Clock, Bell } from 'lucide-react'

// Static game data as requested
const STATIC_GAMES = [
  { name: 'SADAR BAZAR', time: '01:20 PM', color: '#f59e0b' },
  { name: 'GWALIOR', time: '02:20 PM', color: '#ef4444' },
  { name: 'DELHI BAZAR', time: '02:50 PM', color: '#3b82f6' },
  { name: 'DELHI MATKA', time: '03:20 PM', color: '#22c55e' },
  { name: 'SHRI GANESH', time: '04:20 PM', color: '#a855f7' },
  { name: 'AGRA', time: '05:20 PM', color: '#f97316' },
  { name: 'FARIDABAD', time: '05:50 PM', color: '#06b6d4' },
  { name: 'ALWAR', time: '07:20 PM', color: '#ec4899' },
  { name: 'GHAZIABAD', time: '08:50 PM', color: '#f59e0b' },
  { name: 'DWARKA', time: '10:15 PM', color: '#ef4444' },
  { name: 'GALI', time: '11:20 PM', color: '#3b82f6' },
  { name: 'DISAWAR', time: '05:00 AM', color: '#22c55e' },
]

export default function NextThreeGames() {
  const [upcoming, setUpcoming] = useState<typeof STATIC_GAMES>([])

  useEffect(() => {
    const getNextGames = () => {
      const now = new Date()
      const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes()

      const parsedGames = STATIC_GAMES.map(game => {
        const [time, modifier] = game.time.split(' ')
        let [hours, minutes] = time.split(':').map(Number)
        if (modifier === 'PM' && hours !== 12) hours += 12
        if (modifier === 'AM' && hours === 12) hours = 0
        return { ...game, totalMinutes: hours * 60 + minutes }
      })

      // Find games today that haven't happened yet, or games tomorrow
      let filtered = parsedGames.filter(g => g.totalMinutes > currentTimeInMinutes)
      
      // If less than 3 games left today, wrap around to the start of the list (tomorrow's early games)
      if (filtered.length < 3) {
        filtered = [...filtered, ...parsedGames].slice(0, 3)
      } else {
        filtered = filtered.slice(0, 3)
      }

      setUpcoming(filtered)
    }

    getNextGames()
    const interval = setInterval(getNextGames, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 mb-4">
      {/* Exact same section bar theme */}
      <div className="section-bar mb-3">
        <h2>UPCOMING GAMES</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {upcoming.map((game, i) => (
          <div 
            key={game.name} 
            className={`sk-card animate-slide-up d${i + 1}`} 
            style={{ borderLeft: `6px solid ${game.color}` }}
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${game.color}, #FFE000)` }}
                >
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-none tracking-wide" style={{ color: '#111100' }}>
                    {game.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: '#c9a800' }}>
                    <Clock size={12} />
                    <span>OPENING AT {game.time}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span className="badge-waiting animate-shimmer">
                UPCOMING
              </span>
            </div>
            
            {/* Bottom progress bar mimic */}
            <div className="h-1 w-full bg-surface-2">
              <div 
                className="h-full animate-shimmer" 
                style={{ width: '40%', background: game.color, opacity: 0.6 }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}