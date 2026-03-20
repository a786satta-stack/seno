import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'

// Map common Hindi/Devanagari game names to ASCII slugs
const SLUG_MAP: Record<string, string> = {
  'disawar': 'disawar', 'दिसावर': 'disawar',
  'faridabad': 'faridabad', 'फरीदाबाद': 'faridabad',
  'ghaziabad': 'ghaziabad', 'गाज़ियाबाद': 'ghaziabad', 'गाजियाबाद': 'ghaziabad',
  'delhi bazar': 'delhi-bazar', 'दिल्ली बाजार': 'delhi-bazar',
  'delhi matka': 'delhi-matka', 'दिल्ली मटका': 'delhi-matka',
  'shri ganesh': 'shri-ganesh', 'श्री गणेश': 'shri-ganesh',
  'hindustan': 'hindustan', 'हिंदुस्तान': 'hindustan',
  'gali': 'gali', 'गली': 'gali', 'गलि': 'gali',
  'sadar bazar': 'sadar-bazar', 'सदर बाजार': 'sadar-bazar',
  'alwar': 'alwar', 'अलवर': 'alwar',
  'agra': 'agra', 'आगरा': 'agra',
  'gwalior': 'gwalior', 'ग्वालियर': 'gwalior',
  'dwarka': 'dwarka', 'द्वारका': 'dwarka',
  'new ganga': 'new-ganga',
  'kuber city': 'kuber-city', 'कुबेर सिटी': 'kuber-city',
  'noida city': 'noida-city', 'नोएडा सिटी': 'noida-city',
}

function makeSlug(name: string): string {
  const lower = name.toLowerCase().trim()
  // Check map first
  if (SLUG_MAP[lower]) return SLUG_MAP[lower]
  if (SLUG_MAP[name.trim()]) return SLUG_MAP[name.trim()]
  // Strip non-ASCII and replace spaces with hyphens
  const ascii = name
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, '') // remove non-ASCII (Hindi chars)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  // If nothing left (all Hindi, no map match), use id-based fallback
  return ascii || `game-${Date.now()}`
}

export async function GET() {
  await dbConnect()
  const games = await Game.find({ isActive: true }).sort({ order: 1 }).lean()
  return NextResponse.json({ success: true, data: games })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const body = await req.json()
  const { name, openTime, closeTime, color, order } = body

  if (!name || !openTime || !closeTime) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const slug = makeSlug(name)
  const game = await Game.create({ name, slug, openTime, closeTime, color, order })
  return NextResponse.json({ success: true, data: game })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const body = await req.json()
  const { id, ...updates } = body

  // If name is being updated, regenerate slug
  if (updates.name) {
    updates.slug = makeSlug(updates.name)
  }

  const game = await Game.findByIdAndUpdate(id, updates, { new: true })
  return NextResponse.json({ success: true, data: game })
}
