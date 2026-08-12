'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// Extend the Window interface to include gtag for analytics
declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params: { [key: string]: any }) => void;
  }
}

function WaIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path d="M16 6C10.477 6 6 10.477 6 16c0 1.846.497 3.574 1.364 5.062L6 26l5.09-1.335A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" fill="white" />
      <path d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97-.273-.1-.472-.15-.67.15-.198.3-.768.97-.94 1.17c-.173.198-.347.223-.647.075c-.3-.15-1.267-.467-2.413-1.488c-.892-.795-1.494-1.777-1.669-2.077c-.174-.3-.018-.462.13-.61c.134-.134.3-.348.45-.522c.15-.174.2-.298.3-.497c.1-.198.05-.373-.025-.522c-.075-.15-.67-1.613-.918-2.21c-.242-.578-.487-.5-.67-.51a5.48 5.48 0 00-.57-.01c-.2 0-.522.075-.795.373c-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493c.71.307 1.265.49 1.697.627c.713.227 1.362.195 1.875.118c.572-.085 1.766-.722 2.015-1.42.25-.698.25-1.297.174-1.42c-.074-.124-.273-.198-.572-.348Z" fill="#25D366" />
    </svg>
  )
}

function TgIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
      <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.2)" />
      <path d="M7 15.5s7.2-3.1 9.7-4.2c1-.4 4.3-1.8 4.3-1.8s1.5-.6 1.4.9c0 .5-.3 2.1-.6 3.9-.4 2.5-.9 5.3-.9 5.3s-.1.9-.8 1c-.7.1-1.8-.6-2-.8-.2-.2-3.6-2.3-4.8-3.4-.4-.3-.8-.9-.1-1.5l4.8-4.6c.5-.5-.1-.8-.7-.4L11 18.1s-.8.5-2.2.1c-1.4-.4-3-1-3-1Z" fill="white" />
    </svg>
  )
}

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show modal on mount (page load/refresh)
    setIsOpen(true)
  }, [])

  const handleWhatsAppClick = (phoneNumber: string) => {
    // Fire Google Analytics event if gtag is available
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'whatsapp_modal',
        'event_label': `Welcome Modal WhatsApp Click - ${phoneNumber}`
      });
    }
  };



  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false)
      }}
    >
      <div
        className="sk-card relative w-full max-w-md overflow-hidden p-8 shadow-2xl animate-slide-up"
        role="dialog"
        aria-modal="true"
        style={{ border: '2px solid #FFE000' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 touch-fb"
          style={{ color: '#c9a800' }}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Brand/Welcome Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #c9a800, #FFE000)', border: '3px solid #FFE000' }}>
            A7
          </div>

          <h2 className="mb-2 text-3xl font-display tracking-wide" style={{ color: '#111100' }}>
            A786 Satta में आपका स्वागत है|
          </h2>

          <p className="mb-8 font-mono text-sm leading-relaxed" style={{ color: '#7a6a10' }}>
            गेम शुरू करने के लिए नीचे दिए गए WhatsApp बटन पर क्लिक करें। आपको तुरंत एंट्री और सभी ज़रूरी अपडेट वहीं मिल जाएंगे।
          </p>

          <div className="flex w-full flex-col gap-3">
            {/* WhatsApp button */}
            <a href="https://wa.me/+447478033772" target="_blank" rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick('+447478033772');window.gtag?.("event", "whatsapp_click", {
              event_category: "engagement",
            event_label: "Alert Button 1",
            link_url: "https://wa.me/+447478033772",
    });}
            className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-bold text-white touch-fb transition-transform active:scale-95"
            style={{ background: '#25D366', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)', textDecoration: 'none' }}>
            <WaIcon />
            <div className="text-left">
              <div className="font-sans" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.02em' }}>WhatsApp</div>
              <div className="font-sans" style={{ fontSize: 11, opacity: .9 }}>Game Start Now</div>
            </div>
          </a>

          <a href="https://wa.me/917056996422" target="_blank" rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('917056996422')}
            className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-bold text-white touch-fb transition-transform active:scale-95"
            style={{ background: '#25D366', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)', textDecoration: 'none' }}>
            <WaIcon />
            <div className="text-left">
              <div className="font-sans" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.02em' }}>WhatsApp</div>
              <div className="font-sans" style={{ fontSize: 11, opacity: .9 }}>Game Start Now</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    </div >
  )
}