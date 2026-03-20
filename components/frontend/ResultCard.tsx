'use client'
import { Clock, TrendingUp, TrendingDown } from 'lucide-react'

interface Props {
  game: { _id: string; name: string; slug: string; openTime: string; closeTime: string; color: string }
  todayResult?: string | null
  yesterdayResult?: string | null
}

function isAsciiSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug)
}

export default function ResultCard({ game, todayResult, yesterdayResult }: Props) {
  const has = !!todayResult
  const up = has && !!yesterdayResult && parseInt(todayResult!) > parseInt(yesterdayResult)
  const dn = has && !!yesterdayResult && parseInt(todayResult!) < parseInt(yesterdayResult)

  const chartHref = isAsciiSlug(game.slug) ? `/chart/${game.slug}` : `/chart/${game._id}`

  return (
    <div className="sk-card animate-slide-up touch-fb">
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg,${game.color},#FFE000 60%,${game.color})` }} />

      <div className="p-4">
        {/* Game name + badge */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display leading-none tracking-wide truncate" style={{ fontSize: 26, color: '#111100' }}>
              {(game.name || '').toUpperCase()}
            </h3>
            <div className="flex items-center gap-1 mt-1 font-mono text-[11px]" style={{ color: '#c9a800' }}>
              <Clock size={10} strokeWidth={2} />
              {/* Papa Ji: Showing only opening time now */}
              <span>{game.openTime}</span>
            </div>
          </div>
          {has
            ? <span className="badge-declared shrink-0">✓ DECLARED</span>
            : <span className="badge-waiting shrink-0 animate-shimmer">⏳ WAITING</span>}
        </div>

        {/* Numbers — Yesterday LEFT, Today RIGHT */}
        <div className="flex items-end justify-between">

          {/* Yesterday — LEFT */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c9a800' }}>Yesterday</div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 32, fontWeight: 700, color: '#d4b000' }}>
              {yesterdayResult ?? '--'}
            </div>
            {has && yesterdayResult && (
              <div className={`flex items-center gap-1 mt-1 text-xs font-mono font-bold ${up ? 'text-green-600' : dn ? 'text-red-500' : 'text-yellow-600'}`}>
                {up ? <TrendingUp size={12}/> : dn ? <TrendingDown size={12}/> : null}
                {up ? '↑ UP' : dn ? '↓ DOWN' : '= SAME'}
              </div>
            )}
          </div>

          {/* Today — RIGHT */}
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c9a800' }}>Today</div>
            {has
              ? <div className="animate-number-flip result-number" style={{ fontSize: 72 }}>{todayResult}</div>
              : <div className="result-number" style={{ fontSize: 56, color: '#FFE57F' }}>--</div>}
          </div>

        </div>
      </div>

      <a href={chartHref}
        className="flex items-center justify-center gap-2 py-3 font-mono text-sm font-bold tracking-widest border-t-2 border-yellow-300 touch-fb"
        style={{ background: '#FFFDE7', color: '#c9a800', textDecoration: 'none' }}>
        📊 VIEW CHART →
      </a>
    </div>
  )
}