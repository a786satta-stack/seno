'use client'
import { useEffect, useState } from 'react'

interface Props {
  gameName: string
  resultNumber: string
  gameOpenTime: string
}

export default function LastUpdatedBanner({ gameName, resultNumber, gameOpenTime }: Props) {
  const [ago, setAgo] = useState('')
  const safeName = gameName ?? ''

  useEffect(() => {
    function calc() {
      if (!gameOpenTime) return
      const clean = gameOpenTime.trim()
      const parts = clean.split(' ')
      const timePart = parts[0] || '0:0'
      const mer = (parts[1] || '').toLowerCase().replace('.', '')
      const [hh, mm] = timePart.replace('.', ':').split(':')
      let h = parseInt(hh) || 0
      const m = parseInt(mm) || 0
      if (mer === 'pm' && h !== 12) h += 12
      if (mer === 'am' && h === 12) h = 0
      const d = new Date()
      d.setHours(h, m, 0, 0)
      const diff = Math.floor((Date.now() - d.getTime()) / 1000)
      if (diff < 0) setAgo('upcoming')
      else if (diff < 60) setAgo(`${diff}s ago`)
      else if (diff < 3600) setAgo(`${Math.floor(diff / 60)}m ago`)
      else setAgo(`${Math.floor(diff / 3600)}h ago`)
    }
    calc()
    const id = setInterval(calc, 10000)
    return () => clearInterval(id)
  }, [gameOpenTime])

  return (
    <div className="mb-4">
      <div className="sk-card animate-pop-in" style={{ border: '2px solid #FFE000' }}>
        <div className="gold-bar h-1.5 animate-shimmer" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <span className="font-mono text-xs font-bold tracking-widest text-green-700 uppercase">Latest Result</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-full font-bold"
              style={{ background: '#FFFDE7', color: '#c9a800', border: '1px solid #FFE000' }}>{ago}</span>
          </div>

          <p className="font-mono text-xs mb-3 text-center py-2 rounded-xl"
            style={{ color: '#7a6a10', background: '#FFFDE7', border: '1px solid #FFE000' }}>
            हा भाई यही आती हे सबसे पहले खबर — रुको और देखो
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-display tracking-widest leading-none" style={{ fontSize: 28, color: '#111100' }}>
                {safeName.toUpperCase()}
              </div>
              <div className="font-mono text-xs mt-1 font-bold" style={{ color: '#c9a800' }}>{gameOpenTime}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7a6a10' }}>Result</div>
              <div className="animate-number-flip result-number" style={{ fontSize: 76 }}>{resultNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
