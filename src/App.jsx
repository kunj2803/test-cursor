import { useCallback, useEffect, useRef, useState } from 'react';
import { Aperture, ArrowDown, ArrowRight, Bike, Camera, Code2, Github, Instagram, Linkedin, Moon, Music2, Plane, Play, Sparkles, Sun, Youtube } from 'lucide-react';

const VIDEO_SRC = '/videos/avatar-turntable.mp4';
const PORTRAIT = '/avatar-portrait.png';
const SCRUB_FPS = 60;

function NeonIntro({ onFinish }) {
  return <div className="intro-screen" role="status" aria-label="Intro animation">
    <div className="intro-stars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="energy-wave wave-a"/><div className="energy-wave wave-b"/><div className="energy-wave wave-c"/>
    <div className="intro-core"><span className="intro-ring ring-a"/><span className="intro-ring ring-b"/><span className="intro-ring ring-c"/><span className="intro-dot"/><span className="intro-logo">Kunj.exe <i/></span></div>
    <div className="intro-progress"><span/></div>
    <button className="skip-intro" onClick={onFinish}>Skip intro <span>↗</span></button>
  </div>;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [introKey, setIntroKey] = useState(0);
  const [lightMode, setLightMode] = useState(false);
  const [heroVideo, setHeroVideo] = useState(true);
  const heroVideoRef = useRef(null);
  const heroStageRef = useRef(null);
  const heroDurationRef = useRef(0);
  const heroTargetRef = useRef(0);
  const heroRafRef = useRef(0);

  useEffect(() => {
    if (!showIntro) return undefined;
    const timer = window.setTimeout(() => setShowIntro(false), 5100);
    return () => window.clearTimeout(timer);
  }, [showIntro, introKey]);
  useEffect(() => () => cancelAnimationFrame(heroRafRef.current), []);
  useEffect(() => { heroVideoRef.current?.pause(); }, []);

  const finishIntro = () => setShowIntro(false);
  const replayIntro = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIntroKey((value) => value + 1);
    setShowIntro(true);
  };
  const seekHeroTowardTarget = useCallback(() => {
    const video = heroVideoRef.current;
    if (!video) { heroRafRef.current = 0; return; }
    const target = heroTargetRef.current;
    if (Math.abs(target - video.currentTime) > 0.01) video.currentTime = target;
    heroRafRef.current = 0;
  }, []);
  const scrubHeroAt = (event) => {
    const stage = heroStageRef.current;
    const video = heroVideoRef.current;
    const duration = heroDurationRef.current;
    if (!stage || !video || !duration) return;
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const progress = (Math.atan2(y, x) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
    heroTargetRef.current = Math.round(progress * duration * SCRUB_FPS) / SCRUB_FPS;
    if (!heroRafRef.current) heroRafRef.current = requestAnimationFrame(seekHeroTowardTarget);
  };  const interests = [
    { icon: Code2, title: 'Developer', detail: 'Building cool stuff' },
    { icon: Music2, title: 'Dance', detail: 'Feel the rhythm' },
    { icon: Bike, title: 'Biking', detail: 'Two wheels freedom' },
    { icon: Plane, title: 'Travel', detail: 'Explore the world' },
    { icon: Camera, title: 'Photography', detail: 'Moments & stories' },
  ];

  return <div className={`portfolio ${lightMode ? 'light-mode' : ''}`}>
    {showIntro && <NeonIntro key={introKey} onFinish={finishIntro}/>}
    <header className="portfolio-nav">
      <a className="wordmark" href="#home" aria-label="Kunj.exe home"><span>Kunj.exe</span><i/></a>
      <nav className="main-nav"><a className="active" href="#home">Home</a><a href="#about">About</a><a href="#gallery">Work</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></nav>
      <div className="nav-actions"><button className="theme-switch" onClick={() => setLightMode(!lightMode)} aria-label="Toggle theme"><span className={!lightMode ? 'selected' : ''}><Sun size={15}/></span><span className={lightMode ? 'selected' : ''}><Moon size={14}/></span></button><a className="connect-button" href="#contact">Let’s Connect <ArrowRight size={16}/></a></div>
    </header>

    <main>
      <section className="hero-section" id="home">
        <div className="hero-art" ref={heroStageRef} onPointerMove={(event) => { if (event.buttons === 1 || event.pointerType === 'mouse') scrubHeroAt(event); }} onPointerDown={(event) => { heroStageRef.current?.setPointerCapture?.(event.pointerId); scrubHeroAt(event); }}><img src={PORTRAIT} alt="Kunj avatar portrait" className={!heroVideo ? 'portrait-hidden' : ''}/>{heroVideo && <video ref={heroVideoRef} muted playsInline preload="auto" poster={PORTRAIT} src={VIDEO_SRC} onLoadedMetadata={(event) => { event.currentTarget.pause(); heroDurationRef.current = event.currentTarget.duration || 0; }} onError={() => setHeroVideo(false)}/>}<div className="hero-art-shade"/></div>
        <div className="hero-copy" id="about">
          <div className="role-pill"><i/> AI Developer · Creator</div>
          <h1>Hi, I’m<br/><span>Kunj</span><b className="name-spark">✳</b></h1>
          <p>I build intelligent products and take on freelance development work, while finding inspiration in dance, bike rides, and travel.</p>
          <div className="hero-ctas"><a className="work-button" href="#gallery">View My Work <ArrowRight size={16}/></a><a className="hero-connect-button" href="#contact">Let&#39;s Connect <ArrowRight size={15}/></a></div>
          <div className="social-links"><a href="#contact" aria-label="GitHub"><Github size={17}/></a><a href="#contact" aria-label="Instagram"><Instagram size={17}/></a><a href="#contact" aria-label="YouTube"><Youtube size={17}/></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={17}/></a></div>
        </div>
        <div className="interest-list" id="gallery">{interests.map(({icon: Icon,title,detail},i)=><a className="interest-card" href="#gallery" key={title} style={{'--card-order':i}}><span className="interest-icon"><Icon size={19}/></span><span className="interest-text"><b>{title}</b><small>{detail}</small></span><ArrowRight className="interest-arrow" size={15}/></a>)}</div>
        <a className="scroll-cue" href="#gallery"><span/><small>Scroll to explore</small><ArrowDown size={14}/></a>
        <div className="hero-orbit orbit-left"/><div className="hero-orbit orbit-right"/>
      </section>
<section className="contact-section" id="contact"><span className="section-kicker">HAVE A GOOD IDEA?</span><h2>Let’s make something<br/><em>that moves.</em></h2><button onClick={replayIntro}>Replay the intro <ArrowRight size={16}/></button></section>
    </main>
    <footer className="portfolio-footer"><a className="wordmark" href="#home">Kunj.exe<i/></a><span>DESIGNED TO MOVE <b>✳</b></span><span>© 2025 KUNJ</span></footer>
  </div>;
}
