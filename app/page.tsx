export const dynamic = 'force-dynamic'

import { dbConnect } from '@/lib/db'
import { Game } from '@/models/Game'
import { Result } from '@/models/Result'
import Header from '@/components/frontend/Header'
import ResultCard from '@/components/frontend/ResultCard'
import LastUpdatedBanner from '@/components/frontend/LastUpdatedBanner'
import NextThreeGames from '@/components/frontend/NextThreeGames'
import NumberUpdateSection from '@/components/frontend/NumberUpdateSection'
import SocialChannels from '@/components/frontend/SocialChannels'
import KhaiwaalSection from '@/components/frontend/KhaiwaalSection'
import SeoContent from '@/components/frontend/SeoContent'
import FaqSection from '@/components/frontend/FaqSection'
import Footer from '@/components/frontend/Footer'
import { subDays, startOfDay } from 'date-fns'

async function getData() {
  await dbConnect()
  const games = await Game.find({ isActive: true }).sort({ order: 1 }).lean()
  const today = startOfDay(new Date())
  const yesterday = startOfDay(subDays(new Date(), 1))
  const [todayR, yesterdayR, lastR] = await Promise.all([
    Result.find({ resultDate: { $gte: today }, isPublished: true }).lean(),
    Result.find({ resultDate: { $gte: yesterday, $lt: today }, isPublished: true }).lean(),
    Result.findOne({ isPublished: true }).sort({ publishedAt: -1 }).lean(),
  ])
  const todayMap = Object.fromEntries(todayR.map((r: any) => [r.gameSlug, r.resultNumber]))
  const yesterdayMap = Object.fromEntries(yesterdayR.map((r: any) => [r.gameSlug, r.resultNumber]))
  const lastGame = lastR ? (games as any[]).find((g: any) => g.slug === (lastR as any).gameSlug) : null
  const tickerItems = (games as any[]).map((g: any) => ({
    gameName: g.name,
    resultNumber: todayMap[g.slug] ?? '--',
  }))
  return { games, todayMap, yesterdayMap, lastR, lastGame, tickerItems }
}

export default async function HomePage() {
  const { games, todayMap, yesterdayMap, lastR, lastGame, tickerItems } = await getData()
  const todayStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const disclaimer = (
    <div className="rounded-2xl px-4 py-3 font-mono text-xs leading-relaxed border-2 flex items-start gap-2"
      style={{ background: '#FFF5F5', borderColor: '#fca5a5', color: '#991b1b' }}>
      <span className="text-base shrink-0">⚠️</span>
      <span>For entertainment &amp; informational purposes only. Gambling may be illegal in your jurisdiction.</span>
    </div>
  )

  const resultsGrid = games.length === 0 ? (
    <div className="text-center py-20 font-mono" style={{ color: '#c9a800' }}>No games configured yet.</div>
  ) : (
    <div>
      <div className="section-bar mb-4"><h2>TODAY&apos;S RESULTS</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(games as any[]).map((g: any, i: number) => (
          <div key={g._id} className={`d${Math.min(i + 1, 12)}`}>
            <ResultCard
              game={{ _id: g._id.toString(), name: g.name, slug: g.slug, openTime: g.openTime, closeTime: g.closeTime, color: g.color }}
              todayResult={todayMap[g.slug] ?? null}
              yesterdayResult={yesterdayMap[g.slug] ?? null}
            />
          </div>
        ))}
      </div>
    </div>
  )

  const numberUpdate = (
    <NumberUpdateSection
      games={(games as any[]).map((g: any) => ({ name: g.name, slug: g.slug, openTime: g.openTime, color: g.color }))}
      todayMap={todayMap}
      yesterdayMap={yesterdayMap}
    />
  )

  const bannerSection = lastR && lastGame ? (
    <LastUpdatedBanner
      gameName={(lastR as any).gameName ?? (lastGame as any).name ?? ''}
      resultNumber={(lastR as any).resultNumber ?? ''}
      gameOpenTime={(lastGame as any).openTime ?? ''}
    />
  ) : null

  return (
    <div className="min-h-dvh grid-bg" style={{ background: '#FFFFFF' }}>
      <Header tickerItems={tickerItems} />

      <main className="pb-safe" style={{ width: '100%' }}>
        <div className="px-3 md:px-8 py-5 w-full" style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Page heading */}
          <div className="py-4 text-center mb-5">
            <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7a6a10' }}>Today&apos;s Results</div>
            <h1 className="font-display text-3xl tracking-wide leading-none" style={{ color: '#111100' }}>{todayStr.toUpperCase()}</h1>
            <div className="gold-divider mt-3" />
          </div>

          {/* ── MOBILE ── */}
          <div className="md:hidden space-y-5">
            {bannerSection}
            <NextThreeGames />
            <SocialChannels whatsappLink="https://whatsapp.com/channel/0029VbCHriDFCCoWbzrHyk0b" telegramLink="https://t.me/a786result" />
            <KhaiwaalSection />
            {numberUpdate}
            {disclaimer}
            {resultsGrid}
            <SeoContent />
            <FaqSection />
          </div>

          {/* ── DESKTOP ── */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:items-start">
            <div className="md:col-span-2 space-y-6">
              {bannerSection}
              <NextThreeGames />
              {disclaimer}
              {numberUpdate}
              {resultsGrid}
              <SeoContent />
              <FaqSection />
            </div>
            <div className="md:col-span-1 space-y-6">
              <SocialChannels whatsappLink="https://whatsapp.com/channel/0029VbCHriDFCCoWbzrHyk0b" telegramLink="https://t.me/a786result" />
              <KhaiwaalSection />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
