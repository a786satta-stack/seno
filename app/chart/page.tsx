export const dynamic = 'force-dynamic'

import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { MonthlyChart } from '@/models/MonthlyChart'
import Header from '@/components/frontend/Header'
import MonthlyChartTable from '@/components/frontend/MonthlyChartTable'
import Footer from '@/components/frontend/Footer'
import { format } from 'date-fns'
import Link from 'next/link'

export default async function ChartPage({ searchParams }: { searchParams: { month?: string; year?: string } }) {
  await dbConnect()

  const now = new Date()
  const year = parseInt(searchParams.year || String(now.getFullYear()))
  const month = parseInt(searchParams.month || String(now.getMonth() + 1))

  const [games, charts] = await Promise.all([
    Game.find({ isActive: true }).sort({ order: 1 }).lean(),
    MonthlyChart.find({ year, month }).lean(),
  ])

  const chartMap = Object.fromEntries((charts as any[]).map(c => [c.gameSlug, c]))

  const monthsDiff = (now.getFullYear() - 2024) * 12 + now.getMonth() + 1
  const monthOptions = Array.from({ length: Math.max(1, monthsDiff) }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: format(d, 'MMM yyyy') }
  })

  return (
    <div className="min-h-dvh grid-bg" style={{ background: '#FFFFFF' }}>
      <Header />
      <main style={{ width: '100%' }}>
        <div className="px-3 md:px-8 pb-10 w-full" style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="py-5 mb-4" style={{ borderBottom: '2px solid #FFE000' }}>
            <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7a6a10' }}>Historical Data</div>
            <h1 className="font-display text-3xl tracking-wide" style={{ color: '#111100' }}>MONTHLY CHART</h1>
          </div>

          {/* Month selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {monthOptions.map(opt => {
              const active = opt.year === year && opt.month === month
              return (
                <Link key={`${opt.year}-${opt.month}`}
                  href={`/chart?year=${opt.year}&month=${opt.month}`}
                  className="shrink-0 px-4 py-2 rounded-xl font-mono text-sm font-bold border-2 touch-fb"
                  style={{
                    background: active ? '#FFE000' : '#FFFFFF',
                    color: active ? '#111100' : '#c9a800',
                    borderColor: '#FFE000',
                    textDecoration: 'none',
                  }}>
                  {opt.label}
                </Link>
              )
            })}
          </div>

          <div className="space-y-4">
            {(games as any[]).map(game => {
              const chart = chartMap[game.slug]
              return (
                <MonthlyChartTable key={game._id} gameName={game.name} year={year} month={month} entries={chart?.entries || []} />
              )
            })}
          </div>

          {games.length === 0 && (
            <div className="py-20 text-center font-mono" style={{ color: '#c9a800' }}>No games configured</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
