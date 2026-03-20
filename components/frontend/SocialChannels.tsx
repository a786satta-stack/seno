export default function SocialChannels({
  whatsappLink = 'https://wa.me/919999999999',
  telegramLink = 'https://t.me/yourchannel',
}: { whatsappLink?: string; telegramLink?: string }) {
  return (
    <div className="mt-4 mb-4 space-y-3">

      {/* ── WhatsApp card ── */}
      <div className="sk-card p-4" style={{ borderColor: '#25D366' }}>

        {/* Hindi info box — matching reference image */}
        <div className="rounded-xl p-4 mb-4 text-center space-y-2"
          style={{ background: '#FFE000', border: '2px solid #c9a800' }}>
          <p className="font-semibold text-base leading-snug" style={{ fontFamily: 'Rajdhani,sans-serif', color: '#111100' }}>
            नमस्कार साथियो
          </p>
          <p className="font-semibold text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani,sans-serif', color: '#111100' }}>
            अपनी गेम का रिजल्ट हमारी web साइट पर लगवाने के लिए संपर्क करें।
          </p>
          <p className="font-semibold text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani,sans-serif', color: '#0369a1' }}>
            किसी भी भाई को किसी तरह की कोई दिक्कत या परेशानी हो तो हमसे whatsapp पर संपर्क करे
          </p>
        </div>

        {/* WhatsApp button */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-bold text-white touch-fb"
          style={{ background: '#111100', boxShadow: '0 6px 20px rgba(0,0,0,.3)', textDecoration: 'none' }}>
          {/* WhatsApp icon */}
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M16 6C10.477 6 6 10.477 6 16c0 1.846.497 3.574 1.364 5.062L6 26l5.09-1.335A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" fill="white"/>
            <path d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97c-.273-.1-.472-.15-.67.15c-.198.3-.768.97-.94 1.17c-.173.198-.347.223-.647.075c-.3-.15-1.267-.467-2.413-1.488c-.892-.795-1.494-1.777-1.669-2.077c-.174-.3-.018-.462.13-.61c.134-.134.3-.348.45-.522c.15-.174.2-.298.3-.497c.1-.198.05-.373-.025-.522c-.075-.15-.67-1.613-.918-2.21c-.242-.578-.487-.5-.67-.51a5.48 5.48 0 00-.57-.01c-.2 0-.522.075-.795.373c-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493c.71.307 1.265.49 1.697.627c.713.227 1.362.195 1.875.118c.572-.085 1.766-.722 2.015-1.42c.25-.698.25-1.297.174-1.42c-.074-.124-.273-.198-.572-.348Z" fill="#25D366"/>
          </svg>
          <div className="text-left">
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.05em' }}>Whatsapp</div>
            <div style={{ fontSize: 12, opacity: .85 }}>click to chat</div>
          </div>
        </a>

        {/* NOTE disclaimer */}
        <div className="mt-3 rounded-xl px-4 py-3 text-center"
          style={{ background: '#FFF9C4', border: '1.5px solid #FFE000' }}>
          <p className="font-bold text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani,sans-serif', color: '#c0392b' }}>
            NOTE: इस नंबर पर लीक गेम नही मिलता गेम लेने वाले भाई कॉल या मैसेज न करें।
          </p>
        </div>
      </div>

      {/* ── Telegram card ── */}
      <div className="sk-card p-4" style={{ borderColor: '#0088cc' }}>
        <p className="text-center font-mono text-xs mb-3 leading-relaxed" style={{ color: '#3a3000' }}>
          "Now Telegram players can also join our Telegram channel to get results quickly and receive superfast results."
        </p>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-bold text-white touch-fb"
          style={{ background: '#0088cc', boxShadow: '0 6px 20px rgba(0,136,204,.4)', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.2)"/>
            <path d="M7 15.5s7.2-3.1 9.7-4.2c1-.4 4.3-1.8 4.3-1.8s1.5-.6 1.4.9c0 .5-.3 2.1-.6 3.9-.4 2.5-.9 5.3-.9 5.3s-.1.9-.8 1c-.7.1-1.8-.6-2-.8-.2-.2-3.6-2.3-4.8-3.4-.4-.3-.8-.9-.1-1.5l4.8-4.6c.5-.5-.1-.8-.7-.4L11 18.1s-.8.5-2.2.1c-1.4-.4-3-1-3-1Z" fill="white"/>
          </svg>
          <div className="text-left">
            <div style={{ fontSize: 17, fontWeight: 700 }}>Telegram</div>
            <div style={{ fontSize: 11, opacity: .88 }}>Click to connect</div>
          </div>
        </a>
      </div>

    </div>
  )
}
