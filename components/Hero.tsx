'use client'
import React, {  useRef } from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

const mont = Montserrat({
  weight: ['100', '200', '400', '600', '700', '800', '900'],
})

const Hero = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-[#1a1a1a] ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 60% 0%, #2a2a1a 0%, #1a1a1a 55%, #111 100%)',
      }}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Accent lines — decorative */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-0 top-0 h-px w-full opacity-20"
          style={{ background: 'linear-gradient(to right, transparent, #dfff3e, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 h-px w-full opacity-20"
          style={{ background: 'linear-gradient(to right, transparent, #dfff3e, transparent)' }}
        />
        {/* Diagonal accent */}
        <div
          className="absolute -right-40 top-0 h-full w-px origin-top-right rotate-12 opacity-10"
          style={{ background: 'linear-gradient(to bottom, #dfff3e, transparent)' }}
        />
      </div>

      {/* Top nav bar */}
      <nav className="relative z-20 flex items-center justify-between px-6 pt-8 sm:px-12 lg:px-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-sm"
            style={{ background: '#dfff3e' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="12" fill="#111" />
              <rect x="9" y="2" width="5" height="7" fill="#111" />
            </svg>
          </div>
          <span className="text-sm font-700 tracking-widest text-white uppercase">
            FitForge
          </span>
        </div>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {['Programs', 'Trainers', 'Nutrition', 'About'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-xs font-600 uppercase tracking-widest text-[#8b8a8a] transition-colors duration-200 hover:text-[#dfff3e]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="rounded-full border border-[#dfff3e]/30 px-5 py-2 text-xs font-600 uppercase tracking-widest text-[#dfff3e] transition-all duration-200 hover:bg-[#dfff3e] hover:text-black"
        >
          Start Now
        </button>
      </nav>

      {/* ── HERO BODY ── */}
      <div className="relative z-10 px-6 pt-10 sm:px-12 lg:px-20">

        {/* Eyebrow label */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-[#dfff3e]" />
          <span className="text-[10px] font-600 uppercase tracking-[0.25em] text-[#dfff3e]">
            Premium Fitness Studio
          </span>
        </div>

        {/* Main headline */}
        <div className="relative">
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-900 uppercase leading-none tracking-tight text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            NO PAIN
            <br />
            <span
              style={{
                WebkitTextStroke: '2px #dfff3e',
                color: 'transparent',
              }}
            >
              NO GAIN
            </span>
          </h1>

          {/* Hero image — overlaps headline on large screens */}
          {/* <div
            className="
              pointer-events-none
              mt-6
              flex justify-center
              lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2
            "
          >
            <div
              className="
                relative
                h-[340px] w-[240px]
                sm:h-[420px] sm:w-[300px]
                lg:h-[540px] lg:w-[360px]
              "
            >
              {/* Glow behind athlete 
              <div
                className="absolute inset-x-0 bottom-0 mx-auto h-3/4 w-3/4 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, #dfff3e22, transparent 70%)' }}
              />
              <Image
                src="/hero-2.png"
                alt="Athlete hero"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div> */}
        </div>

        {/* ── CONTENT ROW (below headline on mobile, beside image on desktop) ── */}
        <div className="mt-8 flex flex-col gap-12 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:pb-16">

          {/* Left — CTA card */}
          <div
            className="max-w-xs rounded-2xl border border-white/5 p-6"
            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
          >
            <p className="mb-1 text-xs uppercase tracking-widest text-[#8b8a8a]">Limited Offer</p>
            <p className="mb-4 text-base font-400 leading-relaxed text-white/70">
              Ready to transform your body? Join a{' '}
              <span className="font-700 text-[#dfff3e]">FREE</span> class today — personalized
              training for all fitness levels.
            </p>

            {/* Social proof */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#c0c0c0', '#b0a090', '#a0b0c0'].map((c, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-[#1a1a1a]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-[#8b8a8a]">
                <span className="font-700 text-white">2,400+</span> members joined
              </p>
            </div>

            <button
              className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-700 uppercase tracking-widest text-black transition-all duration-300 hover:gap-4"
              style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #b8d400 100%)' }}
            >
              Join Free Class
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right — Expert Diet card */}
          <div className="flex max-w-xs flex-col items-center gap-4 lg:items-end lg:text-right">
            {/* Trainer avatar with ring */}
            <div
              className="relative h-28 w-28 rounded-full p-0.75"
              style={{ background: 'linear-gradient(135deg, #dfff3e, transparent 60%)' }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#2a2a2a]">
                <Image
                  src="/hero-side-2.png"
                  alt="Expert trainer"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Live badge */}
              <div
                className="absolute -right-1 -top-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-700 uppercase tracking-wider text-black"
                style={{ background: '#dfff3e' }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
                Live
              </div>
            </div>

            {/* Animated arrow */}
            <div className="flex flex-col items-center gap-1 lg:items-end">
              {[0, 1, 2].map((i) => (
                <svg
                  key={i}
                  className="h-4 w-4 text-[#dfff3e]"
                  style={{ animationDelay: `${i * 0.15}s`, animation: 'bounce 1.2s infinite' }}
                  fill="currentColor" viewBox="0 0 24 24"
                >
                  <path d="M12 5l7 7H5l7-7z" />
                </svg>
              ))}
            </div>

            <p className="text-3xl font-800 leading-tight text-white sm:text-4xl">
              Join & Get <br />
              <span className="text-[#dfff3e]">Expert Diet</span>
            </p>
            <p className="text-sm text-[#8b8a8a]">Personalized nutrition plans crafted by certified dietitians</p>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="relative z-10 mt-16 border-t border-white/5">
        <div className="grid grid-cols-2 divide-x divide-white/5 sm:grid-cols-4">
          {[
            { value: '12+', label: 'Years Experience' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '340+', label: 'Programs' },
            { value: '24/7', label: 'Support' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-6 text-center transition-colors duration-200 hover:bg-white/2"
            >
              <span
                className="text-3xl font-900 sm:text-4xl"
                style={{ color: '#dfff3e' }}
              >
                {value}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8b8a8a]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div
        ref={marqueeRef}
        className="relative z-10 overflow-hidden border-y border-white/5 py-3"
        style={{ background: '#dfff3e' }}
      >
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: 'marquee 18s linear infinite' }}
        >
          {Array.from({ length: 3 }).map((_, j) => (
            <span key={j} className="flex shrink-0 items-center">
              {['TRANSFORM YOUR BODY', 'FREE FIRST CLASS', 'EXPERT COACHES', 'ALL FITNESS LEVELS', 'REAL RESULTS'].map(
                (t, i) => (
                  <span key={i} className="mx-6 text-xs font-800 uppercase tracking-widest text-black">
                    {t} <span className="mx-2 text-black/30">✦</span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Keyframe injected via style tag */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-6px); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default Hero