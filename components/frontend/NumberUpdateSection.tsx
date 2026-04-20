interface Props {
  games: Array<{ name: string; slug: string; openTime: string; color: string }>
  todayMap: Record<string, string>
  yesterdayMap: Record<string, string>
}

export default function NumberUpdateSection({ games, todayMap, yesterdayMap }: Props) {
  const list = games.filter(g => todayMap[g.slug] || yesterdayMap[g.slug])
  if (!list.length) return null

  return (
    <div>
      <div className="section-bar" style={{ marginBottom: 14 }}><h2>NUMBER UPDATE</h2></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((g, i) => {
          const yest = yesterdayMap[g.slug]
          const today = todayMap[g.slug]
          return (
            <div key={g.slug} className={`sk-card animate-slide-up d${i + 1}`}>
              <div style={{ height: 4, background: `linear-gradient(90deg,${g.color},#FFE000)` }} />
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 20, letterSpacing: '0.08em', color: '#111100', textAlign: 'center', marginBottom: 2 }}>
                  {(g.name || '').toUpperCase()}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#c9a800', textAlign: 'center', marginBottom: 12 }}>
                  {g.openTime}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a6a10', marginBottom: 4 }}>Yesterday</div>
                    <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 34, fontWeight: 700, color: '#111100' }}>{yest ?? '--'}</div>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, boxShadow: '0 3px 10px rgba(22,163,74,.35)', flexShrink: 0 }}>➡</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a6a10', marginBottom: 4 }}>Today</div>
                    <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 34, fontWeight: 700, color: today ? '#c9a800' : '#FFE57F' }}>{today ?? '--'}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
