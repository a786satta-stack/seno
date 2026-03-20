'use client'
import { useState, useRef } from 'react'
import { Upload, CheckCircle2, AlertCircle, FileText, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Row { slug: string; date: string; result: string }
interface ImportResult { inserted: number; skipped: number; errors: string[] }

export default function ImportPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function parseCSV(text: string): Row[] {
    const lines = text.trim().split('\n')
    const header = lines[0].toLowerCase().split(',').map(h => h.trim())
    const slugIdx = header.indexOf('slug')
    const dateIdx = header.indexOf('date')
    const resultIdx = header.indexOf('result')
    if (slugIdx < 0 || dateIdx < 0 || resultIdx < 0) {
      toast.error('CSV must have columns: slug, date, result')
      return []
    }
    return lines.slice(1).map(line => {
      const cols = line.split(',').map(c => c.trim())
      return { slug: cols[slugIdx], date: cols[dateIdx], result: cols[resultIdx] }
    }).filter(r => r.slug && r.date && r.result)
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      const parsed = parseCSV(text)
      setRows(parsed)
      setPreview(true)
      setResult(null)
      toast.success(`Parsed ${parsed.length} rows`)
    }
    reader.readAsText(file)
  }

  async function handleImport() {
    if (!rows.length) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data)
        toast.success(`✅ Imported ${data.inserted} results!`)
        setPreview(false)
        setRows([])
      } else {
        toast.error(data.error || 'Import failed')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl tracking-wide" style={{ color: '#111100' }}>IMPORT CSV</h1>
        <p className="font-mono text-sm mt-1" style={{ color: '#7a6a10' }}>Bulk import historical results from a CSV file</p>
      </div>

      {/* Format guide */}
      <div className="sk-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} style={{ color: '#c9a800' }} />
          <span className="font-mono text-sm font-bold" style={{ color: '#111100' }}>CSV Format Required</span>
        </div>
        <div className="rounded-xl p-3 font-mono text-xs" style={{ background: '#111100', color: '#FFE000' }}>
          slug,date,result<br/>
          disawar,2026-01-01,45<br/>
          disawar,2026-01-02,23<br/>
          faridabad,2026-01-01,12
        </div>
        <p className="font-mono text-xs mt-2" style={{ color: '#7a6a10' }}>
          • slug = game slug from admin (e.g. disawar, faridabad)<br/>
          • date = YYYY-MM-DD format<br/>
          • result = 2-digit number (00–99)<br/>
          • Skip dates with "-" — they will be ignored automatically
        </p>
      </div>

      {/* Upload area */}
      <div
        className="sk-card p-6 text-center cursor-pointer touch-fb"
        style={{ borderStyle: 'dashed', borderWidth: 2 }}
        onClick={() => fileRef.current?.click()}
      >
        <Upload size={32} className="mx-auto mb-3" style={{ color: '#c9a800' }} />
        <p className="font-display text-xl tracking-wide" style={{ color: '#111100' }}>DROP CSV FILE HERE</p>
        <p className="font-mono text-xs mt-1" style={{ color: '#7a6a10' }}>or click to browse</p>
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
      </div>

      {/* Preview */}
      {preview && rows.length > 0 && (
        <div className="sk-card overflow-hidden animate-slide-up">
          <div className="gold-bar px-4 py-3 flex items-center justify-between">
            <span className="font-display text-lg tracking-wide" style={{ color: '#111100' }}>
              PREVIEW — {rows.length} ROWS
            </span>
          </div>
          <div className="overflow-auto" style={{ maxHeight: 300 }}>
            <table className="w-full text-sm font-mono">
              <thead>
                <tr style={{ background: '#FFFDE7', borderBottom: '2px solid #FFE000' }}>
                  <th className="px-4 py-2 text-left" style={{ color: '#c9a800' }}>SLUG</th>
                  <th className="px-4 py-2 text-left" style={{ color: '#c9a800' }}>DATE</th>
                  <th className="px-4 py-2 text-center" style={{ color: '#c9a800' }}>RESULT</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #FFF9C4' }}>
                    <td className="px-4 py-2" style={{ color: '#111100' }}>{r.slug}</td>
                    <td className="px-4 py-2" style={{ color: '#111100' }}>{r.date}</td>
                    <td className="px-4 py-2 text-center font-bold" style={{ color: '#c9a800' }}>{r.result}</td>
                  </tr>
                ))}
                {rows.length > 50 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center font-mono text-xs" style={{ color: '#7a6a10' }}>
                      ... and {rows.length - 50} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t-2 border-yellow-300">
            <button
              onClick={handleImport}
              disabled={loading}
              className="btn-gold"
            >
              {loading
                ? <><Loader2 size={18} className="animate-spin" /> IMPORTING...</>
                : <><Upload size={18} /> IMPORT {rows.length} RESULTS</>
              }
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="sk-card p-4 animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={20} className="text-green-600" />
            <span className="font-display text-xl tracking-wide" style={{ color: '#111100' }}>IMPORT COMPLETE</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl p-3 text-center" style={{ background: '#f0fdf4', border: '2px solid #86efac' }}>
              <div className="font-mono text-3xl font-bold text-green-700">{result.inserted}</div>
              <div className="font-mono text-xs text-green-600 mt-1">INSERTED</div>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: '#FFFDE7', border: '2px solid #FFE000' }}>
              <div className="font-mono text-3xl font-bold" style={{ color: '#c9a800' }}>{result.skipped}</div>
              <div className="font-mono text-xs mt-1" style={{ color: '#7a6a10' }}>SKIPPED</div>
            </div>
          </div>
          {result.errors.length > 0 && (
            <div className="rounded-xl p-3" style={{ background: '#FFF5F5', border: '2px solid #fca5a5' }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={14} className="text-red-500" />
                <span className="font-mono text-xs font-bold text-red-600">ERRORS</span>
              </div>
              {result.errors.slice(0, 10).map((e, i) => (
                <p key={i} className="font-mono text-xs text-red-600">{e}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
