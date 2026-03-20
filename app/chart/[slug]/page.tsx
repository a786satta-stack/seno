export const dynamic = 'force-dynamic'

import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { Result } from '@/models/Result'
import { MonthlyChart } from '@/models/MonthlyChart'
import Header from '@/components/frontend/Header'
import MonthlyChartTable from '@/components/frontend/MonthlyChartTable'
import Footer from '@/components/frontend/Footer'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'

function isObjectId(s: string) {
  return /^[0-9a-fA-F]{24}$/.test(s)
}

export default async function GameChartPage({ params }: { params: { slug: string } }) {
  await dbConnect()

  const slugParam = decodeURIComponent(params.slug)

  // 1. Try exact slug
  let game: any = await Game.findOne({ slug: slugParam, isActive: true }).lean()

  // 2. Try _id if it looks like a MongoDB ObjectId (24 hex chars)
  if (!game && isObjectId(slugParam)) {
    game = await Game.findById(slugParam).lean()
  }

  // 3. Case-insensitive slug fallback for any edge cases
  if (!game) {
    const escaped = slugParam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    game = await Game.findOne({
      slug: { $regex: new RegExp(`^${escaped}$`, 'i') },
      isActive: true,
    }).lean()
  }

  if (!game) notFound()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const chartDates = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(year, month - 1 - i, 1)
    return { year: d.getFullYear(), month: d.getMonth() + 1 }
  })

  const [charts, recentResults] = await Promise.all([
    MonthlyChart.find({ gameSlug: game.slug, $or: chartDates }).lean(),
    Result.find({ gameSlug: game.slug, isPublished: true }).sort({ resultDate: -1 }).limit(14).lean(),
  ])

  const chartMap = Object.fromEntries(
    (charts as any[]).map(c => [`${c.year}-${c.month}`, c])
  )

  const gameName = (game.name || '').toUpperCase()

  return (
    <div className="min-h-dvh grid-bg" style={{ background: '#FFFFFF' }}>
      <Header />
      <main style={{ width: '100%' }}>
        <div className="px-3 md:px-8 pb-10 w-full" style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="py-5 mb-4" style={{ borderBottom: '2px solid #FFE000' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ background: game.color || '#FFE000' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#7a6a10' }}>Game Chart</span>
            </div>
            <h1 className="font-display text-4xl tracking-wide leading-none" style={{ color: '#111100' }}>
              {gameName}
            </h1>
            <p className="font-mono text-sm mt-1" style={{ color: '#c9a800' }}>
              {game.openTime} – {game.closeTime}
            </p>
          </div>

          {recentResults.length > 0 && (
            <div className="mb-5">
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: '#7a6a10' }}>Recent Results</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(recentResults as any[]).map(r => (
                  <div key={r._id} className="shrink-0 text-center sk-card px-3 py-2" style={{ minWidth: 56 }}>
                    <div className="result-number" style={{ fontSize: 20 }}>{r.resultNumber}</div>
                    <div className="font-mono mt-1" style={{ fontSize: 10, color: '#7a6a10' }}>
                      {format(new Date(r.resultDate), 'd MMM')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {chartDates.map(({ year: y, month: m }) => {
              const chart = chartMap[`${y}-${m}`]
              const monthName = new Date(y, m - 1, 1).toLocaleDateString('en', { month: 'long', year: 'numeric' })
              return (
                <MonthlyChartTable key={`${y}-${m}`} gameName={monthName} year={y} month={m} entries={chart?.entries || []} />
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <Link href="/chart" className="font-mono text-sm font-bold" style={{ color: '#c9a800' }}>
              ← All Game Charts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
