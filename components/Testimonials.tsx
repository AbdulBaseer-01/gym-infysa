'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const testimonials = [
  {
    id: 1,
    name: 'Marcus T.',
    age: 38,
    program: 'Fat Loss Program',
    duration: '4 months',
    result: '−18 kg',
    quote: 'I lost 18kg in 4 months — best decision I\'ve ever made. I tried three gyms before this one. None of them had a system. This place has a system.',
    highlight: 'The coaches track everything. I never guessed.',
    initials: 'MT',
    avatarBg: '#2a1a1a',
    avatarAccent: '#c0524a',
    stars: 5,
    tag: 'Weight Loss',
  },
  {
    id: 2,
    name: 'Priya K.',
    age: 29,
    program: 'Transformation Program',
    duration: '12 weeks',
    result: '−11 kg',
    quote: 'I came in with zero confidence. I leave every session feeling unstoppable. The diet plan alone was worth the membership.',
    highlight: 'Down 2 dress sizes in 90 days.',
    initials: 'PK',
    avatarBg: '#1a1a2a',
    avatarAccent: '#7a5aab',
    stars: 5,
    tag: 'Transformation',
  },
  {
    id: 3,
    name: 'Jordan M.',
    age: 24,
    program: 'Strength Conditioning',
    duration: '6 weeks',
    result: '+60 kg deadlift',
    quote: 'My deadlift went from 60 to 120kg in six weeks. I thought that was physically impossible. Turns out I just had the wrong coach.',
    highlight: 'Strength doubled in 6 weeks flat.',
    initials: 'JM',
    avatarBg: '#1a2a1a',
    avatarAccent: '#4a9a5a',
    stars: 5,
    tag: 'Strength',
  },
  {
    id: 4,
    name: 'Sara L.',
    age: 34,
    program: 'Personal Coaching',
    duration: '8 weeks',
    result: '−14 kg',
    quote: 'After two pregnancies, I thought my body was just different now. Eight weeks in and I\'m stronger than I was at 25.',
    highlight: 'Stronger than before two pregnancies.',
    initials: 'SL',
    avatarBg: '#2a1f18',
    avatarAccent: '#c08040',
    stars: 5,
    tag: 'Personal Coaching',
  },
  {
    id: 5,
    name: 'Dev R.',
    age: 42,
    program: 'Elite Membership',
    duration: '5 months',
    result: '−22 kg',
    quote: 'I\'ve been a desk worker for 15 years. My back pain is gone, I sleep better, and I\'ve lost 22kg. My doctor called it remarkable.',
    highlight: 'Zero back pain. Down 22kg.',
    initials: 'DR',
    avatarBg: '#1a2228',
    avatarAccent: '#4a80b0',
    stars: 5,
    tag: 'Elite',
  },
  {
    id: 6,
    name: 'Aisha B.',
    age: 31,
    program: 'Group Classes',
    duration: '3 months',
    result: '−9 kg',
    quote: 'Group classes made me actually look forward to working out. The energy in the room is unlike anything I\'ve experienced.',
    highlight: 'Never missed a Monday since joining.',
    initials: 'AB',
    avatarBg: '#221a28',
    avatarAccent: '#9a4a8a',
    stars: 5,
    tag: 'Group Classes',
  },
  {
    id: 7,
    name: 'Chris W.',
    age: 27,
    program: 'Transformation Program',
    duration: '10 weeks',
    result: '+8 kg muscle',
    quote: 'I wanted to bulk up without getting fat. The custom diet plan made that actually happen — 8kg of lean muscle in 10 weeks.',
    highlight: '8kg lean muscle. Zero fluff.',
    initials: 'CW',
    avatarBg: '#1c2218',
    avatarAccent: '#6a9a30',
    stars: 5,
    tag: 'Muscle Gain',
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

/* ─── AVATAR ────────────────────────────────────────────────────────────── */

const Avatar = ({ t, size = 'md' }: { t: typeof testimonials[0]; size?: 'sm' | 'md' | 'lg' }) => {
  const dims = { sm: 'h-10 w-10 text-sm', md: 'h-14 w-14 text-base', lg: 'h-20 w-20 text-xl' }
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full font-900 ${dims[size]}`}
      style={{ background: `linear-gradient(135deg, ${t.avatarBg} 0%, #1a1a1a 100%)`, border: `2px solid ${t.avatarAccent}55` }}
    >
      <span style={{ color: t.avatarAccent }}>{t.initials}</span>
      {/* Verified dot */}
      <div
        className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full"
        style={{ background: '#dfff3e' }}
      >
        <svg className="h-2 w-2" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4l2 2 3-3" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ─── STAR ROW ───────────────────────────────────────────────────────────── */

const Stars = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <svg key={i} className="h-3 w-3 fill-[#dfff3e]" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

/* ─── FEATURED CARD (large) ─────────────────────────────────────────────── */

const FeaturedCard = ({ t, inView }: { t: typeof testimonials[0]; inView: boolean }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl p-8 transition-all duration-500"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #1e1e00 0%, #191919 100%)'
          : 'rgba(255,255,255,0.03)',
        border: hovered ? '1px solid rgba(223,255,62,0.2)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.65s ease, background 0.4s, border 0.4s, box-shadow 0.4s',
      }}
    >
      {/* Quote mark */}
      <div
        className="absolute right-8 top-6 select-none text-[6rem] font-900 leading-none"
        style={{ color: hovered ? 'rgba(223,255,62,0.07)' : 'rgba(255,255,255,0.03)', fontFamily: 'Georgia, serif' }}
      >
        {`"`}
      </div>

      {/* Top */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar t={t} size="lg" />
          <div>
            <p className="font-800 text-white">{t.name}</p>
            <p className="text-xs text-[#8b8a8a]">Age {t.age} · {t.program}</p>
            <Stars />
          </div>
        </div>
        {/* Result badge */}
        <div
          className="rounded-xl px-4 py-2 text-right"
          style={{ background: 'rgba(223,255,62,0.08)', border: '1px solid rgba(223,255,62,0.15)' }}
        >
          <p className="text-xl font-900 leading-none" style={{ color: '#dfff3e' }}>{t.result}</p>
          <p className="text-[9px] uppercase tracking-wider text-[#8b8a8a]">in {t.duration}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mb-5 text-lg font-600 leading-relaxed text-white/90">
        &quot;{t.quote}&quot;
      </blockquote>

      {/* Highlight pill */}
      <div className="flex items-center gap-2">
        <div className="h-px w-6 bg-[#dfff3e]" />
        <span
          className="rounded-full px-3 py-1 text-[10px] font-700 uppercase tracking-widest"
          style={{ background: 'rgba(223,255,62,0.1)', color: '#dfff3e' }}
        >
          {t.highlight}
        </span>
      </div>

      {/* Tag */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className="rounded-full border px-3 py-1 text-[9px] font-700 uppercase tracking-wider"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#8b8a8a' }}
        >
          {t.tag}
        </span>
        <span className="text-[10px] font-600 uppercase tracking-wider text-[#8b8a8a]">Verified Member ✦</span>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left transition-all duration-500"
        style={{
          background: 'linear-gradient(to right, #dfff3e, transparent)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </div>
  )
}

/* ─── COMPACT CARD ───────────────────────────────────────────────────────── */

const CompactCard = ({
  t, inView, index,
}: { t: typeof testimonials[0]; inView: boolean; index: number }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-all duration-500"
      style={{
        background: hovered ? 'linear-gradient(135deg, #1c1c00 0%, #191919 100%)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(223,255,62,0.2)' : '1px solid rgba(255,255,255,0.05)',
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.1}s,
                     opacity 0.65s ease ${0.1 + index * 0.1}s,
                     background 0.4s, border 0.4s`,
      }}
    >
      {/* Quote mark */}
      <div
        className="absolute right-5 top-3 select-none text-[4rem] font-900 leading-none"
        style={{ color: hovered ? 'rgba(223,255,62,0.06)' : 'rgba(255,255,255,0.03)', fontFamily: 'Georgia, serif' }}
      >
        {`"`}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar t={t} size="md" />
          <div>
            <p className="text-sm font-800 text-white">{t.name}</p>
            <p className="text-[10px] text-[#8b8a8a]">{t.program}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-900 leading-none" style={{ color: '#dfff3e' }}>{t.result}</p>
          <p className="text-[9px] uppercase tracking-wider text-[#8b8a8a]">{t.duration}</p>
        </div>
      </div>

      <Stars />

      {/* Quote */}
      <blockquote className="relative pl-3 text-sm font-400 leading-relaxed text-[#b0b0b0]">
        <div
          className="absolute left-0 top-0 h-full w-0.5 rounded-full transition-colors duration-300"
          style={{ background: hovered ? '#dfff3e' : 'rgba(223,255,62,0.3)' }}
        />
        &quot;{t.quote}&quot;
      </blockquote>

      {/* Highlight */}
      <div
        className="rounded-lg px-3 py-2 text-[10px] font-700 uppercase tracking-wider transition-colors duration-300"
        style={{
          background: hovered ? 'rgba(223,255,62,0.1)' : 'rgba(255,255,255,0.03)',
          color: hovered ? '#dfff3e' : '#8b8a8a',
        }}
      >
        ✦ {t.highlight}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left transition-all duration-500"
        style={{
          background: 'linear-gradient(to right, #dfff3e, transparent)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </div>
  )
}

/* ─── MARQUEE STRIP ──────────────────────────────────────────────────────── */

const MarqueeStrip = () => {
  const items = testimonials.map(t => `"${t.highlight}" — ${t.name}`)
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-[#0d0d0d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#0d0d0d] to-transparent" />
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {[...Array(3)].map((_, j) => (
          <span key={j} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="mx-6 text-xs font-600 italic text-[#8b8a8a]">
                {item}
                <span className="mx-4 not-italic text-[#dfff3e]/30">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */

const Testimonials = () => {
  const { ref: sectionRef, inView } = useInView(0.05)
  const { ref: gridRef, inView: gridIn } = useInView(0.05)

  // Active testimonial for the spotlight carousel on mobile
  const [active, setActive] = useState(0)
  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(a => (a + 1) % testimonials.length)

  return (
    <section
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 80% 20%, #181500 0%, #0d0d0d 55%, #111 100%)',
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

      {/* Big BG text */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(5rem,18vw,16rem)] font-900 uppercase leading-none opacity-[0.025] text-white"
        style={{ letterSpacing: '-0.05em' }}
      >
        STORIES
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div
          ref={sectionRef}
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
                Member Stories
              </span>
            </div>
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none"
              style={{ letterSpacing: '-0.02em', color: '#fff' }}
            >
              They Did It.
              <br />
              <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
                So Can You.
              </span>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="mb-5 text-base font-400 leading-relaxed text-[#8b8a8a]">
              Real people. Real timelines. Real results. No filters, no staging — just members who showed up and did the work.
            </p>
            {/* Aggregate rating */}
            <div
              className="inline-flex items-center gap-4 rounded-xl px-5 py-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-3xl font-900 leading-none" style={{ color: '#dfff3e' }}>4.9</p>
                <Stars />
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-sm font-700 text-white">300+ Reviews</p>
                <p className="text-[10px] text-[#8b8a8a]">Verified members only</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP: Featured + grid layout ── */}
        <div ref={gridRef} className="hidden lg:block">
          {/* Row 1: large featured + 2 compact */}
          <div className="mb-5 grid grid-cols-3 gap-5">
            <div className="col-span-1">
              <FeaturedCard t={testimonials[0]} inView={gridIn} />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-5">
              {testimonials.slice(1, 5).map((t, i) => (
                <CompactCard key={t.id} t={t} inView={gridIn} index={i} />
              ))}
            </div>
          </div>
          {/* Row 2: 2 compact + large featured */}
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-5 self-start">
              {testimonials.slice(5, 7).map((t, i) => (
                <CompactCard key={t.id} t={t} inView={gridIn} index={i + 4} />
              ))}
            </div>
            <div className="col-span-1">
              <FeaturedCard t={testimonials[3]} inView={gridIn} />
            </div>
          </div>
        </div>

        {/* ── MOBILE: Carousel ── */}
        <div className="mb-10 lg:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0">
                  <FeaturedCard t={t} inView={inView} />
                </div>
              ))}
            </div>
          </div>
          {/* Controls */}
          <div className="mt-5 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? '#dfff3e' : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
              {[prev, next].map((fn, i) => (
                <button
                  key={i}
                  onClick={fn}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#dfff3e] hover:text-black"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#8b8a8a' }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={i === 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="mt-16">
          <MarqueeStrip />
        </div>

        {/* ── Trust bar ── */}
        <div
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s',
          }}
        >
          {[
            { icon: '🏆', label: '#1 Rated Gym', sub: 'Hyderabad 2024' },
            { icon: '✅', label: 'Verified Reviews', sub: 'Members only' },
            { icon: '🔒', label: 'No fake testimonials', sub: 'All real names' },
            { icon: '📍', label: '300+ Active Members', sub: 'And growing' },
          ].map(({ icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/5 px-4 py-4 transition-colors duration-200 hover:border-[#dfff3e]/15"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-xs font-700 text-white">{label}</p>
                <p className="text-[10px] text-[#8b8a8a]">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          className="mt-16 flex flex-col items-center gap-4 text-center"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.6s, opacity 0.6s ease 0.6s',
          }}
        >
          <p className="text-lg font-700 text-white">
            Ready to write your own story?
          </p>
          <button
            className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-800 uppercase tracking-widest text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(223,255,62,0.35)]"
            style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' }}
          >
            Start Your Free Trial
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-[10px] uppercase tracking-wider text-[#8b8a8a]">
            No commitment · Free first class · Cancel anytime
          </p>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}

export default Testimonials