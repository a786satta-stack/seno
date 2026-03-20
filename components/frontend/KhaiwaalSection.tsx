'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Phone, Clock, CheckCircle2 } from 'lucide-react'

const GAME_TIMINGS = [
  { name: 'कुबेर सिटी', time: '12:15 PM', emoji: '🏢' },
  { name: 'नोएडा सिटी', time: '12:50 PM', emoji: '🏙️' },
  { name: 'सदर बाजार', time: '01:40 PM', emoji: '🏪' },
  { name: 'ग्वालियर', time: '02:40 PM', emoji: '🏰' },
  { name: 'दिल्ली बाजार', time: '03:10 PM', emoji: '🏙️' },
  { name: 'निज़ामाबाद', time: '03:40 PM', emoji: '🕌' },
  { name: 'श्री गणेश', time: '04:40 PM', emoji: '🙏' },
  { name: 'सुल्तानपुर', time: '05:30 PM', emoji: '👑' },
  { name: 'फरीदाबाद', time: '06:10 PM', emoji: '🌆' },
  { name: 'अलवर', time: '07:30 PM', emoji: '🌇' },
  { name: 'शिवपुरी', time: '08:30 PM', emoji: '🕉️' },
  { name: 'गाज़ियाबाद', time: '09:30 PM', emoji: '🌃' },
  { name: 'हरियाणा सिटी', time: '10:35 PM', emoji: '🌾' },
  { name: 'गली', time: '11:30 PM', emoji: '🌙' },
  { name: 'दिसावर', time: '05:10 AM', emoji: '⭐' },
]
const KHAIWALS = [
  { title: 'सीधे सट्टा कंपनी का No 1 खाईवाल', name: 'AZAD BHAI KHAIWAL',  phone: '917015451462', color: '#FF6B00' },
  { title: 'सीधे सट्टा कंपनी का No 1 खाईवाल', name: 'RADHE BHAI KHAIWAL', phone: '918901843968', color: '#7C3AED' },
]

function WaIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.2)"/>
      <path d="M16 6C10.477 6 6 10.477 6 16c0 1.846.497 3.574 1.364 5.062L6 26l5.09-1.335A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" fill="white"/>
      <path d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97-.273-.1-.472-.15-.67.15-.198.3-.768.97-.94 1.17-.173.198-.347.223-.647.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.777-1.669-2.077-.174-.3-.018-.462.13-.61.134-.134.3-.348.45-.522.15-.174.2-.298.3-.497.1-.198.05-.373-.025-.522-.075-.15-.67-1.613-.918-2.21-.242-.578-.487-.5-.67-.51a5.48 5.48 0 00-.57-.01c-.2 0-.522.075-.795.373-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493.71.307 1.265.49 1.697.627.713.227 1.362.195 1.875.118.572-.085 1.766-.722 2.015-1.42.25-.698.25-1.297.174-1.42-.074-.124-.273-.198-.572-.348Z" fill="#25D366"/>
    </svg>
  )
}

export default function KhaiwaalSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true, 1: false })

  return (
    <div className="mt-4 mb-4 space-y-5">
      {KHAIWALS.map((k, i) => (
        <div key={i} className="khaiwal-card animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>

          {/* ── TOP BANNER ── */}
          <div className="gold-bar px-4 py-2 text-center">
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, fontWeight: 700, color: '#3a2a00', letterSpacing: '.06em' }}>
              {k.title}
            </p>
          </div>

          {/* ── IDENTITY BLOCK (tappable) ── */}
          <button
            className="w-full touch-fb"
            onClick={() => setExpanded(p => ({ ...p, [i]: !p[i] }))}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ padding: '18px 16px 14px' }}>
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
                {/* Avatar circle */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${k.color}, #FFE000)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${k.color}55`, flexShrink: 0,
                  border: '3px solid #FFE000',
                }}>
                  <span style={{ fontSize: 24 }}>👑</span>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26, letterSpacing: '.12em', color: '#111100', lineHeight: 1 }}>
                    {k.name}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>
                    <span style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 100, padding: '2px 9px', fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <CheckCircle2 size={10} /> TRUSTED
                    </span>
                    <span style={{ background: '#FFFDE7', border: '1.5px solid #FFE000', borderRadius: 100, padding: '2px 9px', fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 700, color: '#c9a800' }}>
                      15 GAMES
                    </span>
                  </div>
                </div>
              </div>

              {/* Expand pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: expanded[i] ? '#111100' : '#FFE000',
                  color: expanded[i] ? '#FFE000' : '#111100',
                  borderRadius: 100, padding: '8px 20px',
                  fontFamily: 'JetBrains Mono,monospace', fontSize: 12, fontWeight: 700,
                  letterSpacing: '.06em', boxShadow: '0 3px 10px rgba(255,224,0,.35)',
                  transition: 'all .2s',
                }}>
                  <Clock size={13} strokeWidth={2.5} />
                  {expanded[i] ? 'HIDE TIMINGS' : 'SHOW TIMINGS'}
                  {expanded[i] ? <ChevronUp size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
                </div>
              </div>
            </div>
          </button>

          {/* ── GAME TIMINGS ── */}
          {expanded[i] && (
            <div className="animate-slide-up" style={{ borderTop: '2px solid #FFE000' }}>
              {/* Column headers */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                padding: '8px 16px', background: '#FFE000',
                fontFamily: 'Bebas Neue,sans-serif', fontSize: 13, letterSpacing: '.1em', color: '#111100',
              }}>
                <span>GAME NAME</span>
                <span>GAME TIME</span>
              </div>

              {/* Rows */}
              {GAME_TIMINGS.map((g, j) => (
                <div key={j} className={`game-row d${j + 1}`}>
                  <span className="game-row-icon">{g.emoji}</span>
                  <span className="game-row-name">{g.name}</span>
                  <span className="game-row-dots">— — —</span>
                  <span className="game-row-time">{g.time}</span>
                </div>
              ))}

              {/* Count badge */}
              <div style={{ padding: '10px 16px', background: '#FFFDE7', textAlign: 'center', borderTop: '1px solid #FFE000' }}>
                <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 15, letterSpacing: '.1em', color: '#c9a800' }}>
                  👑 {k.name} — 15 GAMES DAILY 👑
                </span>
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '2px solid rgba(255,224,0,0.4)' }}>
            {/* Hindi CTA */}
            <div style={{ textAlign: 'center', background: '#FFFDE7', borderRadius: 12, padding: '10px 12px', border: '1px solid #FFE000' }}>
              <p style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 16, color: '#0369a1', lineHeight: 1.4 }}>
                Game Play करने के लिये नीचे लिंक पर क्लिक करे
              </p>
            </div>

            {/* WhatsApp btn */}
            <a href={`https://wa.me/${k.phone}`} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WaIcon size={30} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>WhatsApp</div>
                <div style={{ fontSize: 12, opacity: .88 }}>Click to chat</div>
              </div>
            </a>

            {/* Call btn */}
            <a href={`tel:+${k.phone}`} className="btn-gold" style={{ textDecoration: 'none' }}>
              <Phone size={18} strokeWidth={2.5} />
              CALL NOW
            </a>
          </div>

        </div>
      ))}
    </div>
  )
}
