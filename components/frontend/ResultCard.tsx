'use client'
import { Clock, TrendingUp, TrendingDown } from 'lucide-react'

interface Props {
  game: { _id: string; name: string; slug: string; openTime: string; closeTime: string; color: string }
  todayResult?: string | null
  yesterdayResult?: string | null
}

function isAsciiSlug(slug: string) { return /^[a-z0-9-]+$/.test(slug) }

export default function ResultCard({ game, todayResult, yesterdayResult }: Props) {
  const has = !!todayResult
  const up = has && !!yesterdayResult && parseInt(todayResult!) > parseInt(yesterdayResult)
  const dn = has && !!yesterdayResult && parseInt(todayResult!) < parseInt(yesterdayResult)
  const chartHref = isAsciiSlug(game.slug) ? `/chart/${game.slug}` : `/chart/${game._id}`

  return (
    <div className="sk-card animate-slide-up touch-fb" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* color top bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg,${game.color},#FFE000 60%,${game.color})` }} />

      <div style={{ padding: '14px 14px 12px', flex: 1 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 22, letterSpacing: '0.06em', color: '#111100', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {(game.name || '').toUpperCase()}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#c9a800' }}>
              <Clock size={9} strokeWidth={2} />
              <span>{game.openTime}</span>
            </div>
          </div>
          {has
            ? <span className="badge-declared" style={{ flexShrink: 0 }}>✓ DECLARED</span>
            : <span className="badge-waiting animate-shimmer" style={{ flexShrink: 0 }}>⏳ WAITING</span>}
        </div>

        {/* numbers */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c9a800', marginBottom: 2 }}>Yesterday</div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 28, fontWeight: 700, color: '#d4b000' }}>
              {yesterdayResult ?? '--'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c9a800', marginBottom: 2 }}>Today</div>
            {has
              ? <div className="animate-number-flip result-number" style={{ fontSize: 64 }}>{todayResult}</div>
              : <div className="result-number" style={{ fontSize: 48, color: '#FFE57F' }}>--</div>}
            {has && yesterdayResult && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 3, fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 700, color: up ? '#16a34a' : dn ? '#ef4444' : '#c9a800' }}>
                {up ? <TrendingUp size={11}/> : dn ? <TrendingDown size={11}/> : null}
                {up ? '↑ UP' : dn ? '↓ DOWN' : '= SAME'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* chart link */}
      <a href={chartHref}
        className="touch-fb"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: '#FFFDE7', color: '#c9a800', textDecoration: 'none', borderTop: '2px solid #FFE000' }}>
        📊 VIEW CHART →
      </a>
    </div>
  )
}
