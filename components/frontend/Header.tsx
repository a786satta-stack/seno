'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home, BarChart2, Clock, Phone } from 'lucide-react'

interface TickerItem { gameName: string; resultNumber: string }

export default function Header({ tickerItems = [] }: { tickerItems?: TickerItem[] }) {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    const s = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', s, { passive: true })
    return () => { clearInterval(id); window.removeEventListener('scroll', s) }
  }, [])

  // Build ticker string from real results, fallback to placeholder if none
  const tickerText = tickerItems.length > 0
    ? tickerItems.map(t => `${(t.gameName || '').toUpperCase()} ${t.resultNumber || '--'}`).join(' \u00a0|\u00a0 ')
    : 'Disawar -- \u00a0|\u00a0 Faridabad -- \u00a0|\u00a0 Ghaziabad -- \u00a0|\u00a0 Delhi Bazar -- \u00a0|\u00a0 Shri Ganesh --'

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/results', icon: BarChart2, label: 'Today Results' },
    { href: '/chart', icon: Clock, label: 'Monthly Chart' },
    { href: '/contact', icon: Phone, label: 'Contact' },
  ]

  return (
    <>
      {/* Ticker */}
      <div className="gold-bar flex items-center overflow-hidden px-3 py-1.5" style={{ color: '#111100', minHeight: 30 }}>
        <div className="ticker-wrapper">
          <span className="ticker-content text-[11px] font-mono font-bold">
            🔴 LIVE &nbsp;|&nbsp; {tickerText} &nbsp;|&nbsp;
          </span>
        </div>
        <span className="shrink-0 ml-3 font-mono text-[10px] font-bold tabular-nums">{time}</span>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-yellow-300"
        style={{ boxShadow: scrolled ? '0 2px 18px rgba(255,224,0,.28)' : 'none', transition: 'box-shadow .2s' }}>
        <div className="flex items-center justify-between px-4 py-2.5 w-full" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-xl text-white"
              style={{ background: 'linear-gradient(135deg,#c9a800,#FFE000)', boxShadow: '0 3px 10px rgba(255,224,0,.45)' }}>A7</div>
            <div>
              <div className="font-display text-[22px] leading-none tracking-wider" style={{ color: '#111100' }}>A786</div>
              <div className="font-mono text-[10px] leading-none" style={{ color: '#7a6a10' }}>LIVE RESULTS</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-green-300 bg-green-50">
              <span className="live-dot" />
              <span className="font-mono text-[11px] font-bold text-green-700">LIVE</span>
            </div>
            <button onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-yellow-300 bg-yellow-50 touch-fb"
              style={{ color: '#111100' }}>
              {open ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t-2 border-yellow-200 animate-slide-up" style={{ background: "#FFFDE7" }}>
            {links.map(({ href, icon: Icon, label }, i) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 font-semibold text-base touch-fb ${i < links.length - 1 ? 'border-b border-yellow-200' : ''}`}
                style={{ color: '#111100' }}>
                <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg,#FFE000,#FFD000)', color: '#111100' }}>
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}
