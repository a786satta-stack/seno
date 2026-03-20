export const dynamic = 'force-dynamic'

import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { Result } from '@/models/Result'
import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'
import { startOfDay, format } from 'date-fns'

export default async function ResultsPage() {
  await dbConnect()
  const today = startOfDay(new Date())
  const [games, todayResults] = await Promise.all([
    Game.find({ isActive: true }).sort({ order: 1 }).lean(),
    Result.find({ resultDate: { $gte: today }, isPublished: true }).lean(),
  ])
  const resultMap = Object.fromEntries((todayResults as any[]).map(r => [r.gameSlug, r]))

  return (
    <div className="min-h-dvh grid-bg" style={{ background: '#FFFFFF' }}>
      <Header tickerItems={(games as any[]).map((g: any) => ({ gameName: g.name, resultNumber: resultMap[g.slug]?.resultNumber ?? '--' }))} />
      <main style={{ width: '100%' }}>
        <div className="px-3 md:px-8 pb-10 w-full" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="py-5 border-b-2 border-yellow-300 mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7a6a10' }}>Live Today</div>
            <h1 className="font-display text-3xl tracking-wide" style={{ color: '#111100' }}>ALL RESULTS</h1>
            <p className="font-mono text-sm mt-1" style={{ color: '#c9a800' }}>{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
          </div>

          <div className="sk-card overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between gold-bar">
              <span className="font-display text-lg tracking-wide" style={{ color: '#111100' }}>SATTA KING RESULT</span>
              <div className="flex items-center gap-1.5">
                <span className="live-dot" />
                <span className="font-mono text-xs font-bold text-green-700">LIVE</span>
              </div>
            </div>
            <div>
              {(games as any[]).map(game => {
                const result = resultMap[game.slug]
                return (
                  <div key={game._id} className="flex items-center px-4 py-4 border-b border-yellow-100"
                    style={{ borderLeft: `4px solid ${game.color}` }}>
                    <div className="flex-1">
                      <div className="font-display text-xl tracking-wide leading-none" style={{ color: '#111100' }}>{game.name.toUpperCase()}</div>
                      <div className="font-mono text-xs mt-0.5" style={{ color: '#c9a800' }}>{game.openTime} – {game.closeTime}</div>
                    </div>
                    <div className="text-right">
                      {result ? (
                        <>
                          <div className="result-number" style={{ fontSize: 36 }}>{result.resultNumber}</div>
                          <div className="font-mono text-xs text-green-700 font-bold">DECLARED</div>
                        </>
                      ) : (
                        <>
                          <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 28, fontWeight: 700, color: '#FFE57F' }}>--</div>
                          <div className="font-mono text-xs font-bold" style={{ color: '#a16207' }}>WAITING</div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-5 rounded-xl px-4 py-3 font-mono text-xs" style={{ background: '#FFFDE7', border: '1px solid #FFE000', color: '#7a6a10' }}>
            Results update as soon as they are declared. Refresh if a result is not showing.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
