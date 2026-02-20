'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ weight: ['400', '600', '700', '800', '900'] })

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const plans = [
  {
    id: 'basic',
    tier: 'Basic',
    tagline: 'Get in. Get moving.',
    price: { monthly: 29, annual: 23 },
    badge: null,
    highlight: false,
    cta: 'Start Free Trial',
    color: '#8b8a8a',
    features: [
      { text: 'Unlimited gym access', included: true },
      { text: 'Group classes (3/week)', included: true },
      { text: 'Basic fitness assessment', included: true },
      { text: '7-day free trial', included: true },
      { text: 'Nutrition guidelines', included: true },
      { text: 'Personal coaching sessions', included: false },
      { text: 'Custom diet plan', included: false },
      { text: 'Priority booking', included: false },
    ],
  },
  {
    id: 'pro',
    tier: 'Pro',
    tagline: 'Train smarter. See results faster.',
    price: { monthly: 59, annual: 47 },
    badge: 'Most Popular',
    highlight: true,
    cta: 'Get Pro Access',
    color: '#dfff3e',
    features: [
      { text: 'Unlimited gym access', included: true },
      { text: 'Unlimited group classes', included: true },
      { text: 'Full fitness assessment', included: true },
      { text: '14-day free trial', included: true },
      { text: 'Personalised nutrition plan', included: true },
      { text: '4 coaching sessions / month', included: true },
      { text: 'Custom diet plan', included: true },
      { text: 'Priority booking', included: false },
    ],
  },
  {
    id: 'elite',
    tier: 'Elite',
    tagline: 'The full system. Unlimited.',
    price: { monthly: 99, annual: 79 },
    badge: 'Best Value',
    highlight: false,
    cta: 'Go Elite',
    color: '#dfff3e',
    features: [
      { text: 'Unlimited gym access', included: true },
      { text: 'Unlimited group classes', included: true },
      { text: 'Advanced fitness assessment', included: true },
      { text: '30-day free trial', included: true },
      { text: 'Custom nutrition & macro plan', included: true },
      { text: 'Unlimited coaching sessions', included: true },
      { text: 'Weekly custom diet updates', included: true },
      { text: 'Priority booking & VIP locker', included: true },
    ],
  },
]

const faqs = [
  { q: 'Can I switch plans later?', a: 'Yes — upgrade or downgrade anytime from your member dashboard, effective the next billing cycle.' },
  { q: 'What happens after my free trial?', a: 'You\'ll be notified 3 days before it ends. No charge until you choose to continue.' },
  { q: 'Is there a joining fee?', a: 'None. What you see is what you pay — monthly or annual, nothing hidden.' },
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

/* ─── CHECK / CROSS ICONS ────────────────────────────────────────────────── */

const Check = ({ highlight }: { highlight: boolean }) => (
  <div
    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
    style={{ background: highlight ? '#dfff3e' : 'rgba(223,255,62,0.1)' }}
  >
    <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5 3.5-4" stroke={highlight ? '#111' : '#dfff3e'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

const Cross = () => (
  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
    <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
      <path d="M3 3l4 4M7 3l-4 4" stroke="#8b8a8a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
)

/* ─── PLAN CARD ──────────────────────────────────────────────────────────── */

const PlanCard = ({
  plan, annual, inView, index,
}: {
  plan: typeof plans[0]; annual: boolean; inView: boolean; index: number
}) => {
  const [hovered, setHovered] = useState(false)
  const price = annual ? plan.price.annual : plan.price.monthly

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: plan.highlight
          ? 'linear-gradient(160deg, #dfff3e 0%, #c4e000 100%)'
          : hovered
            ? 'linear-gradient(160deg, #1c1c00 0%, #191919 100%)'
            : 'rgba(255,255,255,0.03)',
        border: plan.highlight
          ? '1px solid transparent'
          : hovered
            ? '1px solid rgba(223,255,62,0.25)'
            : '1px solid rgba(255,255,255,0.06)',
        boxShadow: plan.highlight
          ? hovered ? '0 32px 80px rgba(223,255,62,0.3)' : '0 16px 60px rgba(223,255,62,0.18)'
          : hovered ? '0 20px 50px rgba(0,0,0,0.5)' : 'none',
        transform: inView
          ? plan.highlight ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)'
          : 'translateY(50px) scale(0.96)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s,
                     opacity 0.65s ease ${index * 0.12}s,
                     background 0.4s, border 0.4s, box-shadow 0.4s`,
        zIndex: plan.highlight ? 10 : 1,
      }}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div
          className="absolute right-5 top-5 rounded-full px-3 py-1 text-[9px] font-800 uppercase tracking-widest"
          style={{
            background: plan.highlight ? 'rgba(0,0,0,0.15)' : '#dfff3e',
            color: plan.highlight ? '#111' : '#111',
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Watermark tier name */}
      <span
        className="pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-900 uppercase leading-none"
        style={{
          color: plan.highlight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.03)',
        }}
      >
        {plan.tier}
      </span>

      <div className="relative flex flex-1 flex-col p-8">

        {/* Header */}
        <div className="mb-6">
          <p
            className="mb-1 text-[10px] font-700 uppercase tracking-[0.2em]"
            style={{ color: plan.highlight ? 'rgba(0,0,0,0.5)' : '#8b8a8a' }}
          >
            {plan.tier}
          </p>
          <h3
            className="mb-1 text-2xl font-900 leading-tight"
            style={{ color: plan.highlight ? '#111' : '#fff' }}
          >
            {plan.tagline}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-6 flex items-end gap-2">
          <span
            className="text-[3.5rem] font-900 leading-none"
            style={{ color: plan.highlight ? '#111' : '#dfff3e' }}
          >
            ${price}
          </span>
          <div className="mb-2 flex flex-col">
            <span
              className="text-sm font-600"
              style={{ color: plan.highlight ? 'rgba(0,0,0,0.55)' : '#8b8a8a' }}
            >
              / month
            </span>
            {annual && (
              <span
                className="text-[10px] font-700 uppercase tracking-wider"
                style={{ color: plan.highlight ? 'rgba(0,0,0,0.45)' : '#dfff3e' }}
              >
                billed annually
              </span>
            )}
          </div>
        </div>

        {/* Savings pill */}
        {annual && (
          <div
            className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: plan.highlight ? 'rgba(0,0,0,0.12)' : 'rgba(223,255,62,0.1)',
            }}
          >
            <span className="text-[9px]">💰</span>
            <span
              className="text-[9px] font-800 uppercase tracking-wider"
              style={{ color: plan.highlight ? '#111' : '#dfff3e' }}
            >
              Save ${(plan.price.monthly - plan.price.annual) * 12}/yr
            </span>
          </div>
        )}

        {/* Divider */}
        <div
          className="mb-6 h-px w-full"
          style={{ background: plan.highlight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)' }}
        />

        {/* Features */}
        <ul className="mb-8 flex flex-1 flex-col gap-3">
          {plan.features.map(({ text, included }) => (
            <li key={text} className="flex items-start gap-3">
              {included ? <Check highlight={!plan.highlight} /> : <Cross />}
              <span
                className="text-sm font-400 leading-snug"
                style={{
                  color: included
                    ? plan.highlight ? '#111' : '#e8e8e8'
                    : '#555',
                  textDecoration: included ? 'none' : 'none',
                }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-800 uppercase tracking-widest transition-all duration-300 hover:gap-5"
          style={{
            background: plan.highlight
              ? 'rgba(0,0,0,0.15)'
              : hovered
                ? '#dfff3e'
                : 'rgba(223,255,62,0.07)',
            color: plan.highlight ? '#111' : hovered ? '#111' : '#dfff3e',
            border: plan.highlight
              ? 'none'
              : hovered ? 'none' : '1px solid rgba(223,255,62,0.15)',
          }}
        >
          {plan.cta}
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Trial note */}
        <p
          className="mt-3 text-center text-[10px] font-600 uppercase tracking-wider"
          style={{ color: plan.highlight ? 'rgba(0,0,0,0.4)' : '#8b8a8a' }}
        >
          ✦ Free trial included — no card required
        </p>
      </div>

      {/* Bottom accent bar on dark cards */}
      {!plan.highlight && (
        <div
          className="h-0.5 w-full origin-left transition-all duration-500"
          style={{
            background: 'linear-gradient(to right, #dfff3e, transparent)',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
      )}
    </div>
  )
}

/* ─── FAQ ROW ────────────────────────────────────────────────────────────── */

const FaqRow = ({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-[#dfff3e]/15"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.6s ease ${0.5 + index * 0.1}s, opacity 0.6s ease ${0.5 + index * 0.1}s, border 0.3s`,
        background: open ? 'rgba(223,255,62,0.03)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-700 text-white">{q}</span>
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: open ? '#dfff3e' : 'rgba(255,255,255,0.06)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg className="h-3 w-3" fill="none" stroke={open ? '#111' : '#8b8a8a'} viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? '120px' : '0px' }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-[#8b8a8a]">{a}</p>
      </div>
    </div>
  )
}

/* ─── MAIN SECTION ──────────────────────────────────────────────────────── */

const Membership = () => {
  const [annual, setAnnual] = useState(false)
  const { ref: sectionRef, inView } = useInView(0.05)

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-24 ${mont.className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #1a1500 0%, #0d0d0d 50%, #111 100%)',
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
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(5rem,18vw,16rem)] font-900 uppercase leading-none opacity-[0.025] text-white"
        style={{ letterSpacing: '-0.05em' }}
      >
        PLANS
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div
          className="mb-12 text-center"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#dfff3e]" />
            <span className="text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">
              Membership Plans
            </span>
            <div className="h-px w-10 bg-[#dfff3e]" />
          </div>
          <h2
            className="mb-4 text-[clamp(2.4rem,5.5vw,5rem)] font-900 uppercase leading-none"
            style={{ letterSpacing: '-0.02em', color: '#fff' }}
          >
            Simple Pricing.
            <br />
            <span style={{ WebkitTextStroke: '2px #dfff3e', color: 'transparent' }}>
              Serious Results.
            </span>
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#8b8a8a]">
            No hidden fees, no lock-ins. Pick the plan that fits your goals and start with a free trial today.
          </p>
        </div>

        {/* ── Billing Toggle ── */}
        <div
          className="mb-14 flex items-center justify-center gap-4"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.15s, opacity 0.6s ease 0.15s',
          }}
        >
          <span
            className="text-sm font-700 uppercase tracking-wider transition-colors duration-200"
            style={{ color: !annual ? '#fff' : '#8b8a8a' }}
          >
            Monthly
          </span>

          <button
            onClick={() => setAnnual(!annual)}
            className="relative h-7 w-14 rounded-full transition-all duration-300"
            style={{
              background: annual ? '#dfff3e' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300"
              style={{
                left: annual ? 'calc(100% - 1.5rem)' : '0.2rem',
                background: annual ? '#111' : '#fff',
              }}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className="text-sm font-700 uppercase tracking-wider transition-colors duration-200"
              style={{ color: annual ? '#fff' : '#8b8a8a' }}
            >
              Annual
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-800 uppercase tracking-wider"
              style={{ background: '#dfff3e', color: '#111' }}
            >
              Save up to 20%
            </span>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} annual={annual} inView={inView} index={i} />
          ))}
        </div>

        {/* ── Comparison Note ── */}
        <div
          className="mb-16 flex flex-col items-center gap-6 rounded-2xl border border-white/5 p-8 text-center sm:flex-row sm:text-left"
          style={{
            background: 'rgba(255,255,255,0.02)',
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.45s, opacity 0.6s ease 0.45s',
          }}
        >
          <div className="flex-1">
            <p className="mb-1 text-base font-800 text-white">All plans include a free trial period — zero risk.</p>
            <p className="text-sm text-[#8b8a8a]">Cancel before your trial ends and you won{`'`}t be charged a cent. No questions asked.</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {['7-day', '14-day', '30-day'].map((d, i) => (
              <div key={d} className="flex flex-col items-center rounded-xl border border-white/5 px-4 py-3">
                <span className="text-base font-900" style={{ color: '#dfff3e' }}>{d}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#8b8a8a]">{['Basic', 'Pro', 'Elite'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div
          className="mb-16"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s',
          }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-700 uppercase tracking-widest text-white">Quick Answers</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {faqs.map((faq, i) => (
              <FaqRow key={faq.q} q={faq.q} a={faq.a} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #1e1e00 0%, #141400 100%)',
            border: '1px solid rgba(223,255,62,0.15)',
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s ease 0.65s, opacity 0.6s ease 0.65s',
          }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{ background: 'rgba(223,255,62,0.1)' }}
          />
          <p className="relative mb-2 text-[10px] font-700 uppercase tracking-[0.25em] text-[#dfff3e]">No risk. All reward.</p>
          <h3
            className="relative mb-4 text-[clamp(1.6rem,3.5vw,3rem)] font-900 uppercase leading-none text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            Still deciding? <span style={{ WebkitTextStroke: '1.5px #dfff3e', color: 'transparent' }}>Try it free.</span>
          </h3>
          <p className="relative mx-auto mb-8 max-w-md text-sm text-[#8b8a8a]">
            Every plan starts with a free trial. Walk in, work out, and only pay if you love it.
          </p>
          <button
            className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-800 uppercase tracking-widest text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(223,255,62,0.35)]"
            style={{ background: 'linear-gradient(135deg, #dfff3e 0%, #c4e000 100%)' }}
          >
            Claim Your Free Trial
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <div className="relative mt-5 flex items-center justify-center gap-6">
            {['No card required', 'Cancel anytime', 'Instant access'].map((t) => (
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

export default Membership