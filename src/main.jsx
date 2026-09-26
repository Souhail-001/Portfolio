import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Download, Github, Linkedin, Mail, Sun, Moon, MapPin, Menu, X, Code2, Braces, Check, ExternalLink } from 'lucide-react';
import projects from './data/projects.json';
import { profile, experience } from './data/profile';
import ParticleBackground from './ParticleBackground';
import './styles.css';

const navItems = ['About', 'Projects', 'Experience', 'Contact'];
const resumeUrl = `${import.meta.env.BASE_URL}Resume.pdf`;
function Socials() { return <div className="socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19}/></a></div>; }
function ProjectCard({ project: p }) {
 return <article className={`project-card reveal ${p.featured?'featured':''}`}>
  <div className={`project-preview preview-${p.id}`}>
   {p.image ? <img src={p.image} alt={p.imageAlt} loading="lazy" width="900" height="500"/> : <>
    <div className="preview-top"><span>{p.previewName || p.title}<b> {p.previewMark}</b></span><span className="concept-label">{p.previewKind || 'PROJECT OVERVIEW'}</span></div>
    <div className="preview-text"><p>{p.previewLabel}</p><h3>{p.previewTitle}</h3></div>
    <div className="preview-bottom">{p.previewSteps?.map((step,i)=><React.Fragment key={step}>
     {i>0 && p.previewConnector && <ArrowRight size={16}/>}
     <span>{step}{p.previewEndArrow && i===p.previewSteps.length-1 && <ArrowUpRight size={14}/>}</span>
    </React.Fragment>)}</div>
   </>}
  </div>
  <div className="project-content">
   <p className="eyebrow">{p.category}</p>
   <div className="project-title"><h3>{p.title}</h3><span>{p.number}</span></div>
   {p.subtitle && <p className="project-subtitle">{p.subtitle}</p>}
   {p.status && <span className="project-status">{p.status}</span>}
   <p>{p.description}</p>
   {p.details && <p className="project-detail">{p.details}</p>}
   {p.contribution && <p className="project-detail"><strong>My contribution: </strong>{p.contribution}</p>}
   {p.progress && <p className="project-detail"><strong>Current progress: </strong>{p.progress}</p>}
   {p.plannedCapabilities && <p className="project-detail"><strong>Planned capabilities: </strong>{p.plannedCapabilities}</p>}
   {p.techLabel && <p className="project-detail"><strong>{p.techLabel}</strong></p>}
   <div className="badges">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
   {(p.github || p.demo || p.attribution) && <div className="project-links">
    {p.github && <a href={p.github} target="_blank" rel="noreferrer"><Github size={16}/> Source code <ArrowUpRight size={14}/></a>}
    {p.attribution && <span>{p.attribution}</span>}
    {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={14}/></a>}
   </div>}
  </div>
 </article>;
}
function App() {
 const [theme,setTheme] = useState(document.documentElement.dataset.theme || 'dark');
 const [menu,setMenu] = useState(false);
 const [draft,setDraft] = useState(false);
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio-theme',theme)}catch{}},[theme]);
 // Reveal once; reduced-motion users see content without animation.
 useEffect(()=>{if(!('IntersectionObserver' in window)) return;const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('observe');observer.observe(el)});return()=>observer.disconnect()},[]);
 function contact(e){e.preventDefault();const data=new FormData(e.currentTarget);const subject=encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);const body=encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);window.location.href=`mailto:${profile.email}?subject=${subject}&body=${body}`;setDraft(true)}
 return <>
 <ParticleBackground theme={theme}/>
 <a className="skip-link" href="#main">Skip to content</a>
 <header className="header"><div className="container nav"><a className="wordmark" href="#home" aria-label="Souhail Mbarki home">souhail<span>.</span></a><nav aria-label="Main navigation" className={menu?'nav-links open':'nav-links'}>{navItems.map(item=><a key={item} href={`#${item.toLowerCase()}`} onClick={()=>setMenu(false)}>{item}</a>)}</nav><div className="nav-actions"><button className="icon-button" aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><a className="nav-resume" href={resumeUrl} download>Resume <Download size={14}/></a><button className="icon-button mobile-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></div></header>
 <main id="main">
 <section id="home" className="hero container"><div className="hero-main"><div className="availability"><span/> OPEN TO AI / ML INTERNSHIPS</div><p className="intro">Hi, I’m Souhail Mbarki</p><h1>Turning complex<br/>problems into<br/><span>intelligent systems.</span></h1><p className="hero-copy">AI Engineer in the making. I build with LLMs, explore machine learning, and turn ideas into things that work.</p><div className="hero-buttons"><a className="button primary" href="#projects">View my work <ArrowUpRight size={18}/></a><a className="button secondary" href="#contact">Let’s connect <ArrowRight size={17}/></a></div><a className="hero-download text-link" href={resumeUrl} download><Download size={14}/> Download resume</a><div className="hero-meta"><span><MapPin size={14}/>{profile.location}</span><span className="meta-divider"/><Socials/></div></div><aside className="hero-aside" aria-label="Engineering interests"><div className="aside-top"><Braces size={23}/><span>ENGINEER’S NOTEBOOK <span className="edition">/ 001</span></span></div><div className="code-note"><p><span className="code-muted">01</span> <span className="code-blue">class</span> AIEngineer:</p><p><span className="code-muted">02</span> &nbsp; curiosity = <span className="code-green">"always on"</span></p><p><span className="code-muted">03</span> &nbsp; focus = [</p><p><span className="code-muted">04</span> &nbsp; &nbsp; <span className="code-green">"language models"</span>,</p><p><span className="code-muted">05</span> &nbsp; &nbsp; <span className="code-green">"intelligent agents"</span>,</p><p><span className="code-muted">06</span> &nbsp; &nbsp; <span className="code-green">"real-world impact"</span></p><p><span className="code-muted">07</span> &nbsp; ]</p></div><div className="notebook-bottom"><span>THINK. BUILD. ITERATE.</span><Code2 size={19}/></div><div className="aside-caption"><span>Built on curiosity.<br/>Driven by problem-solving.</span><span>↳</span></div></aside><a className="scroll-cue" href="#projects">SCROLL TO EXPLORE <span>↓</span></a></section>
 <div className="expertise-bar"><div className="container flex flex-wrap items-center justify-between gap-5"><span>IDEAS → APPLIED AI</span><p>LLM Engineering</p><i/> <p>Retrieval-Augmented Generation</p><i/><p>Agentic AI</p><i/><p>Machine Learning</p></div></div>
 <section id="projects" className="section container"><div className="section-heading reveal"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Learning by building.</h2></div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={16}/></a></div><div className="projects-grid">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div></section>
 <section id="about" className="about-section"><div className="container section"><div className="section-heading reveal"><div><p className="eyebrow">02 / ABOUT ME</p><h2>A builder’s mindset.<br/>A problem-solver’s curiosity.</h2></div></div><div className="about-grid"><div className="portrait reveal">{profile.photo?<img src={profile.photo} alt="Souhail Mbarki" loading="lazy" width="500" height="550"/>:<div className="portrait-placeholder"><span className="portrait-label">THE PERSON BEHIND THE CODE</span><span className="monogram">SM<span>.</span></span><div><strong>Souhail Mbarki</strong><span>AI Engineer · Tunis, Tunisia</span></div></div>}</div><div className="about-copy reveal"><p>{profile.bio}</p><p>Competitive programming taught me to break complex problems into clear, testable steps. I bring that same approach to building AI systems.</p><div className="achievements"><div><strong>18+</strong><span>Onsite programming contests</span></div><div><strong>2×</strong><span>TCPC finalist</span></div><div><strong>5th</strong><span>In Tunisia · ODC 2025</span></div></div><a className="text-link" href={profile.codeforces} target="_blank" rel="noreferrer">My competitive programming journey <ArrowUpRight size={16}/></a></div></div><div className="skills-grid reveal">{Object.entries(profile.skills).map(([group,skills])=><div key={group}><h3>{group}</h3><div className="badges">{skills.map(s=><span key={s}>{s}</span>)}</div></div>)}</div></div></section>
 <section id="experience" className="section container"><div className="section-heading reveal"><div><p className="eyebrow">03 / THE JOURNEY</p><h2>Building my foundations.</h2></div><a className="text-link" href={resumeUrl} download>Download resume <Download size={16}/></a></div><div className="timeline">{experience.map((e,i)=><article className="timeline-item reveal" key={i}><div className="timeline-date"><span>{e.date}</span><p>{e.type}</p></div><div className="timeline-body"><h3>{e.title}</h3><p className="organization">{e.organization}</p>{e.points.length>0&&<ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul>}</div></article>)}</div></section>
 <section id="contact" className="contact-section"><div className="container section contact-grid"><div className="reveal"><p className="eyebrow">04 / WHAT’S NEXT?</p><h2>Let’s build<br/>something <span>useful.</span></h2><p className="contact-copy">Have an AI/ML internship opportunity, a project idea, or just want to say hello? I’d love to hear from you.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={18}/></a><Socials/><a className="phone-link" href={`tel:${profile.phone}`}>+216 52 864 293</a></div><form className="contact-form reveal" onSubmit={contact}><div className="form-row"><label>Your name<input name="name" required autoComplete="name" placeholder="Ada Lovelace" maxLength={100}/></label><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="ada@example.com" maxLength={200}/></label></div><label>What’s on your mind?<textarea name="message" required rows={5} placeholder="Tell me a little about your opportunity or idea…" maxLength={5000}/></label><div className="form-bottom"><p>Opens a draft in your email app.</p><button className="button primary" type="submit">Let’s talk <ArrowUpRight size={18}/></button></div>{draft&&<p className="form-status" role="status"><Check size={16}/> Email draft requested. If no app opened, use the email link to contact me directly.</p>}</form></div></section>
 </main><footer className="container footer"><a href="#home" className="wordmark">souhail<span>.</span></a><p>© {new Date().getFullYear()} Souhail Mbarki</p><Socials/><a href="#home" className="back-top">Back to top ↑</a></footer>
 </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
