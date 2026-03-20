'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Send, Calendar, Hash, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react'

interface Game {
  _id: string
  name: string
  slug: string
  openTime: string
  closeTime: string
  color: string
}

interface RecentResult {
  _id: string
  gameName: string
  resultNumber: string
  resultDate: string
  isPublished: boolean
}

export default function PostResultsPage() {
  const searchParams = useSearchParams()
  const defaultGame = searchParams.get('game') ?? ''

  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState('')
  const [resultNumber, setResultNumber] = useState('')
  const [resultDate, setResultDate] = useState(new Date().toISOString().split('T')[0])
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [recent, setRecent] = useState<RecentResult[]>([])
  const [loadingRecent, setLoadingRecent] = useState(false)

  // Load games
  useEffect(() => {
    fetch('/api/games')
      .then(r => r.json())
      .then(d => {
        setGames(d.data || [])
        if (defaultGame) {
          const g = (d.data || []).find((g: Game) => g.slug === defaultGame)
          if (g) setSelectedGame(g._id)
        } else if (d.data?.length) {
          setSelectedGame(d.data[0]._id)
        }
      })
  }, [defaultGame])

  // Load recent results
  useEffect(() => {
    setLoadingRecent(true)
    fetch('/api/results?limit=10')
      .then(r => r.json())
      .then(d => setRecent(d.data || []))
      .finally(() => setLoadingRecent(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedGame || !resultNumber || !resultDate) {
      toast.error('Please fill all fields')
      return
    }
    if (!/^\d{2}$/.test(resultNumber)) {
      toast.error('Result must be exactly 2 digits (00–99)')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: selectedGame, resultNumber, resultDate, isPublished }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Result ${resultNumber} posted!`)
        setResultNumber('')
        // Refresh recent
        fetch('/api/results?limit=10')
          .then(r => r.json())
          .then(d => setRecent(d.data || []))
      } else {
        toast.error(data.error || 'Failed to post result')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const game = games.find(g => g._id === selectedGame)

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl text-text tracking-wide">POST RESULT</h1>
        <p className="text-muted text-sm font-mono mt-1">Add or update a game result</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-2 border-b border-border">
          <h2 className="font-display text-lg text-text tracking-wide">RESULT DETAILS</h2>
        </div>

        <div className="p-4 space-y-4">
          {/* Game select */}
          <div>
            <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
              Select Game
            </label>
            <div className="relative">
              <select
                value={selectedGame}
                onChange={e => setSelectedGame(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary appearance-none pr-10"
                required
              >
                <option value="">Choose a game...</option>
                {games.map(g => (
                  <option key={g._id} value={g._id}>{g.name} ({g.openTime})</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>

          {/* Result number */}
          <div>
            <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
              Result Number (00–99)
            </label>
            <div className="relative">
              <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="number"
                min="0"
                max="99"
                value={resultNumber}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 2)
                  setResultNumber(v)
                }}
                className="w-full bg-surface-2 border border-border rounded-xl pl-9 pr-4 py-3 text-text font-mono text-2xl font-bold text-center focus:outline-none focus:border-primary tracking-widest"
                placeholder="00"
                pattern="\d{2}"
                required
              />
            </div>
            {/* Large preview */}
            {resultNumber && (
              <div className="mt-2 text-center">
                <div className="result-number text-7xl animate-number-flip">{resultNumber.padStart(2, '0')}</div>
                {game && (
                  <div className="text-muted text-xs font-mono mt-1">{game.name} · {resultDate}</div>
                )}
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
              Result Date
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="date"
                value={resultDate}
                onChange={e => setResultDate(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl pl-9 pr-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Publish toggle */}
          <div className="flex items-center justify-between py-3 px-4 bg-surface-2 rounded-xl border border-border">
            <div>
              <div className="font-semibold text-text text-sm">Publish Immediately</div>
              <div className="text-xs text-muted font-mono">Visible on the public site</div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                isPublished ? 'bg-success' : 'bg-surface'
              } border border-border`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
                isPublished ? 'left-6' : 'left-0.5'
              }`} />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-bg font-display text-2xl tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 active:opacity-80 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin" /> POSTING...</>
            ) : (
              <><Send size={20} /> POST RESULT</>
            )}
          </button>
        </div>
      </form>

      {/* Recent results */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-2 border-b border-border">
          <h2 className="font-display text-lg text-text tracking-wide">RECENT RESULTS</h2>
        </div>
        {loadingRecent ? (
          <div className="py-8 text-center text-muted font-mono text-sm">Loading...</div>
        ) : recent.length === 0 ? (
          <div className="py-8 text-center text-muted font-mono text-sm">No results yet</div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((r) => (
              <div key={r._id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-semibold text-text text-sm">{r.gameName}</div>
                  <div className="text-xs font-mono text-muted">
                    {new Date(r.resultDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="result-number text-2xl">{r.resultNumber}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                    r.isPublished
                      ? 'text-success border-success/30 bg-success/10'
                      : 'text-muted border-border bg-surface-2'
                  }`}>
                    {r.isPublished ? 'LIVE' : 'DRAFT'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
