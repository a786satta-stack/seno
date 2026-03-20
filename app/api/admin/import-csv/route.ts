import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { Result } from '@/models/Result'
import { MonthlyChart } from '@/models/MonthlyChart'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()

  const body = await req.json()
  const { rows } = body // [{ slug, date, result }]

  if (!rows || !Array.isArray(rows)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const games = await Game.find({}).lean()
  const gameMap = Object.fromEntries((games as any[]).map((g: any) => [g.slug, g]))

  let inserted = 0, skipped = 0, errors: string[] = []

  for (const row of rows) {
    const { slug, date, result } = row
    if (!slug || !date || !result || result === '-') { skipped++; continue }
    if (!/^\d{2}$/.test(result.toString().padStart(2,'0').slice(-2))) { skipped++; continue }

    const game = gameMap[slug.trim().toLowerCase()]
    if (!game) { errors.push(`Game not found: ${slug}`); skipped++; continue }

    const resultNumber = result.toString().padStart(2, '0').slice(-2)
    const resultDate = new Date(date)
    resultDate.setHours(0, 0, 0, 0)

    if (isNaN(resultDate.getTime())) { errors.push(`Invalid date: ${date}`); skipped++; continue }

    const year = resultDate.getFullYear()
    const month = resultDate.getMonth() + 1
    const day = resultDate.getDate()

    // Upsert result
    await Result.findOneAndUpdate(
      { gameSlug: game.slug, resultDate },
      {
        gameId: game._id, gameName: game.name, gameSlug: game.slug,
        resultNumber, resultDate, isPublished: true,
        publishedAt: resultDate, createdBy: 'csv-import',
      },
      { upsert: true, new: true }
    )

    // Update monthly chart
    let chart = await MonthlyChart.findOne({ gameSlug: game.slug, year, month })
    if (!chart) {
      chart = await MonthlyChart.create({
        gameId: game._id, gameName: game.name, gameSlug: game.slug,
        year, month, entries: []
      })
    }
    const existing = chart.entries.find((e: any) => e.day === day)
    if (existing) { existing.result = resultNumber }
    else { chart.entries.push({ day, result: resultNumber }) }
    chart.entries.sort((a: any, b: any) => a.day - b.day)
    await chart.save()

    inserted++
  }

  return NextResponse.json({ success: true, inserted, skipped, errors })
}
