'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({
  weight: ['400', '600', '700', '800', '900'],
})

const cards = [
  {
    emoji: '💪',
    number: '01',
    title: 'Expert Trainers',
    headline: 'Coached by the best, built for you.',
    body: 'Our certified trainers don\'t just count reps — they read your body, fix your form, and push you past ceilings you didn\'t know you had.',
    stat: '50+',
    statLabel: 'Certified Coaches',
    accent: '#dfff3e',
  },
  {
    emoji: '🥗',
    number: '02',
    title: 'Custom Diet Plans',
    headline: 'Eat right. Not less.',
    body: 'Forget crash diets. Your personalized nutrition plan fuels performance, accelerates recovery, and keeps results permanent.',
    stat: '3×',
    statLabel: 'Faster Results',
    accent: '#dfff3e',
  },
  {
    emoji: '🏋',
    number: '03',
    title: 'Modern Equipment',
    headline: 'World-class tools. Zero excuses.',
    body: 'Train on equipment that professional athletes use — updated every year, maintained daily, so your only limit is you.',
    stat: '200+',
    statLabel: 'Machines & Rigs',
    accent: '#dfff3e',
  },
  {
    emoji: '📈',
    number: '04',
    title: 'Proven Results',
    headline: 'Real transformations. Tracked weekly.',
    body: 'We measure every milestone so you can see the change. 94% of our members hit their primary goal within the first 90 days.',
    stat: '94%',
    statLabel: 'Goal Achievement',
    accent: '#dfff3e',
  },
]

function useInView(threshold = 0.15) {
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

const Card = ({ card, index }: { card: typeof cards[0]; index: number }) => {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-500 cursor-default"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #1f1f1f 0%, #232300 100%)'
          : 'rgba(255,255,255,0.03)',
        border: hovered ? '1px solid #dfff3e44' : '1px solid rgba(255,255,255,0.06)',
        transform: inView
          ? 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.97)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, opacity 0.6s ease ${index * 0.1}s, background 0.4s, border 0.4s`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Number watermark */}
      <span
        className="pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-900 leading-none transition-all duration-500"
        style={{
          color: hovered ? 'rgba(223,255,62,0.07)' : 'rgba(255,255,255,0.03)',
          fontFamily: 'inherit',
        }}
      >
        {card.number}
      </span>

      {/* Top row */}
      <div className="relative mb-6 flex items-start justify-between">
        {/* Icon pill */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-300"
          style={{
            background: hovered ? '#dfff3e' : 'rgba(223,255,62,0.08)',
            transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {card.emoji}
        </div>

        {/* Stat badge */}
        <div className="text-right">
          <p
            className="text-2xl font-900 leading-none transition-colors duration-300"
            style={{ color: hovered ? '#dfff3e' : 'white' }}
          >
            {card.stat}
          </p>
          <p className="text-[10px] font-600 uppercase tracking-widest text-[#8b8a8a]">
            {card.statLabel}
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="relative flex-1">
        <p className="mb-1 text-[10px] font-700 uppercase tracking-[0.2em] text-[#8b8a8a]">
          {card.title}
        </p>
        <h3
          className="mb-3 text-xl font-800 leading-tight text-white transition-colors duration-300"
          style={{ color: hovered ? '#fff' : '#e8e8e8' }}
        >
          {card.headline}
        </h3>
        <p className="text-sm font-400 leading-relaxed text-[#8b8a8a]">{card.body}</p>
      </div>

      {/* Bottom CTA line */}
      <div
        className="relative mt-6 flex items-center gap-2 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
      >
        <div className="h-px flex-1 bg-[#dfff3e]/30" />
        <span className="text-[10px] font-700 uppercase tracking-widest text-[#dfff3e]">
          Learn More →
        </span>
      </div>

      {/* Bottom accent bar */}
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

const Why = () => {
  const { ref: sectionRef, inView: sectionIn } = useInView(0.1)

  return (
    <section
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 30% 100%, #1c1c00 0%, #111 50%, #0d0d0d 100%)',
      }}
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Decorative grid lines */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px opacity-[0.04]"
            style={{ top: `${20 * (i + 1)}%`, background: '#dfff3e' }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* Section header */}
        <div
          ref={sectionRef}
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{
            transform: sectionIn ? 'translateY(0)' : 'translateY(30px)',
            opacity: sectionIn ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
          }}
        >
          <div>
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-[#dfff3e]" />
              <span className="text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
                Why Choose Us
              </span>
            </div>

            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none tracking-tight text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              Built Different.
              <br />
              <span
                style={{
                  WebkitTextStroke: '2px #dfff3e',
                  color: 'transparent',
                }}
              >
                Proven Better.
              </span>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-base font-400 leading-relaxed text-[#8b8a8a]">
              Thousands of gyms promise transformation. We deliver it — with the science, staff,
              and systems to back every claim we make.
            </p>

            {/* Trust badge row */}
            <div className="mt-5 flex items-center gap-4">
              <div
                className="rounded-full px-4 py-1.5 text-xs font-700 uppercase tracking-widest text-black"
                style={{ background: '#dfff3e' }}
              >
                #1 Rated Gym
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 fill-[#dfff3e]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-[#8b8a8a]">4.9 / 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => (
            <Card key={card.number} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA row */}
        <div
          className="mt-16 flex flex-col items-center gap-6 border-t border-white/5 pt-12 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{
            transform: sectionIn ? 'translateY(0)' : 'translateY(20px)',
            opacity: sectionIn ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, opacity 0.7s ease 0.5s',
          }}
        >
          <p className="text-lg font-700 text-white">
            Still not convinced?{' '}
            <span className="text-[#dfff3e]">Come in for a free session.</span>
          </p>
          <button
            className="group flex items-center gap-3 rounded-full border border-[#dfff3e]/30 px-7 py-3 text-sm font-700 uppercase tracking-widest text-[#dfff3e] transition-all duration-300 hover:bg-[#dfff3e] hover:text-black hover:border-[#dfff3e]"
          >
            Claim Free Class
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default Why