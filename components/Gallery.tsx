'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Montserrat } from 'next/font/google'
// Using native <img> for external Unsplash URLs — no next.config.js remotePatterns needed

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── DATA — real Unsplash photo IDs ────────────────────────────────────── */
// All photos via images.unsplash.com (free to use, no attribution required for display)

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=70',
    alt: 'Modern gym floor with equipment',
    tag: 'Facility',
    credit: 'Victor Freitas',
    span: 'tall',   // tall = 2 rows
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=70',
    alt: 'Athlete doing weighted barbell squat',
    tag: 'Training',
    credit: 'Anastase Maragos',
    span: 'normal',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400&q=70',
    alt: 'Person lifting heavy dumbbells',
    tag: 'Strength',
    credit: 'Risen Wang',
    span: 'wide',   // wide = 2 cols
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=70',
    alt: 'Weight plates close up',
    tag: 'Facility',
    credit: 'Victor Freitas',
    span: 'normal',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=70',
    alt: 'Fitness trainer coaching client',
    tag: 'Coaching',
    credit: 'Danielle Cerullo',
    span: 'tall',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=70',
    alt: 'Group fitness class in action',
    tag: 'Classes',
    credit: 'Sven Mieke',
    span: 'normal',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=70',
    alt: 'Athlete performing pull-ups',
    tag: 'Training',
    credit: 'John Arano',
    span: 'normal',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=70',
    alt: 'Treadmill row in well-lit gym',
    tag: 'Facility',
    credit: 'Humphrey M',
    span: 'wide',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?w=400&q=70',
    alt: 'Female athlete stretching',
    tag: 'Coaching',
    credit: 'Sushil Ghimire',
    span: 'normal',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=70',
    alt: 'Kettlebell training session',
    tag: 'Strength',
    credit: 'Karsten Winegeart',
    span: 'normal',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=70',
    alt: 'Boxing bag workout',
    tag: 'Classes',
    credit: 'Samuel Girven',
    span: 'tall',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=400&q=70',
    alt: 'Man doing bench press',
    tag: 'Strength',
    credit: 'Edgar Chaparro',
    span: 'normal',
  },
]

const TABS = ['All', 'Facility', 'Training', 'Strength', 'Coaching', 'Classes']

/* ─── HELPERS ───────────────────────────────────────────────────────────── */

function useInView(threshold = 0.05) {
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

/* ─── LIGHTBOX ───────────────────────────────────────────────────────────── */

const Lightbox = ({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: typeof photos[0]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-2xl"
        style={{ background: '#111', border: '1px solid rgba(223,255,62,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
          />
          {/* Caption */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-700 text-white">{photo.alt}</p>
              <p className="text-[10px] text-white/50">Photo by {photo.credit} on Unsplash</p>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[9px] font-700 uppercase tracking-widest"
              style={{ background: '#dfff3e', color: '#111' }}
            >
              {photo.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      {[
        { fn: onPrev, d: 'M15 19l-7-7 7-7', pos: 'left-4 md:left-8' },
        { fn: onNext, d: 'M9 5l7 7-7 7',  pos: 'right-4 md:right-8' },
      ].map(({ fn, d, pos }, i) => (
        <button
          key={i}
          onClick={fn}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:scale-110`}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
          </svg>
        </button>
      ))}

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#dfff3e] hover:text-black"
        style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ─── PHOTO CARD ─────────────────────────────────────────────────────────── */

const PhotoCard = ({
  photo,
  index,
  inView,
  onClick,
}: {
  photo: typeof photos[0]
  index: number
  inView: boolean
  onClick: () => void
}) => {
  const [hovered, setHovered] = useState(false)

  const gridClass =
    photo.span === 'tall' ? 'row-span-2' :
    photo.span === 'wide' ? 'col-span-2' : ''

  const aspectClass =
    photo.span === 'tall'   ? 'aspect-[3/4]' :
    photo.span === 'wide'   ? 'aspect-[16/7]' : 'aspect-square'

  return (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${gridClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s,
                     opacity 0.65s ease ${index * 0.07}s`,
      }}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.thumb}
          alt={photo.alt}
          className="h-full w-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Yellow corner accent on hover */}
        <div
          className="absolute right-0 top-0 h-14 w-14 transition-all duration-400"
          style={{
            background: 'linear-gradient(225deg, rgba(223,255,62,0.35) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Tag pill */}
        <div
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-700 uppercase tracking-widest transition-all duration-300"
          style={{
            background: hovered ? '#dfff3e' : 'rgba(0,0,0,0.5)',
            color: hovered ? '#111' : '#fff',
            backdropFilter: 'blur(4px)',
            transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
            opacity: hovered ? 1 : 0.8,
          }}
        >
          {photo.tag}
        </div>

        {/* Expand icon */}
        <div
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: 'rgba(223,255,62,0.9)',
            transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
          }}
        >
          <svg className="h-3.5 w-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>

        {/* Bottom caption */}
        <div
          className="absolute inset-x-0 bottom-0 p-4 transition-all duration-400"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <p className="text-xs font-600 leading-tight text-white">{photo.alt}</p>
          <p className="text-[9px] text-white/50">© {photo.credit}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */

const Gallery = () => {
  const { ref: sectionRef, inView } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView(0.05)

  const [activeTab, setActiveTab] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeTab === 'All' ? photos : photos.filter(p => p.tag === activeTab)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }, [lightboxIndex, filtered.length])
  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }, [lightboxIndex, filtered.length])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <section
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, #141400 0%, #0d0d0d 50%, #111 100%)',
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '200px', mixBlendMode: 'overlay',
        }}
      />

      {/* Ghost BG text */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(5rem,18vw,16rem)] font-900 uppercase leading-none opacity-[0.025] text-white"
        style={{ letterSpacing: '-0.05em' }}
      >
        GALLERY
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div
          ref={sectionRef}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
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
                Inside FitForge
              </span>
            </div>
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none"
              style={{ letterSpacing: '-0.02em', color: '#fff' }}
            >
              See the
              <br />
              <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
                Space.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-400 leading-relaxed text-[#8b8a8a]">
            A world-class facility doesn{`'`}t need convincing — it just needs to be seen. Every corner is built for performance.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div
          className="mb-10 flex flex-wrap gap-2"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.15s, opacity 0.6s ease 0.15s',
          }}
        >
          {TABS.map(tab => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-5 py-2 text-xs font-700 uppercase tracking-widest transition-all duration-250"
                style={{
                  background: active ? '#dfff3e' : 'rgba(255,255,255,0.05)',
                  color: active ? '#111' : '#8b8a8a',
                  border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.07)',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {tab}
                {tab !== 'All' && (
                  <span
                    className="ml-1.5 rounded-full px-1.5 py-0.5 text-[9px]"
                    style={{
                      background: active ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)',
                      color: active ? '#111' : '#8b8a8a',
                    }}
                  >
                    {photos.filter(p => p.tag === tab).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Masonry Grid ── */}
        <div
          ref={gridRef}
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'auto',
          }}
        >
          {filtered.map((photo, i) => (
            <PhotoCard
              key={`${photo.id}-${activeTab}`}
              photo={photo}
              index={i}
              inView={gridIn}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        {/* Mobile fallback — simple 1-col */}
        <style>{`
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: 1fr !important; }
            .gallery-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
          @media (min-width: 641px) and (max-width: 1023px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .gallery-grid > [class*="col-span-2"] { grid-column: span 2 !important; }
          }
        `}</style>

        {/* ── Photo count + CTA row ── */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s',
          }}
        >
          <p className="text-sm text-[#8b8a8a]">
            Showing <span className="font-700 text-white">{filtered.length}</span> of{' '}
            <span className="font-700 text-white">{photos.length}</span> photos
          </p>
          <button
            className="group flex items-center gap-3 rounded-full px-7 py-3 text-xs font-800 uppercase tracking-widest text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_30px_rgba(223,255,62,0.3)]"
            style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' }}
          >
            Book a Tour
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* ── Attribution note ── */}
        <p className="mt-6 text-center text-[10px] text-[#8b8a8a]/50">
          Photos by Victor Freitas, Anastase Maragos, Risen Wang, Danielle Cerullo, Sven Mieke &amp; others via{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#dfff3e]">
            Unsplash
          </a>
        </p>

      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  )
}

export default Gallery