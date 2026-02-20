'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── HELPERS ───────────────────────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

/* ─── FLOATING MEMBER AVATARS ────────────────────────────────────────────── */

const floaters = [
  { initials: 'MT', color: '#c0524a', bg: '#2a1a1a', x: '8%',  y: '20%', delay: '0s',    size: 44 },
  { initials: 'PK', color: '#7a5aab', bg: '#1a1a2a', x: '88%', y: '15%', delay: '0.4s',  size: 36 },
  { initials: 'JM', color: '#4a9a5a', bg: '#1a2a1a', x: '5%',  y: '72%', delay: '0.8s',  size: 40 },
  { initials: 'SL', color: '#c08040', bg: '#2a1f18', x: '91%', y: '68%', delay: '0.2s',  size: 38 },
  { initials: 'DR', color: '#4a80b0', bg: '#1a2228', x: '15%', y: '88%', delay: '1.1s',  size: 34 },
  { initials: 'AB', color: '#9a4a8a', bg: '#221a28', x: '82%', y: '85%', delay: '0.6s',  size: 36 },
]

const FloatingAvatar = ({ f }: { f: typeof floaters[0] }) => (
  <div
    className="absolute flex items-center justify-center rounded-full font-900 shadow-lg"
    style={{
      left: f.x,
      top: f.y,
      width: f.size,
      height: f.size,
      fontSize: f.size * 0.3,
      background: `linear-gradient(135deg, ${f.bg} 0%, #1a1a1a 100%)`,
      border: `2px solid ${f.color}55`,
      color: f.color,
      animation: `floatBob 4s ease-in-out infinite`,
      animationDelay: f.delay,
    }}
  >
    {f.initials}
    <div
      className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full"
      style={{ width: f.size * 0.32, height: f.size * 0.32, background: '#dfff3e' }}
    >
      <svg viewBox="0 0 8 8" fill="none" style={{ width: f.size * 0.16, height: f.size * 0.16 }}>
        <path d="M1.5 4l2 2 3-3" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
)

/* ─── URGENCY TICKER ─────────────────────────────────────────────────────── */

const UrgencyTicker = ({ inView }: { inView: boolean }) => {
  const spots = useCountUp(7, inView, 1200)
  return (
    <div
      className="flex items-center justify-center gap-2"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.5s ease 0.1s, opacity 0.5s ease 0.1s',
      }}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#dfff3e]" />
      <span className="text-xs font-700 uppercase tracking-widest text-[#dfff3e]">
        Only {spots} free trial spots left this week
      </span>
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#dfff3e]" />
    </div>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */

const Cta = () => {
  const { ref, inView } = useInView(0.1)
  const [trialHovered, setTrialHovered] = useState(false)
  const [talkHovered, setTalkHovered]   = useState(false)

  return (
    <section
      className={`relative overflow-hidden ${mont.className}`}
      style={{ background: '#0a0a00' }}
    >
      {/* ── Full-bleed top accent line ── */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent 0%, #dfff3e 40%, #dfff3e 60%, transparent 100%)' }}
      />

      {/* ── Layered background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial glow — center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            width: '70vw',
            height: '70vw',
            maxWidth: 900,
            maxHeight: 900,
            background: 'radial-gradient(ellipse, rgba(223,255,62,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            mixBlendMode: 'overlay',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#dfff3e 1px, transparent 1px), linear-gradient(90deg, #dfff3e 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating avatars — decorative */}
        {floaters.map((f, i) => <FloatingAvatar key={i} f={f} />)}
      </div>

      {/* ── Ghost headline watermark ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden text-center text-[clamp(4rem,16vw,14rem)] font-900 uppercase leading-none text-white"
        style={{ opacity: 0.025, letterSpacing: '-0.05em' }}
      >
        START
        <br />
        NOW
      </div>

      {/* ── Main content ── */}
      <div
        ref={ref}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-32 text-center sm:px-12 lg:px-20"
      >

        {/* Urgency ticker */}
        <UrgencyTicker inView={inView} />

        {/* Pre-headline */}
        <div
          className="flex items-center gap-3"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, opacity 0.6s ease 0.15s',
          }}
        >
          <div className="h-px w-10 bg-[#dfff3e]" />
          <span className="text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
            Your Decision Moment
          </span>
          <div className="h-px w-10 bg-[#dfff3e]" />
        </div>

        {/* Main headline */}
        <div
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, opacity 0.7s ease 0.2s',
          }}
        >
          <h2
            className="text-[clamp(2.8rem,7vw,7rem)] font-900 uppercase leading-none"
            style={{ letterSpacing: '-0.03em', color: '#fff' }}
          >
            Your
            <br />
            Transformation
            <br />
            <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
              Starts Today.
            </span>
          </h2>
        </div>

        {/* Emotional sub-line */}
        <div
          className="max-w-xl"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.65s ease 0.3s, opacity 0.65s ease 0.3s',
          }}
        >
          <p className="text-xl font-700 leading-snug text-white/80">
            Don{`'`}t wait. Don{`'`}t overthink it.
          </p>
          <p className="mt-2 text-base font-400 leading-relaxed text-[#8b8a8a]">
            Every day you delay is a day someone else gets the result you want. The only thing standing between you and the best shape of your life is a single decision.
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full max-w-xs"
          style={{
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.4s, opacity 0.6s ease 0.4s',
            height: 1,
            background: 'linear-gradient(to right, transparent, #dfff3e55, transparent)',
          }}
        />

        {/* CTA Buttons */}
        <div
          className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s, opacity 0.7s ease 0.45s',
          }}
        >
          {/* Primary: Book Free Trial */}
          <button
            onMouseEnter={() => setTrialHovered(true)}
            onMouseLeave={() => setTrialHovered(false)}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-base font-900 uppercase tracking-widest text-black transition-all duration-300"
            style={{
              background: trialHovered
                ? 'linear-gradient(135deg, #f0ff6a 0%, #dfff3e 100%)'
                : 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)',
              boxShadow: trialHovered
                ? '0 0 60px rgba(223,255,62,0.5), 0 8px 32px rgba(0,0,0,0.4)'
                : '0 0 30px rgba(223,255,62,0.2), 0 4px 20px rgba(0,0,0,0.3)',
              transform: trialHovered ? 'scale(1.03)' : 'scale(1)',
              minWidth: 220,
            }}
          >
            {/* Shine sweep */}
            <div
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700"
              style={{ transform: trialHovered ? 'translateX(200%) skewX(-12deg)' : 'translateX(-100%) skewX(-12deg)' }}
            />
            <span>🔥</span>
            <span>Book Free Trial</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Secondary: Talk to Trainer */}
          <button
            onMouseEnter={() => setTalkHovered(true)}
            onMouseLeave={() => setTalkHovered(false)}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-base font-900 uppercase tracking-widest transition-all duration-300"
            style={{
              background: talkHovered ? 'rgba(223,255,62,0.08)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${talkHovered ? 'rgba(223,255,62,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: talkHovered ? '#dfff3e' : '#fff',
              transform: talkHovered ? 'scale(1.02)' : 'scale(1)',
              minWidth: 220,
            }}
          >
            <span>🔥</span>
            <span>Talk to Trainer</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        {/* Trust micro-copy */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(10px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.5s ease 0.6s, opacity 0.5s ease 0.6s',
          }}
        >
          {['No credit card required', 'Cancel anytime', 'First class is free', '300+ members trust us'].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#dfff3e" fillOpacity=".15" />
                <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="#dfff3e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-600 uppercase tracking-wider text-[#8b8a8a]">{t}</span>
            </div>
          ))}
        </div>

        {/* Social proof row */}
        <div
          className="flex items-center gap-5"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(10px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.5s ease 0.7s, opacity 0.5s ease 0.7s',
          }}
        >
          {/* Stacked avatars */}
          <div className="flex -space-x-2">
            {floaters.slice(0, 5).map((f, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-900"
                style={{
                  background: `linear-gradient(135deg, ${f.bg}, #1a1a1a)`,
                  border: `2px solid #0a0a00`,
                  color: f.color,
                  zIndex: 5 - i,
                }}
              >
                {f.initials}
              </div>
            ))}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[8px] font-900"
              style={{ background: '#dfff3e', border: '2px solid #0a0a00', color: '#111', zIndex: 0 }}
            >
              +295
            </div>
          </div>
          <p className="text-sm text-[#8b8a8a]">
            Joined by <span className="font-700 text-white">300+ members</span> — who are already seeing results.
          </p>
        </div>

      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent 0%, #dfff3e22 50%, transparent 100%)' }}
      />

      

      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}

export default Cta