'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const stats = [
  { value: 1200, suffix: '+ kg', label: 'Fat Lost', icon: '🔥' },
  { value: 300,  suffix: '+',    label: 'Active Members', icon: '💪' },
  { value: 90,   suffix: '-day', label: 'Transformation Program', icon: '📈' },
  { value: 98,   suffix: '%',    label: 'Client Satisfaction', icon: '⭐' },
]

const transformations = [
  {
    name: 'Marcus T.',
    duration: '90 days',
    lost: '18 kg',
    program: 'Fat Loss Program',
    quote: 'I finally have the body I trained for in my 20s — and I\'m 38.',
    beforeBg: '#2a1f1f',
    afterBg: '#1a2a1a',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeColor: '#8b5a5a',
    afterColor: '#5a8b5a',
  },
  {
    name: 'Priya K.',
    duration: '12 weeks',
    lost: '11 kg',
    program: 'Transformation Program',
    quote: 'Not just weight — I gained strength, energy, and confidence.',
    beforeBg: '#221e2a',
    afterBg: '#1a2228',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeColor: '#7a5a8b',
    afterColor: '#5a8b8b',
  },
  {
    name: 'Jordan M.',
    duration: '6 weeks',
    lost: '8 kg',
    program: 'Strength Conditioning',
    quote: 'My deadlift went from 60 to 120 kg. The coaches know their craft.',
    beforeBg: '#1f2220',
    afterBg: '#1a1f2a',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeColor: '#5a8b62',
    afterColor: '#5a6a8b',
  },
]

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

function useCountUp(target: number, active: boolean, duration = 1800) {
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

/* ─── BEFORE/AFTER SLIDER ───────────────────────────────────────────────── */

const BeforeAfterSlider = ({ t }: { t: typeof transformations[0] }) => {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const update = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) update(e.clientX) }
  const onMouseUp   = () => { dragging.current = false }
  const onTouchMove = (e: React.TouchEvent) => update(e.touches[0].clientX)

  return (
    <div
      ref={containerRef}
      className="relative h-80 w-full cursor-col-resize select-none overflow-hidden rounded-xl"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
      onTouchStart={(e) => update(e.touches[0].clientX)}
    >
      {/* AFTER panel (full width, sits behind) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${t.afterBg} 0%, #0d0d0d 100%)` }}
      >
        {/* Silhouette after */}
        <svg viewBox="0 0 80 160" className="h-44 opacity-80" fill="none">
          <ellipse cx="40" cy="22" rx="14" ry="14" fill={t.afterColor} />
          <rect x="26" y="38" width="28" height="62" rx="6" fill={t.afterColor} />
          <rect x="14" y="40" width="10" height="46" rx="5" fill={t.afterColor} opacity=".8" />
          <rect x="56" y="40" width="10" height="46" rx="5" fill={t.afterColor} opacity=".8" />
          <rect x="27" y="100" width="11" height="52" rx="5" fill={t.afterColor} />
          <rect x="42" y="100" width="11" height="52" rx="5" fill={t.afterColor} />
        </svg>
        <span
          className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-[10px] font-700 uppercase tracking-widest"
          style={{ background: '#dfff3e', color: '#111' }}
        >
          {t.afterLabel}
        </span>
      </div>

      {/* BEFORE panel (clips to slider pos) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, background: `linear-gradient(135deg, ${t.beforeBg} 0%, #0d0d0d 100%)` }}
      >
        {/* Silhouette before — wider */}
        <svg viewBox="0 0 80 160" className="h-44 opacity-80" fill="none">
          <ellipse cx="40" cy="22" rx="16" ry="16" fill={t.beforeColor} />
          <rect x="20" y="40" width="40" height="66" rx="10" fill={t.beforeColor} />
          <rect x="8"  y="42" width="12" height="50" rx="6" fill={t.beforeColor} opacity=".8" />
          <rect x="60" y="42" width="12" height="50" rx="6" fill={t.beforeColor} opacity=".8" />
          <rect x="24" y="106" width="13" height="48" rx="6" fill={t.beforeColor} />
          <rect x="43" y="106" width="13" height="48" rx="6" fill={t.beforeColor} />
        </svg>
        <span
          className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-700 uppercase tracking-widest"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
        >
          {t.beforeLabel}
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 w-0.5"
        style={{ left: `${pos}%`, background: '#dfff3e', transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg"
          style={{ background: '#dfff3e' }}
        >
          <svg className="h-4 w-4" fill="none" stroke="#111" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Drag hint — fades after first interaction */}
      <div className="pointer-events-none absolute inset-x-0 bottom-14 flex justify-center">
        <span className="rounded-full bg-black/40 px-3 py-1 text-[9px] uppercase tracking-widest text-white/40 backdrop-blur-sm">
          drag to compare
        </span>
      </div>
    </div>
  )
}

/* ─── STAT CARD ──────────────────────────────────────────────────────────── */

const StatCard = ({ s, active, index }: { s: typeof stats[0]; active: boolean; index: number }) => {
  const count = useCountUp(s.value, active)
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 py-8 px-4 text-center transition-all duration-300 hover:border-[#dfff3e]/20 hover:bg-white/2"
      style={{
        background: 'rgba(255,255,255,0.02)',
        transform: active ? 'translateY(0)' : 'translateY(24px)',
        opacity: active ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.1}s, opacity 0.6s ease ${0.1 + index * 0.1}s, border 0.3s, background 0.3s`,
      }}
    >
      <span className="text-2xl">{s.icon}</span>
      <p className="text-[2.6rem] font-900 leading-none" style={{ color: '#dfff3e' }}>
        {count.toLocaleString()}
        <span className="text-2xl">{s.suffix}</span>
      </p>
      <p className="text-[10px] font-700 uppercase tracking-widest text-[#8b8a8a]">{s.label}</p>
    </div>
  )
}

/* ─── TESTIMONIAL CARD ───────────────────────────────────────────────────── */

const TestimonialCard = ({ t, active, index }: { t: typeof transformations[0]; active: boolean; index: number }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-5 rounded-2xl p-6 transition-all duration-500"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(223,255,62,0.2)' : '1px solid rgba(255,255,255,0.05)',
        transform: active ? 'translateY(0)' : 'translateY(32px)',
        opacity: active ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.2 + index * 0.12}s,
                     opacity 0.65s ease ${0.2 + index * 0.12}s,
                     background 0.3s, border 0.3s`,
      }}
    >
      {/* Before / After slider */}
      <BeforeAfterSlider t={t} />

      {/* Info row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-800 text-white">{t.name}</p>
          <p className="text-xs text-[#8b8a8a]">{t.program}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-900" style={{ color: '#dfff3e' }}>−{t.lost}</p>
          <p className="text-[10px] uppercase tracking-wider text-[#8b8a8a]">in {t.duration}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="relative pl-4 text-sm font-400 italic leading-relaxed text-[#8b8a8a]">
        <div className="absolute left-0 top-0 h-full w-0.5 rounded-full" style={{ background: '#dfff3e' }} />
        &quot;{t.quote}&quot;
      </blockquote>

      {/* Star row */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="h-3 w-3 fill-[#dfff3e]" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-[10px] text-[#8b8a8a]">Verified Member</span>
      </div>
    </div>
  )
}

/* ─── MAIN SECTION ──────────────────────────────────────────────────────── */

const Results = () => {
  const { ref: sectionRef, inView } = useInView(0.05)

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 20% 60%, #1a1500 0%, #0d0d0d 55%, #111 100%)',
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Big background text */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(6rem,20vw,18rem)] font-900 uppercase leading-none opacity-[0.025] text-white"
        style={{ letterSpacing: '-0.05em' }}
      >
        RESULTS
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
          }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-[#dfff3e]" />
              <span className="text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
                Real Transformations
              </span>
            </div>
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none"
              style={{ letterSpacing: '-0.02em', color: '#fff' }}
            >
              Numbers
              <br />
              <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
                Don{`'`}t Lie.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-400 leading-relaxed text-[#8b8a8a]">
            Every stat below is tracked, verified, and earned by real members who showed up and did the work. Your name could be next.
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} active={inView} index={i} />
          ))}
        </div>

        {/* ── Section label ── */}
        <div
          className="mb-8 flex items-center gap-4"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.4s, opacity 0.6s ease 0.4s',
          }}
        >
          <span className="text-sm font-700 uppercase tracking-widest text-white">
            Member Transformations
          </span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-xs text-[#8b8a8a]">Drag slider to compare</span>
        </div>

        {/* ── Before/After Cards ── */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transformations.map((t, i) => (
            <TestimonialCard key={t.name} t={t} active={inView} index={i} />
          ))}
        </div>

        {/* ── Progress bar row ── */}
        <div
          className="mb-16 grid grid-cols-1 gap-6 rounded-2xl border border-white/5 p-8 sm:grid-cols-3"
          style={{
            background: 'rgba(255,255,255,0.02)',
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s',
          }}
        >
          {[
            { label: 'Members who hit their 90-day goal', pct: 94 },
            { label: 'Members who re-enroll after first program', pct: 87 },
            { label: 'Report improved energy within 2 weeks', pct: 96 },
          ].map(({ label, pct }) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-xs font-600 leading-tight text-[#8b8a8a]">{label}</p>
                <p className="ml-4 shrink-0 text-lg font-900" style={{ color: '#dfff3e' }}>{pct}%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: inView ? `${pct}%` : '0%',
                    background: 'linear-gradient(to right, #dfff3e, #c4e000)',
                    transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #1e1e00 0%, #141400 100%)',
            border: '1px solid rgba(223,255,62,0.15)',
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.65s, opacity 0.6s ease 0.65s',
          }}
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{ background: 'rgba(223,255,62,0.12)' }}
          />

          <p className="relative mb-2 text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
            Your turn
          </p>
          <h3
            className="relative mb-4 text-[clamp(1.8rem,4vw,3.5rem)] font-900 uppercase leading-none text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            Start Your
            <br />
            <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
              Transformation
            </span>
          </h3>
          <p className="relative mx-auto mb-8 max-w-md text-base text-[#8b8a8a]">
            Join 300+ members who already made the decision. First class is on us — no contracts, no pressure.
          </p>

          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-800 uppercase tracking-widest text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(223,255,62,0.4)]"
              style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' }}
            >
              👉 Start Your Transformation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="rounded-full border border-white/10 px-7 py-4 text-sm font-700 uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-[#dfff3e]/30 hover:text-[#dfff3e]">
              See All Stories
            </button>
          </div>

          {/* Trust micro-copy */}
          <div className="relative mt-6 flex items-center justify-center gap-6">
            {['No commitment', 'Free first class', 'Cancel anytime'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="6" fill="#dfff3e" fillOpacity=".15" />
                  <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="#dfff3e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-600 uppercase tracking-wider text-[#8b8a8a]">{t}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Results