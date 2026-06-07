import { useState, useEffect, useRef } from 'react'

/* ── palette ── */
const A = '#10b981'
const BG = '#050a0f'
const TX = '#ebebeb'
const MU = 'rgba(235,235,235,0.45)'
const BR = 'rgba(255,255,255,0.08)'
const SF = 'rgba(255,255,255,0.03)'

/* ── default data ── */
const DEFAULT_SERVICES = [
  { id:'1', title:'Scaling & Polishing', desc:'Professional deep cleaning to remove plaque and tartar for healthier gums.', visible:true },
  { id:'2', title:'Tooth Filling', desc:'Tooth-coloured composite fillings that restore teeth naturally and painlessly.', visible:true },
  { id:'3', title:'Root Canal Treatment', desc:'Advanced RCT with digital X-ray guidance to save infected teeth and relieve pain.', visible:true },
  { id:'4', title:'Tooth Extraction', desc:'Safe and minimally painful extraction using modern local anaesthesia.', visible:true },
  { id:'5', title:'Wisdom Tooth Removal', desc:'Surgical and non-surgical removal of impacted wisdom teeth.', visible:true },
  { id:'6', title:'Braces & Orthodontics', desc:'Metal, ceramic, and clear aligner options to straighten teeth at any age.', visible:true },
  { id:'7', title:'Dental Implants', desc:'Permanent titanium implants that look, feel, and function like natural teeth.', visible:true },
  { id:'8', title:'Dentures', desc:'Full and partial dentures crafted for comfort and a natural appearance.', visible:true },
  { id:'9', title:'Crowns & Bridges', desc:'Porcelain and zirconia crowns to restore damaged or missing teeth.', visible:true },
  { id:'10', title:'Teeth Whitening', desc:'Professional in-chair whitening for a brighter smile in a single visit.', visible:true },
  { id:'11', title:'Emergency Dental Care', desc:'Same-day emergency appointments for pain relief and urgent dental needs.', visible:true },
]
const DEFAULT_NOTICES = [
  { id:'1', pinned:true,  text:'Eid Special: 20% off on Teeth Whitening & Scaling this month. Limited slots.', date:'June 7, 2026' },
  { id:'2', pinned:false, text:'New hours: Saturday–Thursday 10AM–9PM · Friday 5PM–9PM.', date:'June 1, 2026' },
  { id:'3', pinned:false, text:'Digital periapical X-ray now available for instant, accurate diagnosis.', date:'May 20, 2026' },
]

/* ── localStorage helpers ── */
const LS = {
  getSvc: () => { try { const r=localStorage.getItem('dc_svc'); return r?JSON.parse(r):DEFAULT_SERVICES } catch{ return DEFAULT_SERVICES } },
  saveSvc: (d) => localStorage.setItem('dc_svc', JSON.stringify(d)),
  getNot: () => { try { const r=localStorage.getItem('dc_not'); return r?JSON.parse(r):DEFAULT_NOTICES } catch{ return DEFAULT_NOTICES } },
  saveNot: (d) => localStorage.setItem('dc_not', JSON.stringify(d)),
  isAdmin: () => sessionStorage.getItem('dc_admin')==='1',
  login: (p) => { if(p==='1234'){ sessionStorage.setItem('dc_admin','1'); return true } return false },
  logout: () => sessionStorage.removeItem('dc_admin'),
}

/* ── hooks ── */
function useReveal(threshold=0.1){
  const ref=useRef(null); const [v,setV]=useState(false)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setV(true);obs.disconnect()} },{threshold})
    obs.observe(el); return ()=>obs.disconnect()
  },[threshold])
  return [ref,v]
}
function useCountUp(target,active,dur=1800){
  const [v,setV]=useState(0)
  useEffect(()=>{ if(!active) return; let s=null
    const step=(ts)=>{ if(!s)s=ts; const p=Math.min((ts-s)/dur,1); const e=1-Math.pow(1-p,3)
      setV(Math.round(e*target)); if(p<1)requestAnimationFrame(step) }
    requestAnimationFrame(step)
  },[active,target,dur]); return v
}

/* ── CSS ── */
const STYLES = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${BG};color:${TX};font-family:'Lato',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:rgba(16,185,129,.15);color:${A}}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:rgba(16,185,129,.3);border-radius:2px}
input,select,textarea{outline:none;font-family:'Lato',sans-serif}
input:focus,select:focus,textarea:focus{border-color:${A}!important}
button{cursor:pointer}
img{display:block}

@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes floatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(16,185,129,.35)}50%{box-shadow:0 0 40px rgba(16,185,129,.5)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes blob{0%,100%{border-radius:40% 60% 60% 40%/70% 30% 70% 30%}50%{border-radius:60% 40% 40% 60%/30% 70% 30% 70%}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideL{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideR{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:translateX(0)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}

.reveal{opacity:0;transform:translateY(32px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}
.reveal.on{opacity:1;transform:translateY(0)}
.reveal-l{opacity:0;transform:translateX(-36px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal-l.on{opacity:1;transform:translateX(0)}
.reveal-r{opacity:0;transform:translateX(36px);transition:opacity .7s cubic-bezier(.16,1,.3,1) .15s,transform .7s cubic-bezier(.16,1,.3,1) .15s}
.reveal-r.on{opacity:1;transform:translateX(0)}

.nav-link{background:none;border:none;font-family:'Space Grotesk',sans-serif;font-size:13px;letter-spacing:.07em;text-transform:capitalize;color:${MU};transition:color .3s;padding-bottom:3px;position:relative}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;height:1px;width:0;background:${A};transition:width .35s cubic-bezier(.16,1,.3,1)}
.nav-link:hover,.nav-link.active{color:${A}}
.nav-link:hover::after,.nav-link.active::after{width:100%}

.btn-p{background:${A};color:#000;border:none;padding:13px 28px;border-radius:999px;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;letter-spacing:.05em;animation:glow 3s ease-in-out infinite;transition:transform .25s;white-space:nowrap}
.btn-p:hover{transform:scale(1.04)}
.btn-g{background:transparent;color:${TX};border:1px solid ${BR};padding:13px 28px;border-radius:999px;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;transition:border-color .3s,color .3s;white-space:nowrap}
.btn-g:hover{border-color:${A};color:${A}}

.svc-card{background:${SF};border:1px solid ${BR};border-radius:22px;padding:28px 24px;transition:all .4s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
.svc-card:hover{background:rgba(16,185,129,.05);border-color:rgba(16,185,129,.3);transform:translateY(-5px);box-shadow:0 18px 40px rgba(16,185,129,.1)}

.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:4px}
.hamburger span{display:block;width:24px;height:2px;background:${TX};border-radius:2px}
.mob-menu{position:fixed;inset:0;background:rgba(5,10,15,.97);backdrop-filter:blur(20px);z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;animation:fadeUp .3s ease}
.mob-link{font-family:'Newsreader',serif;font-size:34px;font-weight:600;color:${MU};background:none;border:none;cursor:pointer;transition:color .3s}
.mob-link:hover{color:${A}}

.lbl{font-family:'Space Grotesk',sans-serif;font-size:10px;letter-spacing:.2em;color:${A};text-transform:uppercase;display:block;margin-bottom:7px}
.inp{width:100%;padding:13px 16px;background:rgba(255,255,255,.04);border:1px solid ${BR};border-radius:12px;color:${TX};font-size:15px;transition:border-color .3s;color-scheme:dark}

/* ── Desktop ── */
@media(min-width:901px){
  .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
  .svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
  .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .contact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .hero-img{height:420px}
  .about-img-wrap{height:440px}
  .desktop-nav{display:flex;gap:28px}
  .hamburger{display:none!important}
}

/* ── Mobile ── */
@media(max-width:900px){
  .desktop-nav{display:none!important}
  .hamburger{display:flex!important}
  .hero-grid{display:flex;flex-direction:column;gap:32px}
  .hero-img{height:260px;order:-1}
  .doctor-card{display:block!important}
  .about-grid{display:flex;flex-direction:column;gap:36px}
  .about-img-wrap{height:300px}
  .svc-grid{display:grid;grid-template-columns:1fr;gap:16px}
  .stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .contact-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .ba-grid{display:grid;grid-template-columns:1fr;gap:20px}
  section{padding-left:18px!important;padding-right:18px!important}
  #home{padding-top:88px!important;padding-bottom:40px!important}
  .hero-btns{flex-direction:column!important}
  .hero-btns .btn-p,.hero-btns .btn-g{width:100%;text-align:center;display:block}
  .form-wrap{padding:28px 20px!important;border-radius:20px!important}
  .stat-card{padding:22px 14px!important}
}
@media(max-width:480px){
  .stat-grid{grid-template-columns:repeat(2,1fr)!important}
  .contact-grid{grid-template-columns:1fr!important}
}
`

/* ── Reveal wrapper ── */
function Reveal({ children, cls='reveal', delay=0, style={} }){
  const [ref,v]=useReveal()
  return <div ref={ref} className={`${cls}${v?' on':''}`} style={{transitionDelay:`${delay}ms`,...style}}>{children}</div>
}

/* ── Section label ── */
function Label({ text }){
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
      <span style={{width:24,height:1,background:A,display:'inline-block'}}/>
      <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,letterSpacing:'0.22em',color:A,textTransform:'uppercase'}}>{text}</span>
      <span style={{width:6,height:6,borderRadius:'50%',background:A,display:'inline-block',animation:'pulseDot 2s infinite'}}/>
    </div>
  )
}

/* ── H2 ── */
function H2({ children, size='clamp(34px,4vw,54px)' }){
  return <h2 style={{fontFamily:"'Newsreader',serif",fontSize:size,fontWeight:800,lineHeight:1.05,letterSpacing:'-0.02em'}}>{children}</h2>
}

/* ── NAVBAR ── */
function Navbar({ onAdmin }){
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  const [active,setActive]=useState('home')
  const NAV=['home','about','services','notices','contact']

  useEffect(()=>{
    const s=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',s); return ()=>window.removeEventListener('scroll',s)
  },[])

  const go=(id)=>{ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setActive(id); setOpen(false) }

  return (
    <>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        background:scrolled?'rgba(5,10,15,.9)':'transparent',
        backdropFilter:scrolled?'blur(18px)':'none',
        borderBottom:scrolled?`1px solid ${BR}`:'none',
        transition:'all .4s cubic-bezier(.16,1,.3,1)',padding:'0 28px'}}>
        <div style={{maxWidth:1280,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:70}}>
          <button onClick={()=>go('home')} style={{background:'none',border:'none',display:'flex',alignItems:'center',gap:12,padding:0}}>
            <div style={{width:38,height:38,background:A,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',animation:'glow 3s ease-in-out infinite',flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round"><path d="M12 2C9 2 7 4 7 7c0 1.5.4 2.8 1 3.8L9.5 20h5L16 10.8c.6-1 1-2.3 1-3.8 0-3-2-5-5-5z"/></svg>
            </div>
            <div style={{textAlign:'left'}}>
              <div style={{fontFamily:"'Newsreader',serif",fontSize:17,fontWeight:700,color:TX,lineHeight:1.1}}>Dr. Rakib's</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,letterSpacing:'0.2em',color:A,textTransform:'uppercase'}}>Dental Care</div>
            </div>
          </button>
          <div className="desktop-nav">
            {NAV.map(id=><button key={id} className={`nav-link${active===id?' active':''}`} onClick={()=>go(id)} style={{textTransform:'capitalize'}}>{id}</button>)}
          </div>
          <button className="btn-p desktop-nav" onClick={()=>go('appointment')} style={{padding:'10px 20px',fontSize:13}}>Book Appointment</button>
          <button className="hamburger" onClick={()=>setOpen(true)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      {open&&(
        <div className="mob-menu">
          <button onClick={()=>setOpen(false)} style={{position:'absolute',top:22,right:22,background:'none',border:'none',color:MU,fontSize:26}}>✕</button>
          {NAV.map(id=><button key={id} className="mob-link" onClick={()=>go(id)} style={{textTransform:'capitalize'}}>{id}</button>)}
          <button className="btn-p" onClick={()=>{go('appointment');setOpen(false)}} style={{marginTop:8}}>Book Appointment</button>
        </div>
      )}
    </>
  )
}

/* ── TICKER ── */
function Ticker(){
  const txt='Scaling & Polishing  ·  Root Canal Treatment  ·  Braces & Orthodontics  ·  Dental Implants  ·  Teeth Whitening  ·  Emergency Care  ·  Crowns & Bridges  ·  Tooth Extraction'
  return (
    <div style={{position:'fixed',top:70,left:0,right:0,zIndex:99,background:'rgba(16,185,129,.08)',borderBottom:'1px solid rgba(16,185,129,.12)',overflow:'hidden',height:28,display:'flex',alignItems:'center'}}>
      <div style={{display:'flex',animation:'ticker 28s linear infinite',whiteSpace:'nowrap'}}>
        {[0,1].map(i=><span key={i} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,letterSpacing:'0.18em',color:A,textTransform:'uppercase',paddingRight:80}}>{txt}</span>)}
      </div>
    </div>
  )
}

/* ── HERO ── */
function Hero(){
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return (
    <section id="home" style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'98px 32px 56px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',width:'100%'}} className="hero-grid">
        {/* Left */}
        <div style={{animation:'slideL .8s cubic-bezier(.16,1,.3,1) both'}}>
          <Label text="Bangladesh's Trusted Dental Clinic"/>
          <h1 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(42px,5.5vw,82px)',fontWeight:800,lineHeight:.98,letterSpacing:'-0.02em',marginBottom:22}}>
            Your <em style={{color:A,fontStyle:'italic'}}>Smile</em><br/>Deserves the<br/>Best Care
          </h1>
          <p style={{fontSize:15,color:MU,lineHeight:1.8,maxWidth:420,marginBottom:32}}>
            Dr. Rakib's Dental Care provides state-of-the-art dental treatment in a clean, comfortable environment in Dhaka. From routine checkups to advanced implants — we are here for you.
          </p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:40}} className="hero-btns">
            <button className="btn-p" onClick={()=>go('appointment')}>Book Appointment</button>
            <a href="tel:+8801XXXXXXXXX" className="btn-g">Emergency Call</a>
          </div>
          <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[{v:'2500+',l:'Patients Treated'},{v:'5+ Yrs',l:'Experience'},{v:'11',l:'Services'}].map(b=>(
              <div key={b.l}>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:26,fontWeight:800,color:A}}>{b.v}</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,letterSpacing:'0.14em',color:MU,textTransform:'uppercase'}}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="hero-img" style={{position:'relative',animation:'slideR .8s cubic-bezier(.16,1,.3,1) .1s both'}}>
          {/* Clinic card */}
          <div style={{position:'absolute',top:0,left:'3%',right:0,bottom:80,borderRadius:22,overflow:'hidden',border:`1px solid ${BR}`,animation:'floatSlow 7s ease-in-out infinite'}}>
            <img src="/images/clinic.jpg" alt="Clinic" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.92}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(5,10,15,.85))',padding:'22px 18px 16px'}}>
              <div style={{fontFamily:"'Newsreader',serif",fontSize:16,fontWeight:600,color:TX}}>Modern Treatment Room</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,color:A,textTransform:'uppercase',letterSpacing:'0.15em',marginTop:2}}>Dhaka, Bangladesh</div>
            </div>
          </div>
          {/* Doctor card */}
          <div className="doctor-card" style={{position:'absolute',bottom:0,left:0,width:160,background:'rgba(5,10,15,.92)',border:'1px solid rgba(16,185,129,.35)',borderRadius:16,padding:12,backdropFilter:'blur(16px)',animation:'float 5.5s ease-in-out infinite',zIndex:2}}>
            <img src="/images/doctor.jpg" alt="Dr. Rakib" style={{width:'100%',height:95,objectFit:'cover',objectPosition:'top center',borderRadius:10,marginBottom:9}}/>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:14,fontWeight:600,color:TX}}>Dr. Rakib</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,color:A,textTransform:'uppercase',letterSpacing:'0.12em',marginTop:2}}>BDS, Dental Surgeon</div>
          </div>
          {/* Badge */}
          <div style={{position:'absolute',top:12,right:0,background:A,color:'#000',borderRadius:13,padding:'10px 15px',textAlign:'center',boxShadow:'0 8px 28px rgba(16,185,129,.45)',animation:'float 4s ease-in-out infinite',zIndex:2}}>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:22,fontWeight:800,lineHeight:1}}>98%</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600,marginTop:2}}>Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── STATS ── */
function StatCard({ value, label, suffix, delay }){
  const [ref,v]=useReveal()
  const c=useCountUp(value,v)
  return (
    <div ref={ref} className={`reveal stat-card${v?' on':''}`} style={{transitionDelay:`${delay}ms`,background:SF,border:`1px solid ${BR}`,borderRadius:20,padding:'30px 18px',textAlign:'center',backdropFilter:'blur(12px)'}}>
      <div style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(34px,5vw,50px)',fontWeight:800,color:A,lineHeight:1,letterSpacing:'-0.02em'}}>{c}{suffix}</div>
      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,letterSpacing:'0.16em',color:MU,textTransform:'uppercase',marginTop:9}}>{label}</div>
    </div>
  )
}
function Stats(){
  const stats=[{value:2500,label:'Happy Patients',suffix:'+'},{value:11,label:'Services',suffix:''},{value:5,label:'Years Experience',suffix:'+'},{value:98,label:'Satisfaction',suffix:'%'}]
  return (
    <section style={{padding:'0 32px 72px',position:'relative',zIndex:1}}>
      <div className="stat-grid" style={{maxWidth:1280,margin:'0 auto'}}>{stats.map((s,i)=><StatCard key={i} {...s} delay={i*80}/>)}</div>
    </section>
  )
}

/* ── ABOUT ── */
function About(){
  return (
    <section id="about" style={{padding:'90px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto'}} className="about-grid">
        <Reveal cls="reveal-l" style={{}}>
          <div className="about-img-wrap" style={{position:'relative'}}>
            <img src="/images/doctor.jpg" alt="Dr. Rakib" style={{position:'absolute',top:0,left:0,width:'63%',height:'75%',objectFit:'cover',objectPosition:'top center',borderRadius:22,border:`1px solid ${BR}`}}/>
            <img src="/images/xray.jpg" alt="Digital X-ray" style={{position:'absolute',bottom:0,right:0,width:'51%',height:'52%',objectFit:'cover',borderRadius:18,border:`1px solid ${BR}`}}/>
            <div style={{position:'absolute',bottom:48,left:'7%',background:A,color:'#000',borderRadius:14,padding:'11px 16px',boxShadow:'0 8px 28px rgba(16,185,129,.4)',animation:'floatSlow 6s ease-in-out infinite'}}>
              <div style={{fontFamily:"'Newsreader',serif",fontSize:19,fontWeight:800,lineHeight:1}}>Digital X-Ray</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600,marginTop:2}}>Technology</div>
            </div>
          </div>
        </Reveal>
        <Reveal cls="reveal-r">
          <Label text="About Our Clinic"/>
          <H2>Advanced Care, <em style={{color:A,fontStyle:'italic'}}>Compassionate</em> Treatment</H2>
          <p style={{color:MU,lineHeight:1.8,marginTop:18,marginBottom:14,fontSize:15}}>Dr. Rakib's Dental Care is equipped with the latest digital X-ray technology, strict sterilisation protocols, and modern dental units to deliver world-class oral healthcare in Dhaka.</p>
          <p style={{color:MU,lineHeight:1.8,marginBottom:26,fontSize:15}}>Led by Dr. Rakib (BDS), our clinic has treated over 2,500 patients with a commitment to pain-free, comfortable dental care.</p>
          {['ISO-standard sterilisation protocols','Digital OPG & periapical X-ray','Pain-free injection technique','Flexible payment options available'].map((f,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:11,marginBottom:11}}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round"><polyline points="2,8 6,12 14,4"/></svg>
              <span style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:MU}}>{f}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ── SERVICES ── */
function Services(){
  const [svcs,setSvcs]=useState([])
  const [hRef,hV]=useReveal()
  useEffect(()=>{
    const load=()=>setSvcs(LS.getSvc().filter(s=>s.visible!==false))
    load()
    window.addEventListener('storage',load)
    const t=setInterval(load,2000)
    return ()=>{ window.removeEventListener('storage',load); clearInterval(t) }
  },[])
  const icons={'1':'🦷','2':'🔵','3':'🌀','4':'✂️','5':'🦴','6':'😁','7':'🏗','8':'👄','9':'👑','10':'✨','11':'🚨'}
  return (
    <section id="services" style={{padding:'90px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal${hV?' on':''}`} style={{textAlign:'center',marginBottom:52}}>
          <Label text="What We Offer"/>
          <H2 size="clamp(34px,4vw,58px)">Our <em style={{color:A,fontStyle:'italic'}}>Services</em></H2>
        </div>
        <div className="svc-grid">
          {svcs.map((s,i)=>(
            <Reveal key={s.id} delay={Math.min(i*55,400)}>
              <div className="svc-card" style={{height:'100%'}}>
                <div style={{width:46,height:46,borderRadius:13,background:'rgba(16,185,129,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14}}>{icons[s.id]||'🦷'}</div>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:19,fontWeight:600,color:TX,marginBottom:9,lineHeight:1.25}}>{s.title}</div>
                <div style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:MU,lineHeight:1.7}}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── BEFORE/AFTER ── */
function BeforeAfter(){
  const [hRef,hV]=useReveal()
  const items=[
    {img:'/images/scaling-before-after.jpg',title:'Scaling & Polishing',desc:'Plaque and tartar removed in one session. Visible transformation immediately after treatment.'},
    {img:'/images/rct-xray.jpg',title:'Root Canal Treatment',desc:'Digital X-ray assisted RCT for precise, minimally invasive, and pain-free results.'},
  ]
  return (
    <section style={{padding:'72px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal${hV?' on':''}`} style={{textAlign:'center',marginBottom:48}}>
          <Label text="Real Results"/>
          <H2>Before &amp; <em style={{color:A,fontStyle:'italic'}}>After</em></H2>
        </div>
        <div className="ba-grid">
          {items.map((item,i)=>(
            <Reveal key={i} delay={i*120}>
              <div style={{background:SF,border:`1px solid ${BR}`,borderRadius:22,overflow:'hidden',backdropFilter:'blur(12px)'}}>
                <div style={{height:268,overflow:'hidden',background:'rgba(16,185,129,.04)'}}>
                  <img src={item.img} alt={item.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .5s cubic-bezier(.16,1,.3,1)'}}
                    onMouseEnter={e=>e.target.style.transform='scale(1.04)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                </div>
                <div style={{padding:'20px 24px 24px'}}>
                  <div style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:600,color:TX,marginBottom:8}}>{item.title}</div>
                  <div style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:MU,lineHeight:1.7}}>{item.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── NOTICES ── */
function Notices(){
  const [notices,setNotices]=useState([])
  const [hRef,hV]=useReveal()
  useEffect(()=>{
    const load=()=>setNotices(LS.getNot())
    load()
    window.addEventListener('storage',load)
    const t=setInterval(load,2000)
    return ()=>{ window.removeEventListener('storage',load); clearInterval(t) }
  },[])
  return (
    <section id="notices" style={{padding:'90px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal${hV?' on':''}`} style={{textAlign:'center',marginBottom:40}}>
          <Label text="Latest Updates"/>
          <H2>Notice <em style={{color:A,fontStyle:'italic'}}>Center</em></H2>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {notices.map((n,i)=>(
            <Reveal key={n.id} delay={i*90}>
              <div style={{display:'flex',gap:14,alignItems:'flex-start',background:n.pinned?'rgba(16,185,129,.05)':SF,border:`1px solid ${n.pinned?'rgba(16,185,129,.28)':BR}`,borderRadius:16,padding:'18px 20px',backdropFilter:'blur(12px)'}}>
                {n.pinned&&<svg width="14" height="14" viewBox="0 0 24 24" fill={A} stroke="none" style={{flexShrink:0,marginTop:3}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3" fill="#000"/></svg>}
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Lato',sans-serif",fontSize:15,color:TX,lineHeight:1.65}}>{n.text}</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,textTransform:'uppercase',letterSpacing:'0.15em',marginTop:8}}>{n.date}</div>
                </div>
                {n.pinned&&<span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,textTransform:'uppercase',letterSpacing:'0.14em',color:A,background:'rgba(16,185,129,.12)',padding:'3px 9px',borderRadius:999,flexShrink:0}}>Pinned</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── APPOINTMENT ── */
function Appointment(){
  const [form,setForm]=useState({name:'',phone:'',service:'',date:'',message:''})
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [svcs,setSvcs]=useState([])
  const [hRef,hV]=useReveal()
  const [fRef,fV]=useReveal()
  useEffect(()=>{ setSvcs(LS.getSvc().filter(s=>s.visible!==false)) },[])
  const set=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}))
  const submit=()=>{
    if(!form.name||!form.phone||!form.service) return
    setLoading(true)
    setTimeout(()=>{ setLoading(false); setDone(true); setForm({name:'',phone:'',service:'',date:'',message:''})
      setTimeout(()=>setDone(false),5000) },1200)
  }
  return (
    <section id="appointment" style={{padding:'90px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:640,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal${hV?' on':''}`} style={{textAlign:'center',marginBottom:40}}>
          <Label text="Easy Booking"/>
          <H2>Book an <em style={{color:A,fontStyle:'italic'}}>Appointment</em></H2>
        </div>
        <div ref={fRef} className={`reveal${fV?' on':''}`} style={{transitionDelay:'100ms'}}>
          <div className="form-wrap" style={{background:SF,border:`1px solid ${BR}`,borderRadius:26,padding:'40px 36px',backdropFilter:'blur(12px)'}}>
            {done?(
              <div style={{textAlign:'center',padding:'32px 0'}}>
                <div style={{width:64,height:64,borderRadius:'50%',background:'rgba(16,185,129,.12)',border:`2px solid ${A}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:700,color:A,marginBottom:10}}>Appointment Requested</div>
                <div style={{color:MU,fontSize:15,lineHeight:1.6}}>We will confirm via phone within 30 minutes.</div>
              </div>
            ):(
              <>
                {[{k:'name',l:'Full Name *',t:'text',p:'Your full name'},{k:'phone',l:'Phone Number *',t:'tel',p:'+880 1XXX-XXXXXX'}].map(f=>(
                  <div key={f.k} style={{marginBottom:18}}>
                    <label className="lbl">{f.l}</label>
                    <input type={f.t} value={form[f.k]} onChange={set(f.k)} placeholder={f.p} className="inp"/>
                  </div>
                ))}
                <div style={{marginBottom:18}}>
                  <label className="lbl">Select Service *</label>
                  <select value={form.service} onChange={set('service')} className="inp" style={{background:'rgba(5,10,15,.95)'}}>
                    <option value="">Choose a service...</option>
                    {svcs.map(s=><option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:18}}>
                  <label className="lbl">Preferred Date</label>
                  <input type="date" value={form.date} onChange={set('date')} className="inp"/>
                </div>
                <div style={{marginBottom:26}}>
                  <label className="lbl">Message (Optional)</label>
                  <textarea value={form.message} onChange={set('message')} placeholder="Describe your concern..." rows={4} className="inp" style={{resize:'vertical'}}/>
                </div>
                <button className="btn-p" onClick={submit} disabled={loading} style={{width:'100%',padding:'15px',fontSize:15,opacity:loading?.7:1}}>
                  {loading?'Submitting...':'Submit Appointment Request'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT ── */
function Contact(){
  const [hRef,hV]=useReveal()
  const items=[
    {t:'Address',i:'Dhaka, Bangladesh',s:'Exact address on confirmation',ic:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>},
    {t:'Phone',i:'+880 1XXX-XXXXXX',s:'10:00 AM – 9:00 PM',ic:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>},
    {t:'WhatsApp',i:'Chat with us',s:'Quick responses guaranteed',ic:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>},
    {t:'Hours',i:'Sat–Thu: 10AM–9PM',s:'Friday: 5PM – 9PM',ic:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>},
  ]
  return (
    <section id="contact" style={{padding:'90px 32px 56px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal${hV?' on':''}`} style={{textAlign:'center',marginBottom:48}}>
          <Label text="Get In Touch"/>
          <H2>Visit <em style={{color:A,fontStyle:'italic'}}>Us</em> Today</H2>
        </div>
        <div className="contact-grid">
          {items.map((c,i)=>(
            <Reveal key={i} delay={i*80}>
              <div style={{background:SF,border:`1px solid ${BR}`,borderRadius:20,padding:'26px 22px',backdropFilter:'blur(12px)',transition:'border-color .3s,transform .35s cubic-bezier(.16,1,.3,1)',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(16,185,129,.3)';e.currentTarget.style.transform='translateY(-4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BR;e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{width:44,height:44,borderRadius:12,background:'rgba(16,185,129,.1)',display:'flex',alignItems:'center',justifyContent:'center',color:A,marginBottom:14}}>{c.ic}</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,letterSpacing:'0.18em',color:A,textTransform:'uppercase',marginBottom:5}}>{c.t}</div>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:17,fontWeight:600,color:TX,marginBottom:4}}>{c.i}</div>
                <div style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:MU,lineHeight:1.5}}>{c.s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA + FOOTER ── */
function CTA(){
  const [ref,v]=useReveal()
  return (
    <section style={{padding:'72px 32px',position:'relative',zIndex:1,textAlign:'center'}}>
      <div ref={ref} className={`reveal${v?' on':''}`} style={{maxWidth:640,margin:'0 auto'}}>
        <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(36px,5vw,66px)',fontWeight:800,lineHeight:1.05,letterSpacing:'-0.02em',background:'linear-gradient(90deg,#fff 0%,#10b981 50%,#fff 100%)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmer 4s linear infinite',marginBottom:28}}>
          Smile with Confidence
        </h2>
        <button className="btn-p" onClick={()=>document.getElementById('appointment')?.scrollIntoView({behavior:'smooth'})} style={{padding:'14px 44px',fontSize:15}}>
          Book Your Appointment
        </button>
      </div>
    </section>
  )
}
function Footer(){
  return (
    <footer style={{padding:'32px 28px',borderTop:`1px solid ${BR}`,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
        <div style={{display:'flex',alignItems:'center',gap:11}}>
          <div style={{width:32,height:32,background:A,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round"><path d="M12 2C9 2 7 4 7 7c0 1.5.4 2.8 1 3.8L9.5 20h5L16 10.8c.6-1 1-2.3 1-3.8 0-3-2-5-5-5z"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:14,fontWeight:700,color:TX}}>Dr. Rakib's Dental Care</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,color:MU,textTransform:'uppercase',letterSpacing:'0.14em'}}>Dhaka, Bangladesh</div>
          </div>
        </div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2026 Dr. Rakib's Dental Care</div>
        <div style={{display:'flex',gap:18}}>
          {['Facebook','WhatsApp','Instagram'].map(s=>(
            <span key={s} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,color:MU,cursor:'pointer',transition:'color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.color=A} onMouseLeave={e=>e.currentTarget.style.color=MU}>{s}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ── ADMIN PANEL ── */
function Admin(){
  const [auth,setAuth]=useState(LS.isAdmin())
  const [pin,setPin]=useState('')
  const [err,setErr]=useState(false)
  const [tab,setTab]=useState('services')
  const [svcs,setSvcs]=useState(LS.getSvc())
  const [notices,setNotices]=useState(LS.getNot())
  const [editSvc,setEditSvc]=useState(null) // null|'new'|obj
  const [editNot,setEditNot]=useState(null)
  const [sForm,setSForm]=useState({title:'',desc:'',visible:true})
  const [nForm,setNForm]=useState({text:'',pinned:false})
  const [toast,setToast]=useState(null)
  const [del,setDel]=useState(null)
  const [shake,setShake]=useState(false)

  const showToast=(m,t='ok')=>{ setToast({m,t}); setTimeout(()=>setToast(null),3000) }
  const reload=()=>{ setSvcs(LS.getSvc()); setNotices(LS.getNot()) }

  const tryLogin=()=>{
    if(LS.login(pin)){ setAuth(true) } else { setErr(true); setShake(true); setPin(''); setTimeout(()=>setShake(false),500) }
  }

  // Service CRUD
  const saveSvc=()=>{
    if(!sForm.title.trim()||!sForm.desc.trim()){ showToast('Name & description required','err'); return }
    if(editSvc==='new'){
      const all=[...LS.getSvc(),{...sForm,id:Date.now().toString(),order:svcs.length+1}]
      LS.saveSvc(all)
    } else {
      LS.saveSvc(LS.getSvc().map(s=>s.id===editSvc.id?{...s,...sForm}:s))
    }
    reload(); setEditSvc(null); showToast(editSvc==='new'?'Service added':'Service updated')
  }
  const delSvc=(id)=>{ LS.saveSvc(LS.getSvc().filter(s=>s.id!==id)); reload(); setDel(null); showToast('Deleted') }
  const toggleSvc=(id)=>{ LS.saveSvc(LS.getSvc().map(s=>s.id===id?{...s,visible:!s.visible}:s)); reload() }

  // Notice CRUD
  const saveNot=()=>{
    if(!nForm.text.trim()){ showToast('Notice text required','err'); return }
    if(editNot==='new'){
      const d=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})
      LS.saveNot([{...nForm,id:Date.now().toString(),date:d},...LS.getNot()])
    } else {
      LS.saveNot(LS.getNot().map(n=>n.id===editNot.id?{...n,...nForm}:n))
    }
    reload(); setEditNot(null); showToast(editNot==='new'?'Notice published':'Notice updated')
  }
  const delNot=(id)=>{ LS.saveNot(LS.getNot().filter(n=>n.id!==id)); reload(); setDel(null); showToast('Deleted') }
  const pinNot=(id)=>{ LS.saveNot(LS.getNot().map(n=>n.id===id?{...n,pinned:!n.pinned}:n)); reload() }

  const inp2={width:'100%',padding:'11px 14px',background:'rgba(255,255,255,.05)',border:`1px solid ${BR}`,borderRadius:10,color:TX,fontSize:14,fontFamily:"'Lato',sans-serif",outline:'none',transition:'border-color .25s',colorScheme:'dark'}
  const lbl2={fontFamily:"'Space Grotesk',sans-serif",fontSize:10,letterSpacing:'0.16em',color:A,textTransform:'uppercase',display:'block',marginBottom:6}

  if(!auth) return (
    <div style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <style>{STYLES+`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
      <div style={{background:SF,border:`1px solid ${BR}`,borderRadius:26,padding:'48px 40px',width:'100%',maxWidth:380,backdropFilter:'blur(16px)',animation:shake?'shake .4s ease':'none'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:52,height:52,background:A,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',boxShadow:`0 8px 28px rgba(16,185,129,.4)`}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <div style={{fontFamily:"'Newsreader',serif",fontSize:22,fontWeight:700,color:TX}}>Admin Panel</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,letterSpacing:'0.16em',textTransform:'uppercase',marginTop:4}}>Dr. Rakib's Dental Care</div>
        </div>
        <label style={lbl2}>Admin PIN</label>
        <input type="password" value={pin} onChange={e=>{setPin(e.target.value);setErr(false)}} onKeyDown={e=>e.key==='Enter'&&tryLogin()} placeholder="Enter PIN" style={{...inp2,borderColor:err?'#ef4444':BR,fontSize:22,letterSpacing:'0.3em',textAlign:'center',marginBottom:err?6:20}} autoFocus/>
        {err&&<div style={{color:'#ef4444',fontSize:12,marginBottom:14,fontFamily:"'Lato',sans-serif"}}>Incorrect PIN. Try again.</div>}
        <button className="btn-p" onClick={tryLogin} style={{width:'100%',padding:'13px'}}>Sign In</button>
        <p style={{textAlign:'center',marginTop:18,fontSize:12,color:MU}}>Default PIN: <code style={{color:A}}>1234</code></p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:BG,display:'flex',fontFamily:"'Lato',sans-serif"}}>
      <style>{STYLES}</style>
      {/* Sidebar */}
      <aside style={{width:220,background:'rgba(255,255,255,.02)',borderRight:`1px solid ${BR}`,padding:'24px 16px',display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,bottom:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:32,paddingLeft:4}}>
          <div style={{width:32,height:32,background:A,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round"><path d="M12 2C9 2 7 4 7 7c0 1.5.4 2.8 1 3.8L9.5 20h5L16 10.8c.6-1 1-2.3 1-3.8 0-3-2-5-5-5z"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:14,fontWeight:700,color:TX}}>Dr. Rakib's</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:9,color:A,textTransform:'uppercase',letterSpacing:'0.16em'}}>Admin Panel</div>
          </div>
        </div>
        <div style={{flex:1}}>
          {['services','notices'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{width:'100%',textAlign:'left',padding:'10px 12px',marginBottom:4,borderRadius:10,border:'none',cursor:'pointer',background:tab===t?'rgba(16,185,129,.12)':'transparent',color:tab===t?A:MU,fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:tab===t?600:400,transition:'all .2s',textTransform:'capitalize'}}>
              {t}
            </button>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${BR}`,paddingTop:16}}>
          <a href="/" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:8,padding:'9px 12px',borderRadius:10,textDecoration:'none',color:MU,fontFamily:"'Space Grotesk',sans-serif",fontSize:12,marginBottom:6,transition:'color .2s'}}
            onMouseEnter={e=>e.currentTarget.style.color=TX} onMouseLeave={e=>e.currentTarget.style.color=MU}>
            ↗ View Website
          </a>
          <button onClick={()=>{LS.logout();setAuth(false)}} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'9px 12px',borderRadius:10,background:'transparent',border:'none',cursor:'pointer',color:'#ef4444',fontFamily:"'Space Grotesk',sans-serif",fontSize:12}}>
            → Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{marginLeft:220,flex:1,padding:'36px 36px 80px',maxWidth:'calc(100vw - 220px)'}}>

        {/* SERVICES TAB */}
        {tab==='services'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <div>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:700,color:TX}}>Services</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,letterSpacing:'0.14em',textTransform:'uppercase',marginTop:2}}>{svcs.length} services</div>
              </div>
              <button className="btn-p" style={{padding:'9px 18px',fontSize:13}} onClick={()=>{setSForm({title:'',desc:'',visible:true});setEditSvc('new')}}>+ Add Service</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {svcs.map(s=>(
                <div key={s.id} style={{background:SF,border:`1px solid ${BR}`,borderRadius:14,padding:'14px 18px',display:'flex',alignItems:'center',gap:14,opacity:s.visible===false?.5:1,transition:'opacity .2s'}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Newsreader',serif",fontSize:16,fontWeight:600,color:TX}}>{s.title}
                      {s.visible===false&&<span style={{marginLeft:8,fontSize:9,fontFamily:"'Space Grotesk',sans-serif",color:'#f59e0b',background:'rgba(245,158,11,.1)',padding:'2px 7px',borderRadius:5,textTransform:'uppercase',letterSpacing:'0.1em'}}>Hidden</span>}
                    </div>
                    <div style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:MU,marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.desc}</div>
                  </div>
                  <div style={{display:'flex',gap:7,flexShrink:0}}>
                    {[
                      {icon:s.visible!==false?'👁':'🚫',title:s.visible!==false?'Hide':'Show',fn:()=>toggleSvc(s.id)},
                      {icon:'✏️',title:'Edit',fn:()=>{setSForm({title:s.title,desc:s.desc,visible:s.visible!==false});setEditSvc(s)}},
                      {icon:'🗑',title:'Delete',fn:()=>setDel({type:'svc',id:s.id,name:s.title})},
                    ].map(a=>(
                      <button key={a.title} title={a.title} onClick={a.fn} style={{background:'transparent',border:`1px solid ${BR}`,borderRadius:8,padding:'5px 9px',cursor:'pointer',color:a.icon==='🗑'?'#ef4444':MU,fontSize:14,transition:'all .2s'}}>
                        {a.icon}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTICES TAB */}
        {tab==='notices'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <div>
                <div style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:700,color:TX}}>Notices</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,letterSpacing:'0.14em',textTransform:'uppercase',marginTop:2}}>{notices.length} active</div>
              </div>
              <button className="btn-p" style={{padding:'9px 18px',fontSize:13}} onClick={()=>{setNForm({text:'',pinned:false});setEditNot('new')}}>+ New Notice</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {notices.map(n=>(
                <div key={n.id} style={{background:n.pinned?'rgba(16,185,129,.05)':SF,border:`1px solid ${n.pinned?'rgba(16,185,129,.25)':BR}`,borderRadius:14,padding:'16px 18px',display:'flex',alignItems:'flex-start',gap:14}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:TX,lineHeight:1.6,marginBottom:6}}>{n.text}</div>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,color:MU,textTransform:'uppercase',letterSpacing:'0.13em'}}>{n.date}{n.pinned&&<span style={{marginLeft:8,color:A}}>· Pinned</span>}</div>
                  </div>
                  <div style={{display:'flex',gap:7,flexShrink:0}}>
                    {[
                      {icon:n.pinned?'📌':'📍',title:n.pinned?'Unpin':'Pin',fn:()=>pinNot(n.id)},
                      {icon:'✏️',title:'Edit',fn:()=>{setNForm({text:n.text,pinned:n.pinned});setEditNot(n)}},
                      {icon:'🗑',title:'Delete',fn:()=>setDel({type:'not',id:n.id,name:n.date})},
                    ].map(a=>(
                      <button key={a.title} title={a.title} onClick={a.fn} style={{background:'transparent',border:`1px solid ${BR}`,borderRadius:8,padding:'5px 9px',cursor:'pointer',color:a.icon==='🗑'?'#ef4444':MU,fontSize:14}}>
                        {a.icon}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Service modal */}
      {editSvc!==null&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',backdropFilter:'blur(8px)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div style={{background:'#0d1117',border:`1px solid ${BR}`,borderRadius:22,padding:'32px 28px',width:'100%',maxWidth:480,maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:700,color:TX,marginBottom:22}}>{editSvc==='new'?'Add New Service':'Edit Service'}</div>
            <div style={{marginBottom:16}}>
              <label style={lbl2}>Service Name *</label>
              <input type="text" value={sForm.title} onChange={e=>setSForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Teeth Whitening" style={inp2}/>
            </div>
            <div style={{marginBottom:16}}>
              <label style={lbl2}>Description *</label>
              <textarea value={sForm.desc} onChange={e=>setSForm(p=>({...p,desc:e.target.value}))} placeholder="Brief description..." rows={3} style={{...inp2,resize:'vertical'}}/>
            </div>
            <div style={{marginBottom:24,display:'flex',alignItems:'center',gap:12}}>
              <div onClick={()=>setSForm(p=>({...p,visible:!p.visible}))} style={{width:42,height:22,borderRadius:999,background:sForm.visible?A:'rgba(255,255,255,.1)',position:'relative',cursor:'pointer',transition:'background .3s',flexShrink:0}}>
                <div style={{position:'absolute',top:2,left:sForm.visible?22:2,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'left .3s'}}/>
              </div>
              <span style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:MU}}>{sForm.visible?'Visible on website':'Hidden from website'}</span>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setEditSvc(null)} style={{flex:1,padding:'11px',background:'transparent',border:`1px solid ${BR}`,borderRadius:999,color:MU,cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontSize:13}}>Cancel</button>
              <button className="btn-p" onClick={saveSvc} style={{flex:1,padding:'11px'}}>{editSvc==='new'?'Add Service':'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Notice modal */}
      {editNot!==null&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',backdropFilter:'blur(8px)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div style={{background:'#0d1117',border:`1px solid ${BR}`,borderRadius:22,padding:'32px 28px',width:'100%',maxWidth:460}}>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:700,color:TX,marginBottom:22}}>{editNot==='new'?'New Notice':'Edit Notice'}</div>
            <div style={{marginBottom:16}}>
              <label style={lbl2}>Notice Text *</label>
              <textarea value={nForm.text} onChange={e=>setNForm(p=>({...p,text:e.target.value}))} placeholder="Write your announcement..." rows={4} style={{...inp2,resize:'vertical'}}/>
            </div>
            <div style={{marginBottom:24,display:'flex',alignItems:'center',gap:12}}>
              <div onClick={()=>setNForm(p=>({...p,pinned:!p.pinned}))} style={{width:42,height:22,borderRadius:999,background:nForm.pinned?A:'rgba(255,255,255,.1)',position:'relative',cursor:'pointer',transition:'background .3s',flexShrink:0}}>
                <div style={{position:'absolute',top:2,left:nForm.pinned?22:2,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'left .3s'}}/>
              </div>
              <span style={{fontFamily:"'Lato',sans-serif",fontSize:14,color:MU}}>{nForm.pinned?'Pinned to top':'Normal notice'}</span>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setEditNot(null)} style={{flex:1,padding:'11px',background:'transparent',border:`1px solid ${BR}`,borderRadius:999,color:MU,cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontSize:13}}>Cancel</button>
              <button className="btn-p" onClick={saveNot} style={{flex:1,padding:'11px'}}>{editNot==='new'?'Publish':'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {del&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',backdropFilter:'blur(6px)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div style={{background:'#0d1117',border:`1px solid ${BR}`,borderRadius:20,padding:'32px 28px',maxWidth:360,width:'100%',textAlign:'center'}}>
            <div style={{fontFamily:"'Newsreader',serif",fontSize:18,fontWeight:600,color:TX,marginBottom:10}}>Confirm Delete</div>
            <div style={{color:MU,fontSize:14,marginBottom:24,lineHeight:1.6}}>Delete <strong style={{color:TX}}>"{del.name}"</strong>? This cannot be undone.</div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setDel(null)} style={{flex:1,padding:'11px',background:'transparent',border:`1px solid ${BR}`,borderRadius:999,color:MU,cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontSize:13}}>Cancel</button>
              <button onClick={()=>del.type==='svc'?delSvc(del.id):delNot(del.id)} style={{flex:1,padding:'11px',background:'#ef4444',border:'none',borderRadius:999,color:'#fff',cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:700}}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast&&(
        <div style={{position:'fixed',bottom:24,right:24,zIndex:2000,background:toast.t==='ok'?'rgba(16,185,129,.15)':'rgba(239,68,68,.15)',border:`1px solid ${toast.t==='ok'?'rgba(16,185,129,.4)':'#ef4444'}`,borderRadius:12,padding:'12px 18px',backdropFilter:'blur(12px)',color:toast.t==='ok'?A:'#ef4444',fontFamily:"'Lato',sans-serif",fontSize:14,animation:'fadeUp .3s ease'}}>
          {toast.t==='ok'?'✓':' ✕'} {toast.m}
        </div>
      )}
    </div>
  )
}

/* ── Ambient blobs ── */
function Blobs(){
  return (
    <>
      <div style={{position:'fixed',top:'8%',left:'-8%',width:400,height:400,background:'rgba(16,185,129,.055)',filter:'blur(90px)',borderRadius:'50%',animation:'blob 12s ease-in-out infinite',pointerEvents:'none',zIndex:0}}/>
      <div style={{position:'fixed',bottom:'8%',right:'-10%',width:480,height:480,background:'rgba(14,165,233,.03)',filter:'blur(110px)',borderRadius:'50%',animation:'blob 16s ease-in-out infinite reverse',pointerEvents:'none',zIndex:0}}/>
    </>
  )
}

/* ── ROOT ── */
export default function App(){
  const [isAdmin,setIsAdmin]=useState(false)
  useEffect(()=>{
    const check=()=>setIsAdmin(window.location.pathname==='/admin')
    check()
    window.addEventListener('popstate',check)
    return ()=>window.removeEventListener('popstate',check)
  },[])

  if(isAdmin) return (
    <>
      <style>{STYLES}</style>
      <Admin/>
    </>
  )

  return (
    <>
      <style>{STYLES}</style>
      <Blobs/>
      <Navbar/>
      <Ticker/>
      <Hero/>
      <Stats/>
      <About/>
      <Services/>
      <BeforeAfter/>
      <Notices/>
      <Appointment/>
      <Contact/>
      <CTA/>
      <Footer/>
    </>
  )
}
