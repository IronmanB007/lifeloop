'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Bell, CalendarDays, ChevronDown, FileText, Heart, LayoutDashboard, LifeBuoy, Menu, MessageCircle, Settings2, ShieldCheck, ShoppingBag, Sparkles, WalletCards, X } from 'lucide-react'

const nav = [
  { label: 'Overview', href: '/app', icon: LayoutDashboard },
  { label: 'My Life', href: '/app/life', icon: CalendarDays },
  { label: 'Purchases', href: '/app/purchases', icon: ShoppingBag },
  { label: 'Subscriptions', href: '/app/subscriptions', icon: WalletCards },
  { label: 'Documents', href: '/app/documents', icon: FileText },
  { label: 'Reminders', href: '/app/reminders', icon: Bell },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const title = pathname === '/app' ? 'Overview' : pathname.split('/').at(-1)?.replace(/-/g, ' ').replace(/^./, v => v.toUpperCase())
  return <div className="product-shell">
    <aside className={`product-sidebar ${mobileOpen ? 'product-sidebar-open' : ''}`}>
      <Link href="/" className="product-brand"><span className="product-brand-glyph"><i/><i/><i/></span>lifeloop<span>.</span></Link>
      <div className="workspace-switch"><div className="workspace-avatar">JD</div><div><strong>Jordan&apos;s Life</strong><span>Personal workspace</span></div><ChevronDown size={14}/></div>
      <div className="product-nav-label">YOUR SPACE</div><nav className="product-nav" aria-label="LifeLoop navigation">{nav.map(item => { const active = item.href === '/app' ? pathname === '/app' : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`product-nav-link ${active ? 'product-nav-active' : ''}`}><item.icon size={16} strokeWidth={1.8}/><span>{item.label}</span>{item.label === 'Reminders' && <i className="nav-indicator"/>}</Link> })}</nav>
      <Link href="/assistant" className={`assistant-nav-card ${pathname === '/assistant' ? 'assistant-nav-active' : ''}`} onClick={() => setMobileOpen(false)}><div className="assistant-nav-icon"><Sparkles size={17}/></div><div><b>Ask LifeLoop</b><span>Your life, in a question.</span></div><ArrowRight size={14}/></Link>
      <div className="sidebar-bottom"><button className="help-link" onClick={() => notify('You’re viewing a sample workspace.')}><LifeBuoy size={15}/> Help & feedback</button><Link href="/app/settings" onClick={() => setMobileOpen(false)} className={`product-nav-link settings-link ${pathname === '/app/settings' ? 'product-nav-active' : ''}`}><Settings2 size={16}/><span>Settings</span></Link><div className="sidebar-profile"><div className="profile-avatar">JD</div><div><b>Jordan Davis</b><span>Free preview</span></div><button aria-label="Open profile options" onClick={() => notify('Profile options are a demo interaction.')}><ChevronDown size={14}/></button></div><div className="sidebar-data-label"><i/> SAMPLE WORKSPACE</div></div>
    </aside>
    <div className="product-main"><header className="product-topbar"><button className="mobile-nav-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <X size={18}/> : <Menu size={18}/>}</button><div className="app-breadcrumb"><span>YOUR LIFE</span><i>/</i><b>{title}</b></div><div className="topbar-tools"><div className="sync-chip"><span/> All caught up</div><button className="topbar-icon" aria-label="Notifications" onClick={() => notify('Nothing new — you’re all caught up.')}><Bell size={17}/><i/></button><div className="topbar-avatar">JD</div></div></header><main className="workspace-content" key={pathname}><AnimatePresence mode="wait"><motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>{children}</motion.div></AnimatePresence></main><footer className="workspace-footer"><span><ShieldCheck size={13}/> You&apos;re in control. Always.</span><span>LifeLoop sample workspace <Heart size={11}/></span></footer></div>
    <AnimatePresence>{mobileOpen && <motion.button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div className="product-toast" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}><span><ShieldCheck size={14}/></span>{toast}</motion.div>}</AnimatePresence>
  </div>
}
