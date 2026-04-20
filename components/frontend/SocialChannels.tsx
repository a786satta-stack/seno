export default function SocialChannels({
  whatsappLink = 'https://whatsapp.com/channel/0029VbCHriDFCCoWbzrHyk0b',
  telegramLink = 'https://t.me/a786result',
}: { whatsappLink?: string; telegramLink?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* WhatsApp card */}
      <div className="sk-card" style={{ borderColor: '#25D366', padding: 16 }}>
        <div style={{ background: '#FFE000', border: '2px solid #c9a800', borderRadius: 14, padding: '14px 16px', marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 17, fontWeight: 700, color: '#111100', lineHeight: 1.4, marginBottom: 6 }}>
            नमस्कार साथियो
          </p>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, fontWeight: 600, color: '#111100', lineHeight: 1.5, marginBottom: 6 }}>
            अपनी गेम का रिजल्ट हमारी web साइट पर लगवाने के लिए संपर्क करें।
          </p>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, fontWeight: 600, color: '#0369a1', lineHeight: 1.5 }}>
            किसी भी भाई को दिक्कत हो तो whatsapp पर संपर्क करे
          </p>
        </div>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
          className="touch-fb"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '13px 20px', borderRadius: 16, background: '#111100', color: '#fff', textDecoration: 'none', boxShadow: '0 6px 20px rgba(0,0,0,.25)', marginBottom: 12 }}>
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M16 6C10.477 6 6 10.477 6 16c0 1.846.497 3.574 1.364 5.062L6 26l5.09-1.335A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" fill="white"/>
            <path d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97c-.273-.1-.472-.15-.67.15c-.198.3-.768.97-.94 1.17c-.173.198-.347.223-.647.075c-.3-.15-1.267-.467-2.413-1.488c-.892-.795-1.494-1.777-1.669-2.077c-.174-.3-.018-.462.13-.61c.134-.134.3-.348.45-.522c.15-.174.2-.298.3-.497c.1-.198.05-.373-.025-.522c-.075-.15-.67-1.613-.918-2.21c-.242-.578-.487-.5-.67-.51a5.48 5.48 0 00-.57-.01c-.2 0-.522.075-.795.373c-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493c.71.307 1.265.49 1.697.627c.713.227 1.362.195 1.875.118c.572-.085 1.766-.722 2.015-1.42c.25-.698.25-1.297.174-1.42c-.074-.124-.273-.198-.572-.348Z" fill="#25D366"/>
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.04em' }}>Whatsapp</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>click to chat</div>
          </div>
        </a>

        <div style={{ background: '#FFF9C4', border: '1.5px solid #FFE000', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, fontWeight: 700, color: '#c0392b', lineHeight: 1.5 }}>
            NOTE: इस नंबर पर लीक गेम नही मिलता। गेम लेने वाले भाई कॉल या मैसेज न करें।
          </p>
        </div>
      </div>

      {/* Telegram card */}
      <div className="sk-card" style={{ borderColor: '#0088cc', padding: 16 }}>
        <p style={{ textAlign: 'center', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#3a3000', lineHeight: 1.7, marginBottom: 14 }}>
          Join our Telegram channel to get results quickly and superfast updates.
        </p>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer"
          className="touch-fb"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '13px 20px', borderRadius: 16, background: '#0088cc', color: '#fff', textDecoration: 'none', boxShadow: '0 6px 20px rgba(0,136,204,.35)' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.2)"/>
            <path d="M7 15.5s7.2-3.1 9.7-4.2c1-.4 4.3-1.8 4.3-1.8s1.5-.6 1.4.9c0 .5-.3 2.1-.6 3.9-.4 2.5-.9 5.3-.9 5.3s-.1.9-.8 1c-.7.1-1.8-.6-2-.8-.2-.2-3.6-2.3-4.8-3.4-.4-.3-.8-.9-.1-1.5l4.8-4.6c.5-.5-.1-.8-.7-.4L11 18.1s-.8.5-2.2.1c-1.4-.4-3-1-3-1Z" fill="white"/>
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Telegram</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>Click to connect</div>
          </div>
        </a>
      </div>
    </div>
  )
}
