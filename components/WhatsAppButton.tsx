  'use client'

  export default function WhatsAppButton({ phone = '919485519859', message = 'Hello!' }: { phone?: string; message?: string }) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.35), 0 2px 6px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1.12)'
          el.style.boxShadow = '0 6px 24px rgba(37,211,102,0.6), 0 2px 8px rgba(0,0,0,0.3)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 4px 16px rgba(37,211,102,0.35), 0 2px 6px rgba(0,0,0,0.3)'
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2C8.268 2 2 8.268 2 16c0 2.466.665 4.774 1.822 6.76L2 30l7.463-1.793A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
            fill="#25D366"
          />
          <path
            d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16c0 2.19.6 4.238 1.643 5.99L4.5 27.5l5.643-1.617A11.46 11.46 0 0 0 16 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5Z"
            fill="white"
          />
          <path
            d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97-.273-.1-.472-.15-.67.15-.198.3-.768.97-.94 1.17-.173.198-.347.223-.647.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.777-1.669-2.077-.174-.3-.018-.462.13-.61.134-.134.3-.348.45-.522.15-.174.2-.298.3-.497.1-.198.05-.373-.025-.522-.075-.15-.67-1.613-.918-2.21-.242-.578-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.2 0-.522.075-.795.373-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493.71.307 1.265.49 1.697.627.713.227 1.362.195 1.875.118.572-.085 1.766-.722 2.015-1.42.25-.698.25-1.297.174-1.42-.074-.124-.273-.198-.572-.348Z"
            fill="#25D366"
          />
        </svg>

        {/* Pulse ring animation */}
        <span style={{
          position: 'absolute',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '2px solid #25D366',
          animation: 'whatsapp-pulse 2s ease-out infinite',
          pointerEvents: 'none',
        }} />

        <style>{`
          @keyframes whatsapp-pulse {
            0%   { transform: scale(1);   opacity: 0.7; }
            70%  { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .whatsapp-pulse { animation: none; }
          }
        `}</style>
      </a>
    )
  }
