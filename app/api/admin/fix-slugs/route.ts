import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'

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
  if (SLUG_MAP[lower]) return SLUG_MAP[lower]
  if (SLUG_MAP[name.trim()]) return SLUG_MAP[name.trim()]
  const ascii = name.toLowerCase()
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return ascii || `game-${Date.now()}`
}

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const games = await Game.find({}).lean()
  const fixed = []

  for (const game of games as any[]) {
    const isAscii = /^[a-z0-9-]+$/.test(game.slug || '')
    if (!isAscii) {
      const newSlug = makeSlug(game.name)
      await Game.findByIdAndUpdate(game._id, { slug: newSlug })
      fixed.push({ name: game.name, oldSlug: game.slug, newSlug })
    }
  }

  return NextResponse.json({ success: true, fixed, total: fixed.length })
}
