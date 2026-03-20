'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Check, X, Loader2, Gamepad2, Clock, Palette } from 'lucide-react'

interface Game {
  _id: string
  name: string
  slug: string
  openTime: string
  closeTime: string
  color: string
  order: number
  isActive: boolean
}

const PRESET_COLORS = ['#f59e0b', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#f97316', '#06b6d4', '#ec4899']

export default function ManageGamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '', openTime: '05:00 AM', closeTime: '06:00 AM', color: '#f59e0b', order: 0
  })

  useEffect(() => {
    fetch('/api/games')
      .then(r => r.json())
      .then(d => setGames(d.data || []))
      .finally(() => setLoading(false))
  }, [])

  function startEdit(game: Game) {
    setEditId(game._id)
    setForm({ name: game.name, openTime: game.openTime, closeTime: game.closeTime, color: game.color, order: game.order })
    setShowForm(true)
  }

  function resetForm() {
    setEditId(null)
    setForm({ name: '', openTime: '05:00 AM', closeTime: '06:00 AM', color: '#f59e0b', order: games.length })
    setShowForm(false)
  }

  async function handleSave() {
    if (!form.name || !form.openTime || !form.closeTime) {
      toast.error('Fill all required fields')
      return
    }
    setSaving(true)
    try {
      const isEdit = !!editId
      const res = await fetch('/api/games', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { id: editId, ...form } : form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(isEdit ? 'Game updated!' : 'Game added!')
        // Refresh
        const fresh = await fetch('/api/games').then(r => r.json())
        setGames(fresh.data || [])
        resetForm()
      } else {
        toast.error(data.error || 'Failed')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(game: Game) {
    const res = await fetch('/api/games', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: game._id, isActive: !game.isActive }),
    })
    const data = await res.json()
    if (data.success) {
      setGames(gs => gs.map(g => g._id === game._id ? { ...g, isActive: !g.isActive } : g))
      toast.success(game.isActive ? 'Game hidden' : 'Game shown')
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-text tracking-wide">MANAGE GAMES</h1>
          <p className="text-muted text-sm font-mono mt-1">{games.length} active games</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-primary text-bg font-bold font-mono text-sm px-4 py-2.5 rounded-xl active:opacity-80"
        >
          <Plus size={16} /> ADD GAME
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-surface border border-primary/30 rounded-2xl overflow-hidden animate-slide-up">
          <div className="px-4 py-3 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
            <h2 className="font-display text-lg text-primary tracking-wide">
              {editId ? 'EDIT GAME' : 'NEW GAME'}
            </h2>
            <button onClick={resetForm} className="text-muted active:opacity-60">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Game Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary"
                placeholder="e.g. Disawar"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Open Time *</label>
                <input
                  type="text"
                  value={form.openTime}
                  onChange={e => setForm(f => ({ ...f, openTime: e.target.value }))}
                  className="w-full bg-surface-2 border border-border rounded-xl px-3 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary"
                  placeholder="05:00 AM"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Close Time *</label>
                <input
                  type="text"
                  value={form.closeTime}
                  onChange={e => setForm(f => ({ ...f, closeTime: e.target.value }))}
                  className="w-full bg-surface-2 border border-border rounded-xl px-3 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary"
                  placeholder="06:00 AM"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Accent Color</label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      form.color === c ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                className="w-24 bg-surface-2 border border-border rounded-xl px-3 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary text-bg font-display text-xl tracking-wide py-3.5 rounded-xl flex items-center justify-center gap-2 active:opacity-80 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              {saving ? 'SAVING...' : editId ? 'UPDATE GAME' : 'ADD GAME'}
            </button>
          </div>
        </div>
      )}

      {/* Games list */}
      {loading ? (
        <div className="py-12 text-center text-muted font-mono">Loading games...</div>
      ) : games.length === 0 ? (
        <div className="py-12 text-center text-muted font-mono">No games yet. Add your first game!</div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {games.map(game => (
              <div key={game._id} className="flex items-center gap-3 px-4 py-3.5">
                {/* Color dot */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: game.color, boxShadow: `0 0 6px ${game.color}` }}
                />

                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${game.isActive ? 'text-text' : 'text-muted line-through'}`}>
                    {game.name}
                  </div>
                  <div className="text-xs font-mono text-muted flex items-center gap-1">
                    <Clock size={10} />
                    {game.openTime} – {game.closeTime}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Active toggle */}
                  <button
                    onClick={() => toggleActive(game)}
                    className={`text-xs font-mono px-2 py-1 rounded-lg border transition-all ${
                      game.isActive
                        ? 'text-success border-success/30 bg-success/10'
                        : 'text-muted border-border bg-surface-2'
                    }`}
                  >
                    {game.isActive ? 'ON' : 'OFF'}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => startEdit(game)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted active:bg-surface-2"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
