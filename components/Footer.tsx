'use client'
import React, { useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const quickLinks = {
  Programs: ['Weight Training', 'Fat Loss Program', 'Strength Conditioning', 'Personal Coaching', 'Group Classes', 'Transformation Program'],
  Company:  ['About Us', 'Our Trainers', 'Blog', 'Careers', 'Press'],
  Support:  ['FAQs', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Refund Policy'],
}

const timings = [
  { day: 'Mon – Fri', hours: '5:00 AM – 11:00 PM' },
  { day: 'Saturday',  hours: '6:00 AM – 10:00 PM' },
  { day: 'Sunday',    hours: '7:00 AM –  8:00 PM'  },
]

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

/* ─── HELPERS ────────────────────────────────────────────────────────────── */

const isOpen = () => {
  const now = new Date()
  const h = now.getHours()
  const day = now.getDay() // 0=Sun
  if (day >= 1 && day <= 5) return h >= 5 && h < 23
  if (day === 6) return h >= 6 && h < 22
  return h >= 7 && h < 20
}

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */

const SectionLabel = ({ text }: { text: string }) => (
  <div className="mb-5 flex items-center gap-3">
    <div className="h-px w-5 bg-[#dfff3e]" />
    <span className="text-[10px] font-700 uppercase tracking-[0.2em] text-[#dfff3e]">{text}</span>
  </div>
)

const LinkItem = ({ label }: { label: string }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 text-sm transition-all duration-200"
        style={{ color: hovered ? '#dfff3e' : '#8b8a8a' }}
      >
        <svg
          className="h-2.5 w-2.5 shrink-0 transition-all duration-200"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-4px)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
        <span style={{ transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.2s' }}>
          {label}
        </span>
      </a>
    </li>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */

const Footer = () => {
  const [emailVal, setEmailVal] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const gymOpen = isOpen()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailVal.trim()) { setSubmitted(true) }
  }

  return (
    <footer
      className={`relative overflow-hidden ${mont.className}`}
      style={{ background: '#080800', borderTop: '1px solid rgba(223,255,62,0.08)' }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '200px', mixBlendMode: 'overlay',
        }}
      />
      {/* Subtle radial glow bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: 'rgba(223,255,62,0.05)' }}
      />

      {/* ── TOP NEWSLETTER BAND ── */}
      <div
        className="relative border-b px-6 py-10 sm:px-12 lg:px-20"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <p className="mb-1 text-lg font-800 text-white">Get weekly fitness tips & offers</p>
            <p className="text-sm text-[#8b8a8a]">No spam. Unsubscribe anytime.</p>
          </div>
          {submitted ? (
            <div className="flex items-center gap-2 rounded-xl px-6 py-3" style={{ background: 'rgba(223,255,62,0.1)', border: '1px solid rgba(223,255,62,0.2)' }}>
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#dfff3e" />
                <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-700 text-[#dfff3e]">You{`'`}re in! Welcome to the squad.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
              <input
                type="email"
                value={emailVal}
                onChange={e => setEmailVal(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#8b8a8a] focus:ring-1 focus:ring-[#dfff3e]/40"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <button
                type="submit"
                className="rounded-xl px-5 py-3 text-xs font-800 uppercase tracking-widest text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(223,255,62,0.3)]"
                style={{ background: '#dfff3e' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm" style={{ background: '#dfff3e' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="12" fill="#111" />
                  <rect x="9" y="2" width="5" height="7" fill="#111" />
                </svg>
              </div>
              <span className="text-base font-900 uppercase tracking-widest text-white">FitForge</span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#8b8a8a]">
              Premium fitness studio built for people who are serious about change. Expert coaches, custom nutrition, proven results.
            </p>

            {/* Open/Closed badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: gymOpen ? 'rgba(74,180,74,0.1)' : 'rgba(180,74,74,0.1)',
                border: `1px solid ${gymOpen ? 'rgba(74,180,74,0.2)' : 'rgba(180,74,74,0.2)'}`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: gymOpen ? '#4ab44a' : '#b44a4a',
                  animation: gymOpen ? 'pulse 1.5s infinite' : 'none',
                }}
              />
              <span className="text-[10px] font-700 uppercase tracking-wider" style={{ color: gymOpen ? '#4ab44a' : '#b44a4a' }}>
                {gymOpen ? 'We\'re Open Now' : 'Currently Closed'}
              </span>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-3 text-[10px] font-700 uppercase tracking-[0.2em] text-[#dfff3e]">Follow Us</p>
              <div className="flex gap-2">
                {socials.map((s) => {
                  const [hov, setHov] = useState(false)
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      onMouseEnter={() => setHov(true)}
                      onMouseLeave={() => setHov(false)}
                      title={s.name}
                      className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
                      style={{
                        background: hov ? '#dfff3e' : 'rgba(255,255,255,0.05)',
                        color: hov ? '#111' : '#8b8a8a',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
                      }}
                    >
                      {s.icon}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Quick links columns ── */}
          {Object.entries(quickLinks).map(([section, links]) => (
            <div key={section}>
              <SectionLabel text={section} />
              <ul className="flex flex-col gap-3">
                {links.map(l => <LinkItem key={l} label={l} />)}
              </ul>
            </div>
          ))}

        </div>

        {/* ── INFO ROW ── */}
        <div
          className="mt-14 grid grid-cols-1 gap-8 border-t pt-12 sm:grid-cols-3"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >

          {/* Location */}
          <div>
            <SectionLabel text="Location" />
            <div className="flex gap-3">
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'rgba(223,255,62,0.08)' }}
              >
                <svg className="h-4 w-4" fill="none" stroke="#dfff3e" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-600 text-white">FitForge Studio</p>
                <p className="text-sm leading-relaxed text-[#8b8a8a]">Plot 42, Jubilee Hills Rd No. 36<br />Hyderabad, Telangana 500033</p>
                <a href="#" className="mt-2 inline-flex items-center gap-1 text-[10px] font-700 uppercase tracking-wider text-[#dfff3e] transition-opacity hover:opacity-70">
                  Get Directions
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <SectionLabel text="Contact" />
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="#dfff3e" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'Phone',
                  value: '+91 98765 43210',
                  href: 'tel:+919876543210',
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="#dfff3e" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello@fitforge.in',
                  href: 'mailto:hello@fitforge.in',
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="#dfff3e" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                  label: 'WhatsApp',
                  value: 'Chat with us',
                  href: '#',
                },
              ].map(({ icon, label, value, href }) => {
                const [hov, setHov] = useState(false)
                return (
                  <a
                    key={label}
                    href={href}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    className="flex items-center gap-3 transition-all duration-200"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                      style={{ background: hov ? 'rgba(223,255,62,0.15)' : 'rgba(223,255,62,0.08)' }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-[#8b8a8a]">{label}</p>
                      <p className="text-sm font-600 transition-colors duration-200" style={{ color: hov ? '#dfff3e' : '#fff' }}>{value}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Timings */}
          <div>
            <SectionLabel text="Hours" />
            <div className="flex flex-col gap-3">
              {timings.map(({ day, hours }) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-[#8b8a8a]">{day}</span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-700 tabular-nums"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#e8e8e8', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {hours}
                  </span>
                </div>
              ))}
              {/* Holiday note */}
              <div
                className="mt-1 flex items-start gap-2 rounded-xl p-3"
                style={{ background: 'rgba(223,255,62,0.05)', border: '1px solid rgba(223,255,62,0.1)' }}
              >
                <span className="text-sm">📅</span>
                <p className="text-[10px] leading-relaxed text-[#8b8a8a]">
                  Holiday hours may vary. Check our Instagram for live updates.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="relative border-t px-6 py-5 sm:px-12 lg:px-20"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] font-600 uppercase tracking-wider text-[#8b8a8a]">
            © 2025 FitForge. All rights reserved. Built with 💪 in Hyderabad.
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-2.5 w-2.5 fill-[#dfff3e]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-[10px] text-[#8b8a8a]">4.9 rating · 300+ members</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </footer>
  )
}

export default Footer