export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { Result } from '@/models/Result'
import { startOfDay } from 'date-fns'
import { BarChart2, Gamepad2, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  await dbConnect()

  const [totalGames, totalResults, todayResults, pendingGames] = await Promise.all([
    Game.countDocuments({ isActive: true }),
    Result.countDocuments(),
    Result.countDocuments({ resultDate: { $gte: startOfDay(new Date()) }, isPublished: true }),
    Game.find({ isActive: true }).sort({ order: 1 }).lean(),
  ])

  const todayResultsMap = await Result.find({
    resultDate: { $gte: startOfDay(new Date()) },
    isPublished: true,
  }).lean()
  const publishedSlugs = new Set(todayResultsMap.map((r: any) => r.gameSlug))
  const missing = (pendingGames as any[]).filter(g => !publishedSlugs.has(g.slug))

  const stats = [
    { label: 'Active Games', value: totalGames, icon: Gamepad2, color: 'text-primary' },
    { label: 'Total Results', value: totalResults, icon: BarChart2, color: 'text-success' },
    { label: "Today Posted", value: todayResults, icon: CheckCircle2, color: 'text-success' },
    { label: 'Pending Today', value: missing.length, icon: Clock, color: 'text-accent' },
  ]

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl text-text tracking-wide">DASHBOARD</h1>
        <p className="text-muted text-sm font-mono mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-surface border border-border rounded-2xl p-4">
            <Icon size={20} className={`${color} mb-2`} />
            <div className={`font-mono text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-muted text-xs font-mono mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Pending results */}
      {missing.length > 0 && (
        <div className="bg-surface border border-accent/30 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-accent/10 border-b border-accent/20 flex items-center justify-between">
            <h2 className="font-display text-lg text-accent tracking-wide">PENDING TODAY</h2>
            <span className="text-accent font-mono text-sm">{missing.length} games</span>
          </div>
          <div className="divide-y divide-border">
            {missing.map((game: any) => (
              <div key={game._id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-semibold text-text">{game.name}</div>
                  <div className="text-xs font-mono text-muted">{game.openTime} – {game.closeTime}</div>
                </div>
                <Link
                  href={`/admin/results?game=${game.slug}`}
                  className="bg-primary text-bg font-mono text-xs px-3 py-1.5 rounded-lg font-bold active:opacity-70"
                >
                  POST
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All today's results */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-2 border-b border-border">
          <h2 className="font-display text-lg text-text tracking-wide">TODAY'S RESULTS</h2>
        </div>
        <div className="divide-y divide-border">
          {(pendingGames as any[]).map((game: any) => {
            const result = todayResultsMap.find((r: any) => r.gameSlug === game.slug)
            return (
              <div key={game._id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-semibold text-text">{game.name}</div>
                  <div className="text-xs font-mono text-muted">{game.openTime}</div>
                </div>
                <div className="flex items-center gap-3">
                  {result ? (
                    <span className="result-number text-2xl">{result.resultNumber}</span>
                  ) : (
                    <span className="text-muted font-mono text-sm">—</span>
                  )}
                  <Link
                    href={`/admin/results?game=${game.slug}`}
                    className="text-primary font-mono text-xs active:opacity-60"
                  >
                    {result ? 'EDIT' : 'ADD'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/admin/results"
          className="bg-primary text-bg font-display text-xl tracking-wide py-4 rounded-2xl text-center active:opacity-80 touch-feedback"
        >
          POST RESULT
        </Link>
        <Link
          href="/admin/games"
          className="bg-surface-2 border border-border text-text font-display text-xl tracking-wide py-4 rounded-2xl text-center active:opacity-70 touch-feedback"
        >
          MANAGE GAMES
        </Link>
      </div>
    </div>
  )
}
