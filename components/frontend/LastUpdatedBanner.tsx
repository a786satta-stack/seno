'use client'
import { useEffect, useState } from 'react'

interface Props { gameName: string; resultNumber: string; gameOpenTime: string }

export default function LastUpdatedBanner({ gameName, resultNumber, gameOpenTime }: Props) {
  const [ago, setAgo] = useState('')

  useEffect(() => {
    function calc() {
      if (!gameOpenTime) return
      const parts = gameOpenTime.trim().split(' ')
      const [hh, mm] = (parts[0] || '0:0').replace('.', ':').split(':')
      const mer = (parts[1] || '').toLowerCase().replace('.', '')
      let h = parseInt(hh) || 0; const m = parseInt(mm) || 0
      if (mer === 'pm' && h !== 12) h += 12
      if (mer === 'am' && h === 12) h = 0
      const d = new Date(); d.setHours(h, m, 0, 0)
      const diff = Math.floor((Date.now() - d.getTime()) / 1000)
      if (diff < 0) setAgo('upcoming')
      else if (diff < 60) setAgo(`${diff}s ago`)
      else if (diff < 3600) setAgo(`${Math.floor(diff / 60)}m ago`)
      else setAgo(`${Math.floor(diff / 3600)}h ago`)
    }
    calc(); const id = setInterval(calc, 10000); return () => clearInterval(id)
  }, [gameOpenTime])

  return (
    <div className="sk-card animate-pop-in" style={{ border: '2px solid #FFE000' }}>
      <div className="gold-bar animate-shimmer" style={{ height: 5 }} />
      <div style={{ padding: '14px 16px' }}>
        {/* header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Latest Result</span>
          </div>
          {ago && (
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 700, background: '#FFFDE7', color: '#c9a800', border: '1px solid #FFE000', padding: '3px 10px', borderRadius: 100 }}>{ago}</span>
          )}
        </div>

        {/* hindi tagline */}
        <div style={{ background: '#FFFDE7', border: '1px solid #FFE000', borderRadius: 12, padding: '10px 14px', textAlign: 'center', marginBottom: 14, fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#7a6a10' }}>
          हा भाई यही आती हे सबसे पहले खबर — रुको और देखो
        </div>

        {/* result row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 30, letterSpacing: '0.1em', color: '#111100', lineHeight: 1 }}>
              {(gameName ?? '').toUpperCase()}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#c9a800', marginTop: 5, fontWeight: 700 }}>{gameOpenTime}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7a6a10', marginBottom: 4 }}>Result</div>
            <div className="animate-number-flip result-number" style={{ fontSize: 72 }}>{resultNumber}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
