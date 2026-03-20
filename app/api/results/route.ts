import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Result } from '@/models/Result'
import { MonthlyChart } from '@/models/MonthlyChart'
import { Game } from '@/models/Game'

// GET /api/results?gameSlug=disawar&date=2024-06-01&limit=30
export async function GET(req: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const gameSlug = searchParams.get('gameSlug')
  const date = searchParams.get('date')
  const limit = parseInt(searchParams.get('limit') || '30')

  const filter: any = { isPublished: true }
  if (gameSlug) filter.gameSlug = gameSlug
  if (date) {
    const d = new Date(date)
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    filter.resultDate = { $gte: d, $lt: next }
  }

  const results = await Result.find(filter)
    .sort({ resultDate: -1 })
    .limit(limit)
    .lean()

  return NextResponse.json({ success: true, data: results })
}

// POST /api/results  — admin only
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const body = await req.json()
  const { gameId, resultNumber, resultDate, isPublished } = body

  if (!gameId || !resultNumber || !resultDate) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const game = await Game.findById(gameId)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const date = new Date(resultDate)
  date.setHours(0, 0, 0, 0)

  // Upsert result
  const result = await Result.findOneAndUpdate(
    { gameSlug: game.slug, resultDate: date },
    {
      gameId,
      gameName: game.name,
      gameSlug: game.slug,
      resultNumber,
      resultDate: date,
      isPublished: isPublished ?? false,
      publishedAt: isPublished ? new Date() : undefined,
      createdBy: (session.user as any).id,
    },
    { upsert: true, new: true }
  )

  // Update monthly chart
  await updateMonthlyChart(game, date, resultNumber)

  return NextResponse.json({ success: true, data: result })
}

async function updateMonthlyChart(game: any, date: Date, resultNumber: string) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  await MonthlyChart.findOneAndUpdate(
    { gameSlug: game.slug, year, month },
    {
      $set: {
        gameId: game._id,
        gameName: game.name,
        [`entries`]: undefined, // will be handled below
      },
    },
    { upsert: true }
  )

  // Pull current chart
  const chart = await MonthlyChart.findOne({ gameSlug: game.slug, year, month })
  if (!chart) return

  const existing = chart.entries.find((e: any) => e.day === day)
  if (existing) {
    existing.result = resultNumber
  } else {
    chart.entries.push({ day, result: resultNumber })
  }
  chart.entries.sort((a: any, b: any) => a.day - b.day)
  await chart.save()
}
