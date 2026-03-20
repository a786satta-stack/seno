'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, PlusCircle, Gamepad2, LogOut, Menu, X, Upload } from 'lucide-react'

interface AdminSidebarProps {
  user: { name?: string; email?: string; role?: string }
}

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/results', icon: PlusCircle, label: 'Post Results' },
  { href: '/admin/games', icon: Gamepad2, label: 'Manage Games' },
  { href: '/admin/import', icon: Upload, label: 'Import CSV' },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-yellow-300">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-lg text-white"
              style={{ background: 'linear-gradient(135deg,#c9a800,#FFE000)' }}>
              A7
            </div>
            <div>
              <div className="font-display text-lg leading-none tracking-wide" style={{ color: '#111100' }}>ADMIN</div>
              <div className="text-[10px] font-mono leading-none" style={{ color: '#7a6a10' }}>{user?.role?.toUpperCase()}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold leading-none" style={{ color: '#111100' }}>{user?.name}</div>
              <div className="text-xs font-mono leading-none mt-0.5" style={{ color: '#7a6a10' }}>{user?.email}</div>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-xl border-2 border-yellow-300 flex items-center justify-center touch-fb"
              style={{ color: '#111100', background: '#FFFDE7' }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Dropdown nav */}
        {menuOpen && (
          <nav className="border-t-2 border-yellow-200 animate-slide-up" style={{ background: '#FFFDE7' }}>
            {NAV.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-5 py-4 border-b border-yellow-200 font-semibold touch-fb ${
                  path === href ? 'bg-yellow-100' : ''
                }`}
                style={{ color: path === href ? '#c9a800' : '#111100' }}
              >
                <Icon size={18} style={{ color: path === href ? '#c9a800' : '#7a6a10' }} />
                {label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: '/admin-login' })}
              className="flex items-center gap-3 px-5 py-4 w-full font-semibold touch-fb"
              style={{ color: '#e53935' }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-yellow-300 grid grid-cols-5">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center py-3 gap-1 touch-fb"
            style={{ color: path === href ? '#c9a800' : '#7a6a10' }}
          >
            <Icon size={20} />
            <span className="text-[9px] font-mono">{label.split(' ')[0]}</span>
          </Link>
        ))}
        <button
          onClick={() => signOut({ callbackUrl: '/admin-login' })}
          className="flex flex-col items-center justify-center py-3 gap-1 touch-fb"
          style={{ color: '#e53935' }}
        >
          <LogOut size={20} />
          <span className="text-[9px] font-mono">Logout</span>
        </button>
      </div>
    </>
  )
}
