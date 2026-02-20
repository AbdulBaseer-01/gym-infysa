'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({
  weight: ['400', '600', '700', '800', '900'],
})

const services = [
  {
    id: '01',
    icon: '🏋',
    tag: 'Strength',
    title: 'Weight Training',
    result: 'Build dense muscle. Sculpt a body that turns heads.',
    description: 'Progressive overload programming designed to add lean mass week over week — not just sweat.',
    duration: '60 min',
    level: 'All Levels',
    highlight: true,
  },
  {
    id: '02',
    icon: '🔥',
    tag: 'Fat Loss',
    title: 'Fat Loss Program',
    result: 'Burn fat. Keep every ounce of muscle.',
    description: 'HIIT + metabolic conditioning protocols proven to torch calories for 24 hours post-session.',
    duration: '45 min',
    level: 'Beginner+',
    highlight: false,
  },
  {
    id: '03',
    icon: '⚡',
    tag: 'Performance',
    title: 'Strength Conditioning',
    result: 'Move better. Lift heavier. Break plateaus.',
    description: 'Functional strength meets athletic conditioning — built for people who want to perform, not just look good.',
    duration: '75 min',
    level: 'Intermediate',
    highlight: false,
  },
  {
    id: '04',
    icon: '🎯',
    tag: 'One-on-One',
    title: 'Personal Coaching',
    result: 'Your goals. Your pace. Zero guesswork.',
    description: 'A dedicated coach in your corner — crafting every session, tracking every metric, adjusting every week.',
    duration: '60 min',
    level: 'All Levels',
    highlight: false,
  },
  {
    id: '05',
    icon: '🤝',
    tag: 'Community',
    title: 'Group Classes',
    result: 'Train harder when the energy is contagious.',
    description: 'High-energy group sessions that make you forget you\'re working out — and come back for more.',
    duration: '50 min',
    level: 'All Levels',
    highlight: false,
  },
  {
    id: '06',
    icon: '📈',
    tag: 'Complete',
    title: 'Transformation Program',
    result: '12 weeks. New body. New baseline.',
    description: 'Our flagship end-to-end system — training, nutrition, accountability, and weekly check-ins that guarantee measurable change.',
    duration: '12 Weeks',
    level: 'All Levels',
    highlight: true,
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const CheckIcon = ({ lit }: { lit: boolean }) => (
  <div
    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300"
    style={{ background: lit ? '#dfff3e' : 'rgba(223,255,62,0.12)' }}
  >
    <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5 3.5-4" stroke={lit ? '#111' : '#dfff3e'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

const ServiceCard = ({ s, index }: { s: typeof services[0]; index: number }) => {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: s.highlight
          ? hovered ? 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' : 'linear-gradient(135deg, #d4f033 0%, #b8d400 100%)'
          : hovered ? 'linear-gradient(135deg, #1f1f1f 0%, #1a1a00 100%)' : 'rgba(255,255,255,0.03)',
        border: s.highlight
          ? '1px solid transparent'
          : hovered ? '1px solid rgba(223,255,62,0.3)' : '1px solid rgba(255,255,255,0.06)',
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.96)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s,
                     opacity 0.65s ease ${index * 0.08}s,
                     background 0.4s, border 0.4s, box-shadow 0.4s`,
        boxShadow: s.highlight && hovered
          ? '0 24px 60px rgba(223,255,62,0.25)'
          : hovered ? '0 20px 50px rgba(0,0,0,0.5)' : 'none',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Watermark number */}
      <span
        className="pointer-events-none absolute -right-2 -top-5 select-none text-[6.5rem] font-900 leading-none"
        style={{
          color: s.highlight
            ? 'rgba(0,0,0,0.07)'
            : hovered ? 'rgba(223,255,62,0.06)' : 'rgba(255,255,255,0.03)',
        }}
      >
        {s.id}
      </span>

      <div className="relative flex flex-1 flex-col p-7">
        {/* Top row */}
        <div className="mb-5 flex items-start justify-between">
          {/* Icon */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-300"
            style={{
              background: s.highlight
                ? 'rgba(0,0,0,0.12)'
                : hovered ? '#dfff3e' : 'rgba(223,255,62,0.08)',
              transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            {s.icon}
          </div>

          {/* Tag pill */}
          <span
            className="rounded-full px-3 py-1 text-[9px] font-700 uppercase tracking-widest transition-all duration-300"
            style={{
              background: s.highlight
                ? 'rgba(0,0,0,0.15)'
                : hovered ? 'rgba(223,255,62,0.15)' : 'rgba(255,255,255,0.06)',
              color: s.highlight ? '#111' : '#dfff3e',
            }}
          >
            {s.tag}
          </span>
        </div>

        {/* Title */}
        <p
          className="mb-1 text-[10px] font-700 uppercase tracking-[0.2em] transition-colors duration-300"
          style={{ color: s.highlight ? 'rgba(0,0,0,0.5)' : '#8b8a8a' }}
        >
          Program
        </p>
        <h3
          className="mb-3 text-xl font-900 leading-tight transition-colors duration-300"
          style={{ color: s.highlight ? '#111' : '#fff' }}
        >
          {s.title}
        </h3>

        {/* Result line with check */}
        <div className="mb-4 flex items-start gap-3">
          <CheckIcon lit={!s.highlight} />
          <p
            className="text-sm font-700 leading-snug transition-colors duration-300"
            style={{ color: s.highlight ? '#1a1a00' : hovered ? '#dfff3e' : '#e8e8e8' }}
          >
            {s.result}
          </p>
        </div>

        {/* Description */}
        <p
          className="mb-6 flex-1 text-sm font-400 leading-relaxed transition-colors duration-300"
          style={{ color: s.highlight ? 'rgba(0,0,0,0.55)' : '#8b8a8a' }}
        >
          {s.description}
        </p>

        {/* Meta row */}
        <div className="mb-5 flex items-center gap-4">
          {[
            { icon: '⏱', val: s.duration },
            { icon: '🎚', val: s.level },
          ].map(({ icon, val }) => (
            <div key={val} className="flex items-center gap-1.5">
              <span className="text-xs">{icon}</span>
              <span
                className="text-[11px] font-600 uppercase tracking-wider transition-colors duration-300"
                style={{ color: s.highlight ? 'rgba(0,0,0,0.5)' : '#8b8a8a' }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mb-5 h-px w-full"
          style={{
            background: s.highlight
              ? 'rgba(0,0,0,0.1)'
              : 'rgba(255,255,255,0.06)',
          }}
        />

        {/* CTA */}
        <button
          className="group/btn flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm font-700 uppercase tracking-widest transition-all duration-300"
          style={{
            background: s.highlight
              ? 'rgba(0,0,0,0.12)'
              : hovered ? '#dfff3e' : 'rgba(223,255,62,0.06)',
            color: s.highlight
              ? '#111'
              : hovered ? '#111' : '#dfff3e',
          }}
        >
          <span>Learn More</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Left accent bar */}
      <div
        className="absolute bottom-0 left-0 top-0 w-0.75 origin-top transition-all duration-500"
        style={{
          background: '#dfff3e',
          transform: hovered && !s.highlight ? 'scaleY(1)' : 'scaleY(0)',
        }}
      />
    </div>
  )
}

const Services = () => {
  const { ref: headerRef, inView: headerIn } = useInView(0.1)

  return (
    <section
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 70% 50%, #161600 0%, #0d0d0d 60%, #111 100%)',
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Diagonal decorative line */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden"
      >
        <div
          className="absolute h-full w-px origin-top opacity-5"
          style={{
            left: '20%',
            background: 'linear-gradient(to bottom, transparent, #dfff3e, transparent)',
            transform: 'rotate(15deg) scaleY(1.5)',
          }}
        />
        <div
          className="absolute h-full w-px origin-bottom opacity-5"
          style={{
            right: '15%',
            background: 'linear-gradient(to top, transparent, #dfff3e, transparent)',
            transform: 'rotate(-12deg) scaleY(1.5)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          style={{
            transform: headerIn ? 'translateY(0)' : 'translateY(30px)',
            opacity: headerIn ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
          }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-[#dfff3e]" />
              <span className="text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
                What We Offer
              </span>
            </div>
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none tracking-tight"
              style={{ letterSpacing: '-0.02em', color: '#fff' }}
            >
              Choose Your
              <br />
              <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
                Weapon.
              </span>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="mb-5 text-base font-400 leading-relaxed text-[#8b8a8a]">
              Six specialized programs. One mission — your best body. Pick the path that matches where you are and where you want to go.
            </p>
            {/* Program count badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-[#dfff3e]/20 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#dfff3e]" />
                <span className="text-xs font-700 uppercase tracking-widest text-[#dfff3e]">
                  6 Programs Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-white/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{
            background: 'rgba(255,255,255,0.02)',
            transform: headerIn ? 'translateY(0)' : 'translateY(20px)',
            opacity: headerIn ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s, opacity 0.7s ease 0.6s',
          }}
        >
          <div>
            <p className="mb-1 text-lg font-800 text-white">
              Not sure which program is right for you?
            </p>
            <p className="text-sm text-[#8b8a8a]">
              Take our 60-second quiz and get a personalized recommendation.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <button
              className="rounded-full border border-white/10 px-6 py-3 text-xs font-700 uppercase tracking-widest text-white/60 transition-all duration-300 hover:border-[#dfff3e]/30 hover:text-[#dfff3e]"
            >
              View All
            </button>
            <button
              className="group flex items-center gap-3 rounded-full px-7 py-3 text-xs font-700 uppercase tracking-widest text-black transition-all duration-300 hover:gap-5"
              style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' }}
            >
              Take the Quiz
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services