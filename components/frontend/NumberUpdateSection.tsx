interface Props {
  games: Array<{ name: string; slug: string; openTime: string; color: string }>
  todayMap: Record<string, string>
  yesterdayMap: Record<string, string>
}

export default function NumberUpdateSection({ games, todayMap, yesterdayMap }: Props) {
  const list = games.filter(g => todayMap[g.slug] || yesterdayMap[g.slug])
  if (!list.length) return null

  return (
    <div className="mt-4 mb-4">
      <div className="section-bar mb-3"><h2>NUMBER UPDATE</h2></div>
      <div className="space-y-2">
        {list.map((g, i) => {
          const yest = yesterdayMap[g.slug]
          const today = todayMap[g.slug]
          return (
            <div key={g.slug} className={`sk-card animate-slide-up d${i + 1}`}>
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${g.color},#FFE000)` }} />
              <div className="py-3 px-4 text-center">
                <div className="font-display tracking-widest mb-1" style={{ fontSize: 22, color: '#111100' }}>
                  {(g.name || "").toUpperCase()}
                </div>
                <div className="font-mono text-[11px] mb-2" style={{ color: '#c9a800' }}>{g.openTime}</div>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-0.5" style={{ color: '#7a6a10' }}>Yesterday</div>
                    <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 36, fontWeight: 700, color: '#111100' }}>
                      {yest ?? '--'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl text-white font-bold text-xl"
                    style={{ background: '#16a34a', boxShadow: '0 3px 10px rgba(22,163,74,.4)' }}>➡</div>
                  <div className="text-center">
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-0.5" style={{ color: '#7a6a10' }}>Today</div>
                    <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 36, fontWeight: 700, color: today ? '#c9a800' : '#FFE57F' }}>
                      {today ?? '--'}
                    </span>
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
