'use client'
interface ChartEntry { day: number; result: string | null }
interface Props { gameName: string; year: number; month: number; entries: ChartEntry[] }
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function MonthlyChartTable({ gameName, year, month, entries }: Props) {
  const full: (string | null)[] = Array(31).fill(null)
  entries.forEach(e => { if (e.day >= 1 && e.day <= 31) full[e.day - 1] = e.result })
  const rows: { day: number; result: string | null }[][] = []
  for (let i = 0; i < 31; i += 8)
    rows.push(Array.from({ length: Math.min(8, 31 - i) }, (_, j) => ({ day: i + j + 1, result: full[i + j] })))
  return (
    <div className="sk-card">
      <div className="gold-bar px-4 py-3 flex items-center justify-between">
        <h3 className="font-display text-xl tracking-wide" style={{ color: '#111100' }}>{gameName.toUpperCase()}</h3>
        <span className="font-mono text-sm font-bold" style={{ color: '#3a2a00' }}>{MONTHS[month-1]} {year}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full result-table">
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid #FFF9C4' : 'none' }}>
                {row.map(({ day, result }) => (
                  <td key={day} className="py-2 px-1 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: '#7a6a10' }}>{day}</span>
                      <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono,monospace', fontWeight: 700, color: result ? '#c9a800' : '#FFE57F' }}>
                        {result ?? '—'}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
