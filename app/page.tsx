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
  const todayStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-dvh grid-bg" style={{ background: '#FFFFFF' }}>
      <Header tickerItems={tickerItems} />

      <main style={{ width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 14px 40px' }}>

          {/* ── PAGE HEADING ── */}
          <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #FFE000' }}>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#7a6a10', marginBottom: 6 }}>
              Live Satta Results
            </div>
            <h1 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 28, letterSpacing: '0.08em', color: '#111100', lineHeight: 1 }}>
              {todayStr.toUpperCase()}
            </h1>
          </div>

          {/* ── SINGLE UNIFIED LAYOUT (no duplicate mobile/desktop) ── */}
          <div className="page-grid">

            {/* ── MAIN COLUMN ── */}
            <div className="section-gap">

              {/* Latest Result Banner */}
              {lastR && lastGame && (
                <LastUpdatedBanner
                  gameName={(lastR as any).gameName ?? (lastGame as any).name ?? ''}
                  resultNumber={(lastR as any).resultNumber ?? ''}
                  gameOpenTime={(lastGame as any).openTime ?? ''}
                />
              )}

              {/* Upcoming Games */}
              <NextThreeGames />

              {/* Number Update */}
              <NumberUpdateSection
                games={(games as any[]).map((g: any) => ({
                  name: g.name, slug: g.slug, openTime: g.openTime, color: g.color
                }))}
                todayMap={todayMap}
                yesterdayMap={yesterdayMap}
              />

              {/* Disclaimer */}
              <div style={{
                background: '#FFF5F5', border: '2px solid #fca5a5', borderRadius: 16,
                padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 8,
                fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#991b1b', lineHeight: 1.6
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <span>For entertainment &amp; informational purposes only. Gambling may be illegal in your jurisdiction.</span>
              </div>

              {/* Today's Results */}
              <div>
                <div className="section-bar" style={{ marginBottom: 14 }}><h2>TODAY&apos;S RESULTS</h2></div>
                {games.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'JetBrains Mono,monospace', color: '#c9a800' }}>
                    No games configured yet.
                  </div>
                ) : (
                  <div className="result-cards-grid">
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
                )}
              </div>

              <SeoContent />
              <FaqSection />
            </div>

            {/* ── SIDEBAR ── */}
            <div className="page-sidebar section-gap">
              <SocialChannels
                whatsappLink="https://whatsapp.com/channel/0029VbCHriDFCCoWbzrHyk0b"
                telegramLink="https://t.me/a786result"
              />
              <KhaiwaalSection />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
