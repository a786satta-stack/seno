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
    <footer className="mt-8">
      <div className="gold-bar py-3 px-4">
        <div className="flex items-center justify-center gap-2 flex-wrap" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-2">
              <Link href={l.href} className="font-mono text-[11px] font-bold"
                style={{ color: '#111100', textDecoration: 'none' }}>{l.label}</Link>
              {i < links.length - 1 && <span className="font-mono text-[10px]" style={{ color: '#5a4000' }}>:::  </span>}
            </span>
          ))}
        </div>
      </div>
      <div className="py-4 text-center" style={{ background: '#111100' }}>
        <p className="font-mono text-xs font-bold" style={{ color: '#FFE000' }}>
          © {new Date().getFullYear()} A786 :: ALL RIGHTS RESERVED
        </p>
        <p className="font-mono text-[10px] mt-1" style={{ color: '#5a4a00' }}>
          For informational purposes only. Gambling may be illegal in your region.
        </p>
      </div>
    </footer>
  )
}
