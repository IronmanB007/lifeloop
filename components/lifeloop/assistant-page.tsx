'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, FileText, LockKeyhole, MessageCircle, Plus, RotateCcw, Send, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'

type Message = { id:number; role:'user'|'assistant'; text:string; type?:'deadlines'|'subscriptions'|'warranty' }
const prompts=['What should I take care of this week?','Find purchases near their return deadline','Which subscriptions renew soon?','Find my warranty information']

export function AssistantPage() {
  const [messages,setMessages]=useState<Message[]>([])
  const [input,setInput]=useState('')
  const [typing,setTyping]=useState(false)
  const [confirm,setConfirm]=useState(false)
  const [notice,setNotice]=useState('')
  const [historyOpen,setHistoryOpen]=useState(false)
  const ask=(value:string)=>{
    const text=value.trim(); if(!text||typing)return
    setInput(''); setMessages(prev=>[...prev,{id:Date.now(),role:'user',text}]); setTyping(true)
    window.setTimeout(()=>{
      const lower=text.toLowerCase()
      const type:Message['type']=lower.includes('subscription')||lower.includes('renew')?'subscriptions':lower.includes('warranty')?'warranty':lower.includes('purchase')||lower.includes('return')?'deadlines':'deadlines'
      const response=type==='subscriptions'?'I found two renewals coming up. Spotify renews on October 22, and iCloud+ follows on October 25. Both are linked to their original receipts.':type==='warranty'?'Your Dyson V12 warranty is active through May 2027. I found the Best Buy receipt and warranty document so you can check the details.':'You have three things this week: your Sony headphones return window closes Saturday, your prescription is ready for pickup today, and car insurance is due Monday. I found the original sources for each.'
      setMessages(prev=>[...prev,{id:Date.now()+1,role:'assistant',text:response,type}]);setTyping(false)
    },620)
  }
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();ask(input)}
  const notify=(text:string)=>{setNotice(text);window.setTimeout(()=>setNotice(''),2500)}
  return <main className={`assistant-page ${messages.length?'assistant-conversation':''}`}>
    <aside className={`assistant-history ${historyOpen?'history-open':''}`}><div className="history-title"><span>YOUR CONVERSATIONS</span><button aria-label="Close conversation history" onClick={()=>setHistoryOpen(false)}>×</button></div><button className="history-new" onClick={()=>{setMessages([]);setHistoryOpen(false)}}><Plus size={15}/> New conversation</button><div className="history-date">TODAY</div>{messages.length>0?<button className="history-entry history-current" onClick={()=>setHistoryOpen(false)}><MessageCircle size={14}/><span>{messages.find(m=>m.role==='user')?.text}</span></button>:<div className="history-empty"><MessageCircle size={16}/><span>Your conversations will live here.</span></div>}<div className="history-help"><span><LockKeyhole size={14}/></span><p>Your questions are yours. LifeLoop never acts without your say-so.</p></div></aside>
    <div className="assistant-workspace"><div className="assistant-topline"><button className="history-toggle" onClick={()=>setHistoryOpen(v=>!v)}><MessageCircle size={15}/><span>History</span><ChevronDown size={12}/></button><div className="assistant-context"><span className="assistant-live"><i/> LIFELOOP IS HERE</span><span className="context-divider"/><span>Your personal life assistant</span></div><Link href="/app" className="assistant-exit">Back to your life <ArrowUpRight size={14}/></Link></div>
      <div className="assistant-chat-area">
        <AnimatePresence mode="wait">{messages.length===0?<motion.div className="assistant-empty-state" key="welcome" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.25}}>
          <div className="chat-orb"><div className="chat-orb-core"><span className="wordmark-icon"><i/><i/><i/></span></div><span className="chat-orbit chat-orbit-a"/><span className="chat-orbit chat-orbit-b"/><i className="chat-spark spark-left"/><i className="chat-spark spark-right"/></div>
          <div className="assistant-welcome-kicker"><span/> YOUR LIFE, IN A QUESTION</div><h1>What&apos;s on<br/>your <em>mind?</em></h1><p>I&apos;ve connected the dots. Ask me what needs your attention, and I&apos;ll bring the right details to you.</p>
          <div className="suggested-questions"><span>YOU COULD ASK</span>{prompts.map((prompt,i)=><button key={prompt} onClick={()=>ask(prompt)}><span className={`prompt-icon prompt-${i}`}><>{[<CalendarDays key="cal" size={14}/>,<RotateCcw key="return" size={14}/>,<WalletCards key="wallet" size={14}/>,<FileText key="file" size={14}/>][i]}</></span>{prompt}<ArrowUpRight size={14}/></button>)}</div>
        </motion.div>:<motion.div className="conversation-thread" key="thread" initial={{opacity:0}} animate={{opacity:1}}>
          <div className="thread-date"><span/> TODAY · YOUR LIFELOOP</div>{messages.map(message=><motion.div key={message.id} className={`message-row message-${message.role}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.25}}>{message.role==='assistant'&&<span className="message-mark"><span className="wordmark-icon"><i/><i/><i/></span></span>}<div className="message-body"><div className="message-speaker">{message.role==='assistant'?'LIFELOOP':'YOU'} <span>· {message.role==='assistant'?'JUST NOW':'JUST NOW'}</span></div><p>{message.text}</p>{message.role==='assistant'&&message.type&&<ResponseDetails type={message.type} onAction={()=>setConfirm(true)} onNotice={notify}/>}</div></motion.div>)}{typing&&<motion.div className="message-row message-assistant" initial={{opacity:0}} animate={{opacity:1}}><span className="message-mark"><span className="wordmark-icon"><i/><i/><i/></span></span><div className="typing-indicator"><i/><i/><i/><span>Connecting the dots</span></div></motion.div>}
        </motion.div>}</AnimatePresence>
      </div>
      <div className="assistant-composer-area"><div className="assistant-composer-hint"><Sparkles size={13}/> Ask naturally. I&apos;ll find the thread.</div><form className="assistant-composer" onSubmit={submit}><button className="composer-plus" type="button" aria-label="Add context" onClick={()=>notify('You can ask about any connected source.')}><Plus size={17}/></button><input aria-label="Ask LifeLoop a question" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your life admin…"/><span className="composer-shortcut">↵</span><button className="composer-send" type="submit" aria-label="Send question" disabled={!input.trim()||typing}><Send size={16}/></button></form><div className="composer-privacy"><ShieldCheck size={12}/> Your data stays yours. We&apos;ll always ask before taking action.</div></div>
      <div className="assistant-footnote"><span>LifeLoop can make mistakes. Always check important details.</span><span>DEMO WORKSPACE <i/></span></div>
    </div>
    <AnimatePresence>{confirm&&<motion.div className="confirm-scrim" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setConfirm(false)}}><motion.div className="confirm-card assistant-confirm" initial={{opacity:0,y:12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8}}><div className="confirm-icon"><RotateCcw size={18}/></div><div className="app-eyebrow"><span/> BEFORE WE DO ANYTHING</div><h2>Ready to prepare a return?</h2><p>I found the Amazon receipt and return details for your Sony WH-1000XM5. I can prepare the next step for you to review—but I won&apos;t submit anything without your confirmation.</p><div className="source-proof"><FileText size={16}/><div><b>Amazon order · Oct 04</b><span>Return window closes Saturday, Oct 18</span></div><button onClick={()=>{setConfirm(false);notify('Opened the original order source.')}}>View source <ArrowUpRight size={13}/></button></div><div className="confirmation-actions"><button className="app-primary" onClick={()=>{setConfirm(false);notify('Return details prepared for your review.')}}>Prepare for review <ArrowRight size={14}/></button><button className="app-secondary" onClick={()=>setConfirm(false)}>Not now</button></div><small className="permission-reminder"><LockKeyhole size={12}/> Nothing is submitted without your explicit approval.</small></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{notice&&<motion.div className="product-toast" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}><span><Check size={14}/></span>{notice}</motion.div>}</AnimatePresence>
  </main>
}

function ResponseDetails({type,onAction,onNotice}:{type:'deadlines'|'subscriptions'|'warranty';onAction:()=>void;onNotice:(text:string)=>void}) {
  const data=type==='subscriptions'?[{title:'Spotify Premium',detail:'Individual · $11.99 / month',date:'Renews Oct 22',tone:'green',icon:WalletCards},{title:'iCloud+ 200 GB',detail:'Apple storage · $2.99 / month',date:'Renews Oct 25',tone:'violet',icon:WalletCards}]:type==='warranty'?[{title:'Dyson V12 Detect Slim',detail:'Limited warranty · Best Buy',date:'Covered to May 2027',tone:'green',icon:ShieldCheck}]:[{title:'Sony WH-1000XM5',detail:'Amazon · $328.00',date:'Return by Oct 18',tone:'coral',icon:RotateCcw},{title:'Pick up prescription',detail:'CVS Pharmacy',date:'Today · 5:30 PM',tone:'violet',icon:CalendarDays},{title:'Car insurance payment',detail:'Geico · $146.20',date:'Monday · Oct 20',tone:'orange',icon:WalletCards}]
  const href=type==='subscriptions'?'/app/subscriptions':type==='warranty'?'/app/documents':'/app/purchases'
  return <div className="response-card"><div className="response-card-head"><span><Sparkles size={13}/> HERE&apos;S WHAT I FOUND</span><span>{data.length} DETAILS</span></div>{data.map(row=><div className="response-item" key={row.title}><span className={`response-item-icon tone-${row.tone}`}><row.icon size={14}/></span><span className="response-item-copy"><b>{row.title}</b><small>{row.detail}</small></span><span className="response-item-date">{row.date}</span><Link href={href} aria-label={`View ${row.title}`}><ArrowUpRight size={14}/></Link></div>)}<div className="response-actions"><button className="response-primary" onClick={onAction}><Sparkles size={13}/> Prepare action</button><button className="response-secondary" onClick={()=>onNotice('Reminder set for tomorrow morning.')}>Set reminder <ArrowDown size={13}/></button><Link href={href}>View source <ArrowUpRight size={13}/></Link></div><div className="response-permission"><LockKeyhole size={11}/> I&apos;ll ask before anything happens.</div></div>
}
