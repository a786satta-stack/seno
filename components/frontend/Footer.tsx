import Link from 'next/link'

export default function Footer() {
  const links = [
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ]
  return (
    <footer style={{ marginTop: 32 }}>
      <div className="gold-bar" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 4px', maxWidth: 1200, margin: '0 auto' }}>
          {links.map((l, i) => (
            <span key={l.href} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Link href={l.href} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, color: '#111100', textDecoration: 'none' }}>
                {l.label}
              </Link>
              {i < links.length - 1 && <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#5a4000' }}> ::: </span>}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 16px', textAlign: 'center', background: '#111100' }}>
        <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, fontWeight: 700, color: '#FFE000' }}>
          © {new Date().getFullYear()} A786 :: ALL RIGHTS RESERVED
        </p>
        <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, marginTop: 5, color: '#5a4a00' }}>
          For informational purposes only. Gambling may be illegal in your region.
        </p>
      </div>
    </footer>
  )
}
