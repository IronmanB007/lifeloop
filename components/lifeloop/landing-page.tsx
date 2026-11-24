'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, FileText, Inbox, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, WalletCards, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { number: '01', name: 'Discover', copy: 'LifeLoop quietly finds what matters across the places life happens.', icon: Inbox },
  { number: '02', name: 'Understand', copy: 'Receipts become return windows. Fine print becomes a deadline.', icon: Sparkles },
  { number: '03', name: 'Remind', copy: 'The right nudge, at the right time. Never another noisy notification.', icon: CalendarDays },
  { number: '04', name: 'Prepare', copy: 'See the next step and its source. You stay in control, always.', icon: Zap },
  { number: '05', name: 'Resolve', copy: 'A small thing handled is a little more room to live.', icon: Check },
]

export function LandingPage() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const host = root.current
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 34, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
      gsap.from('.hero-art', { y: 48, scale: 0.94, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.3 })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } })
      })
      gsap.to('.orbit-card-a', { y: -11, rotate: 2, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.orbit-card-b', { y: 9, rotate: -2, duration: 4.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.hero-core', { rotate: 360, duration: 46, repeat: -1, ease: 'none' })
      gsap.to('.story-glow', { yPercent: 24, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, host)
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  return <main className="landing" ref={root}>
    <header className="landing-nav"><Link className="wordmark" href="/" aria-label="LifeLoop home"><span className="wordmark-icon"><i/><i/><i/></span>lifeloop<span className="wordmark-dot">.</span></Link><nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#why-lifeloop">Why LifeLoop</a><a href="#privacy">Privacy</a></nav><div className="nav-cta"><Link href="/assistant" className="nav-text-link">Ask LifeLoop <ArrowUpRight size={14}/></Link><Link href="/app" className="pill-button pill-dark">Meet LifeLoop <ArrowRight size={14}/></Link></div></header>
    <section className="hero-section">
      <div className="hero-grid-lines" aria-hidden="true"/><div className="hero-copy">
        <div className="eyebrow-light"><span className="live-spark"/><span>YOUR LIFE, LESS SCATTERED</span></div>
        <h1>Your life has<br/>too many <em>tabs</em><br/>open<span className="period-coral">.</span></h1>
        <p className="hero-subhead">Let LifeLoop handle them.</p>
        <p className="hero-description">One assistant. Multiple apps. Less forgotten. More done. The little responsibilities that hide in your inbox, calendar and camera roll—brought into focus.</p>
        <div className="hero-actions"><Link className="pill-button pill-coral" href="/app">Meet LifeLoop <ArrowRight size={16}/></Link><a className="hero-secondary" href="#how-it-works"><span className="play-circle"><ArrowDown size={14}/></span> Explore how it works</a></div>
        <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><span>A calmer way to keep up with life.</span></div>
      </div>
      <div className="hero-art" aria-label="A visual of everyday responsibilities organizing themselves in LifeLoop">
        <div className="art-caption"><span>THE LIFELOOP EFFECT</span><span>01 / 05</span></div>
        <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><svg className="connection-lines" viewBox="0 0 680 570" aria-hidden="true"><path d="M150 114 C250 118 235 205 334 247"/><path d="M525 122 C425 120 452 198 355 248"/><path d="M147 424 C246 420 252 323 334 276"/><path d="M524 424 C430 418 432 322 355 276"/></svg>
        <div className="hero-core"><span className="core-ring core-ring-one"/><span className="core-ring core-ring-two"/><div className="core-logo"><span className="wordmark-icon"><i/><i/><i/></span></div><span className="core-label">LIFELOOP</span><span className="core-status"><i/> MAKING SENSE OF IT ALL</span></div>
        <motion.div className="orbit-card orbit-card-a"><div className="orbit-card-top"><span className="app-mark mail-mark"><Inbox size={13}/></span><span>Gmail · today</span><span className="card-more">···</span></div><div className="receipt-preview"><span>YOUR ORDER IS ON ITS WAY</span><strong>Sony WH-1000XM5</strong><div className="receipt-line"/><div className="receipt-meta"><span>Return window</span><b>2 days left</b></div></div><div className="card-foot"><span className="micro-dot coral-dot"/> Deadline found <ArrowUpRight size={12}/></div></motion.div>
        <motion.div className="orbit-card orbit-card-b"><div className="orbit-card-top"><span className="app-mark calendar-mark"><CalendarDays size={13}/></span><span>Calendar · Oct 20</span><span className="card-more">···</span></div><div className="calendar-preview"><div><b>MON</b><strong>20</strong></div><div><span>Car insurance</span><small>Payment due · $146.20</small></div></div><div className="card-foot"><span className="micro-dot violet-dot"/> Added to your week <ArrowUpRight size={12}/></div></motion.div>
        <div className="float-note note-one"><span><FileText size={13}/></span>Warranty found <Check size={12}/></div><div className="float-note note-two"><span><RotateCcw size={13}/></span>Return deadline <span className="note-number">02d</span></div>
        <div className="art-bottom"><span>YOUR DIGITAL LIFE, CONNECTED</span><div className="art-source-icon gmail-mini">M</div><div className="art-source-icon cal-mini"><CalendarDays size={13}/></div><div className="art-source-icon drive-mini"><FileText size={13}/></div><span className="source-plus">+ more</span></div>
      </div>
      <div className="hero-bottom"><span>BUILT FOR ALL THE LIFE BETWEEN THE BIG MOMENTS</span><a href="#problem">SCROLL TO EXPLORE <ArrowDown size={12}/></a></div>
    </section>

    <section className="problem-section" id="problem"><div className="problem-left" data-reveal><div className="eyebrow-dark"><span>01</span><span>THE LITTLE THINGS ADD UP</span></div><h2>Life doesn&apos;t happen<br/>in one <span>inbox.</span></h2></div><div className="problem-right" data-reveal><p>It&apos;s the return window buried in a receipt. The subscription that quietly renewed. The warranty you know you saved somewhere.</p><p>None of it is hard on its own. It&apos;s keeping all of it in your head that is.</p><div className="scatter-visual"><div className="scatter-item scatter-email"><span className="scatter-icon mail-mark"><Inbox size={14}/></span><span>Order confirmation</span><small>“Your return window ends soon”</small></div><div className="scatter-item scatter-calendar"><span className="scatter-icon calendar-mark"><CalendarDays size={14}/></span><span>Oct 20 · Payment due</span></div><div className="scatter-item scatter-note"><span className="scatter-icon note-mark"><FileText size={14}/></span><span>Warranty_2024.pdf</span></div><span className="scatter-cross">×</span><span className="scatter-cross cross-two">×</span></div></div></section>

    <section className="story-section" id="why-lifeloop"><div className="story-glow"/><div className="story-content"><div className="eyebrow-dark" data-reveal><span>02</span><span>MEET YOUR LIFE ADMIN, HANDLED</span></div><h2 data-reveal>Less keeping track.<br/><span>More being here.</span></h2><div className="story-bottom" data-reveal><p>LifeLoop joins the dots between the apps you already use. It notices what matters, brings it to you before it slips by, and helps you take the next step—when you&apos;re ready.</p><Link className="story-link" href="/app">See your LifeLoop <ArrowUpRight size={15}/></Link></div><div className="story-visual" aria-hidden="true"><div className="story-source source-gmail"><Inbox size={19}/><span>Inbox</span></div><div className="story-source source-calendar"><CalendarDays size={19}/><span>Calendar</span></div><div className="story-source source-docs"><FileText size={19}/><span>Documents</span></div><div className="story-thread thread-one"/><div className="story-thread thread-two"/><div className="story-thread thread-three"/><div className="story-hub"><div className="story-hub-icon"><span className="wordmark-icon"><i/><i/><i/></span></div><span>LifeLoop</span><small>ALL THE IMPORTANT THINGS</small></div><div className="story-node node-return"><RotateCcw size={14}/><span>Return window</span><b>2 days</b></div><div className="story-node node-renewal"><WalletCards size={14}/><span>Spotify renews</span><b>Oct 22</b></div><div className="story-node node-warranty"><ShieldCheck size={14}/><span>Warranty saved</span><b>May 2027</b></div></div></div></section>

    <section className="how-section" id="how-it-works"><div className="how-intro" data-reveal><div className="eyebrow-dark"><span>03</span><span>NO NEW HABITS REQUIRED</span></div><h2>A little less<br/><span>to remember.</span></h2><p>LifeLoop does the joining-up. You just choose what happens next.</p></div><div className="steps-list">{stages.map((step,i)=><motion.div className="step-row" key={step.number} data-reveal whileHover={{ x: 5 }}><span className="step-number">{step.number}</span><span className={`step-symbol step-tone-${i}`}><step.icon size={17}/></span><div className="step-copy"><h3>{step.name}</h3><p>{step.copy}</p></div><ArrowUpRight size={16} className="step-arrow"/></motion.div>)}</div></section>

    <section className="feature-section"><div className="feature-top" data-reveal><div><div className="eyebrow-dark"><span>04</span><span>THE DETAILS, TAKEN CARE OF</span></div><h2>Small things.<br/><span>Already handled.</span></h2></div><p>From “I should do that” to “already done.” Without adding another app to your routine.</p></div><div className="feature-stage"><article className="feature-large feature-returns" data-reveal><div className="feature-index">01 — PURCHASES</div><div className="feature-graphic return-graphic"><div className="return-stamp">RETURN<br/>WINDOW</div><div className="return-tag"><span>ORDER 438-1209</span><strong>Sony WH-1000XM5</strong><small>Purchased Oct 04</small><div className="return-tag-bottom"><span>Return until</span><b>Oct 18</b></div></div><div className="return-count"><span>JUST A HEADS-UP</span><strong>02<small> DAYS</small></strong><i>to start a return</i></div></div><h3>Returns & warranties</h3><p>The deadlines hiding in your receipts, brought forward in time.</p><Link href="/app/purchases" aria-label="Explore purchases"><ArrowUpRight size={17}/></Link></article><article className="feature-small feature-subs" data-reveal><div className="feature-index">02 — SUBSCRIPTIONS</div><div className="sub-graphic"><span className="sub-ring"/><span className="sub-music">♫</span><div className="sub-renewal"><small>NEXT UP</small><b>Spotify</b><span>Oct 22 <i>·</i> $11.99</span></div></div><h3>Quiet renewals, noticed.</h3><p>Know what renews before it renews.</p><Link href="/app/subscriptions" aria-label="Explore subscriptions"><ArrowUpRight size={17}/></Link></article><article className="feature-small feature-docs" data-reveal><div className="feature-index">03 — DOCUMENTS</div><div className="docs-graphic"><div className="doc-sheet"><div className="doc-mark"><ShieldCheck size={17}/></div><span>DYSON V12</span><strong>Limited warranty</strong><small>Valid until May 2027</small><div className="doc-lines"><i/><i/><i/></div></div><span className="doc-check"><Check size={13}/></span></div><h3>The right detail, found.</h3><p>Important info from the things you already have.</p><Link href="/app/documents" aria-label="Explore documents"><ArrowUpRight size={17}/></Link></article></div></section>

    <section className="assistant-section"><div className="assistant-orb-wrap" data-reveal><div className="assistant-orb"><div className="assistant-orb-inner"><span className="wordmark-icon"><i/><i/><i/></span></div><i className="orb-dot dot-a"/><i className="orb-dot dot-b"/><i className="orb-dot dot-c"/></div><div className="assistant-orb-caption"><span className="live-spark"/> HERE WHEN YOU NEED IT</div></div><div className="assistant-copy" data-reveal><div className="eyebrow-light"><span>05</span><span>A BETTER WAY TO ASK</span></div><h2>Skip the searching.<br/><span>Just ask.</span></h2><p>“What needs my attention this week?” One question, and LifeLoop brings the right things into view—with the receipts, dates and next steps to back it up.</p><div className="assistant-demo"><span className="assistant-demo-mark"><Sparkles size={14}/></span><span>Which purchases are still eligible for return?</span><ArrowUpRight size={15}/></div><Link className="pill-button pill-light" href="/assistant">Meet your assistant <ArrowRight size={15}/></Link></div></section>

    <section className="privacy-section" id="privacy"><div className="privacy-copy" data-reveal><div className="eyebrow-dark"><span>06</span><span>ALWAYS YOUR CALL</span></div><h2>Helpful, not<br/><span>handsy.</span></h2><p>LifeLoop can find the next step. Only you decide whether to take it. Every detail comes with its source, and every consequential action waits for your say-so.</p><Link className="privacy-link" href="/app/settings">How we think about privacy <ArrowRight size={14}/></Link></div><div className="privacy-art" data-reveal><div className="privacy-glass"><div className="privacy-shield"><LockKeyhole size={22}/></div><div className="privacy-lines"><span>YOUR DATA</span><strong>Yours to see.<br/>Yours to decide.</strong><small>Clear sources. Human choice.</small></div><div className="permission-row"><span className="permission-icon"><RotateCcw size={15}/></span><div><b>Start a return?</b><small>We&apos;ll wait for your yes.</small></div><button type="button" aria-label="Permission granted"><Check size={14}/></button></div><div className="privacy-reflection"/></div><span className="privacy-orbit orbit-a"/><span className="privacy-orbit orbit-b"/></div></section>

    <section className="final-cta"><div className="cta-noise"/><div className="eyebrow-light" data-reveal><span className="live-spark"/><span>MAKE A LITTLE ROOM</span></div><h2 data-reveal>More life.<br/><em>Less life admin.</em></h2><p data-reveal>Start with what you already have. LifeLoop will take it from here.</p><div data-reveal className="final-actions"><Link className="pill-button pill-light" href="/app">Meet LifeLoop <ArrowRight size={15}/></Link><span>Demo workspace · no sign-up needed</span></div><div className="cta-loop" aria-hidden="true"><span>l</span></div></section>

    <footer className="landing-footer"><Link className="wordmark footer-brand" href="/"><span className="wordmark-icon"><i/><i/><i/></span>lifeloop<span className="wordmark-dot">.</span></Link><span>One assistant. Multiple apps. Less forgotten. More done.</span><div><Link href="/app">Overview</Link><Link href="/assistant">Assistant</Link><a href="#privacy">Privacy</a></div><small>© 2026 LifeLoop. Sample experience.</small></footer>
  </main>
}
