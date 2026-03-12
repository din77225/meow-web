/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Instagram, Play, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Gravity, MatterBody } from './components/ui/gravity';
import { WavePath } from './components/ui/wave-path';
import videosData from './data/videos.json';
import featuredData from './data/featured.json';

// Physics tags — singular "I am a ___" concept
const gravityTags = [
  { label: 'AI Educator',   bg: '#f4d00a', color: '#1a1625', x: '10%', y: '4%',  angle: -4 },
  { label: 'Meowgic Maker', bg: '#7b54b3', color: '#ffffff', x: '50%', y: '3%',  angle: 3  },
  { label: 'AI Tinkerer',   bg: '#00c4cc', color: '#ffffff', x: '26%', y: '9%',  angle: -6 },
  { label: 'Marketer',      bg: '#1a1625', color: '#ffffff', x: '68%', y: '7%',  angle: 5  },
  { label: 'Designer',      bg: '#ffffff', color: '#7b54b3', x: '15%', y: '17%', angle: -3 },
  { label: 'Dreamer',       bg: '#ede8f5', color: '#7b54b3', x: '58%', y: '14%', angle: 7  },
  { label: 'Builder',       bg: '#ff8c5a', color: '#ffffff', x: '37%', y: '6%',  angle: -5 },
  { label: 'Entrepreneur',  bg: '#1a1625', color: '#f4d00a', x: '76%', y: '18%', angle: 4  },
  { label: 'Storyteller',        bg: '#fef9c3', color: '#1a1625', x: '33%', y: '20%', angle: -2 },
  { label: 'Creative Director',  bg: '#7b54b3', color: '#f4d00a', x: '65%', y: '30%', angle: -3 },
  { label: 'Brand Strategist',   bg: '#e8e4f0', color: '#1a1625', x: '12%', y: '33%', angle: 5  },
];

// TikTok SVG icon (not in lucide-react)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
  </svg>
);

// Videos loaded from src/data/*.json — auto-updated by scripts/fetch-videos.mjs
const featuredVideo = featuredData as { id: string; title: string; tag: string };
const recentVideos  = videosData   as { id: string; title: string; tag: string; duration?: string }[];

export default function App() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [profileHover, setProfileHover] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    // Measure the first card's width + gap to scroll exactly one card at a time
    const card = el.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 284; // 24 = gap-6
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f8f6f3] font-display text-[#1a1625] overflow-x-hidden min-h-screen flex flex-col">

      {/* ── Navigation ── */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-12 border-b border-black/8 bg-[#f8f6f3]/90 backdrop-blur-sm sticky top-0 z-50">
        <a href="#" className="text-2xl font-black tracking-tight text-[#1a1625] hover:text-[#7b54b3] transition-colors duration-200">
          mia meow
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600" aria-label="Main navigation">
          <a className="hover:text-[#7b54b3] transition-colors duration-200" href="#videos">videos</a>
          <a className="hover:text-[#7b54b3] transition-colors duration-200" href="https://www.skool.com/ai-creator-labs" target="_blank" rel="noreferrer">community</a>
          <a className="hover:text-[#7b54b3] transition-colors duration-200" href="https://mia-meow.kit.com/0988b3b4b8" target="_blank" rel="noreferrer">newsletter</a>
        </nav>
        <a
          href="https://www.youtube.com/@miameowai?sub_confirmation=1"
          target="_blank"
          rel="noreferrer"
          className="bg-[#7b54b3] text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-[#6a46a0] transition-colors duration-200 cursor-pointer"
        >
          subscribe
        </a>
      </header>

      <main className="flex-grow">

        {/* ── Hero ── */}
        <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-65px)] bg-[#f8f6f3] border-b border-black/8 overflow-hidden">

          {/* Left: gravity zone on desktop, static on mobile */}
          <div className="relative border-r border-black/8 min-h-[70vh] lg:min-h-auto overflow-hidden">

            {isMobile ? (
              /* ── Mobile: static profile + pill tags ── */
              <div className="flex flex-col items-center justify-center h-full py-10 px-8 gap-6">
                {/* Profile image */}
                <div className="relative w-full max-w-[240px] aspect-[3/4]">
                  <div
                    className="relative w-full h-full overflow-hidden shadow-2xl"
                    style={{ borderRadius: '42% 58% 52% 48% / 46% 48% 52% 54%' }}
                  >
                    <img
                      alt="Mia Meow — colour"
                      src="/profile-color.jpg"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <img
                      alt="Mia Meow"
                      src="/profile-bw.jpg"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                {/* Static pill tags — staggered fade-in */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {gravityTags.map((tag, i) => (
                    <div
                      key={tag.label}
                      className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-md border border-black/5 animate-pill-in"
                      style={{ background: tag.bg, color: tag.color, animationDelay: `${i * 0.06}s` }}
                    >
                      {tag.label}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Desktop: physics / gravity ── */
              <Gravity gravity={{ x: 0, y: 1.1 }} grabCursor className="w-full h-full">

                {/* Profile image — non-physics child, centred in the panel */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none"
                  style={{ zIndex: 5 }}
                >
                  <div className="relative w-full max-w-[300px] lg:max-w-[340px] aspect-[3/4]">
                    <div
                      className="relative w-full h-full overflow-hidden shadow-2xl"
                      style={{
                        borderRadius: '42% 58% 52% 48% / 46% 48% 52% 54%',
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setProfileHover(true)}
                      onMouseLeave={() => setProfileHover(false)}
                    >
                      <img
                        alt="Mia Meow — colour"
                        src="/profile-color.jpg"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <img
                        alt="Mia Meow"
                        src="/profile-bw.jpg"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
                        style={{ opacity: profileHover ? 0 : 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ghost "i am a" text */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none select-none overflow-hidden"
                  style={{ zIndex: 1 }}
                  aria-hidden="true"
                >
                  <span className="text-[4.5rem] lg:text-[6rem] font-black text-black/[0.04] leading-none tracking-tighter lowercase">
                    i am a
                  </span>
                </div>

                {/* Physics tags */}
                {gravityTags.map((tag) => (
                  <MatterBody
                    key={tag.label}
                    x={tag.x}
                    y={tag.y}
                    angle={tag.angle}
                    matterBodyOptions={{ friction: 0.45, restitution: 0.3, density: 0.002 }}
                  >
                    <div
                      className="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-md border border-black/5 select-none"
                      style={{ background: tag.bg, color: tag.color }}
                    >
                      {tag.label}
                    </div>
                  </MatterBody>
                ))}

              </Gravity>
            )}
          </div>

          {/* Right: Typography + CTAs */}
          <div className="relative flex flex-col justify-center p-8 lg:p-16">
            {/* Ghost background word */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
              <span className="block text-[22vw] lg:text-[13rem] font-black text-black/[0.03] leading-none tracking-tighter text-center">MEOW</span>
            </div>

            <div className="relative z-10 max-w-xl">
              {/* Eyebrow */}
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#7b54b3] mb-4">@miameowai</p>

              <h1 className="text-[3.5rem] lg:text-[5.5rem] font-black leading-[0.88] tracking-tighter mb-6">
                <span className="block text-[#1a1625]">AI in</span>
                <span className="block text-[#7b54b3]">practice.</span>
              </h1>

              <p className="text-base lg:text-lg text-slate-600 font-medium mb-8 leading-relaxed max-w-md">
                AI workflows and creative systems for creators who want to put things into practical use. New videos when there is something worth sharing.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.youtube.com/@miameowai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#7b54b3] text-white px-6 py-3 font-semibold rounded-full hover:bg-[#6a46a0] transition-colors duration-200 text-sm cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5" aria-hidden="true" />
                  watch on youtube
                </a>
                <a
                  href="https://www.skool.com/ai-creator-labs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-[#7b54b3] text-[#7b54b3] px-6 py-3 font-semibold rounded-full hover:bg-purple-50 transition-colors duration-200 text-sm cursor-pointer"
                >
                  join community
                </a>
              </div>

              {/* Inline stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-black/8">
                <div>
                  <p className="text-2xl font-black text-[#1a1625]">21K</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-0.5">subscribers</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1a1625]">600+</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-0.5">community</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1a1625]">1M+</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-0.5">total views</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Video ── */}
        <section className="px-6 py-10 lg:px-20 lg:py-12" id="videos">
          <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#7b54b3] mb-4">latest release</p>
          <a
            href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
            target="_blank"
            rel="noreferrer"
            className="block relative overflow-hidden rounded-2xl shadow-xl bg-[#18151d] aspect-video group cursor-pointer"
            aria-label={`Watch: ${featuredVideo.title}`}
          >
            <img
              alt={featuredVideo.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.02] transition-transform duration-700"
              src={`https://i.ytimg.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div
                className="mb-5 w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-[#7b54b3]/80 transition-colors duration-300"
                aria-hidden="true"
              >
                <Play className="w-7 h-7 lg:w-10 lg:h-10 fill-current ml-1" />
              </div>
              <h3 className="text-2xl lg:text-5xl font-black text-white tracking-tighter max-w-3xl leading-tight">
                {featuredVideo.title}
              </h3>
            </div>
          </a>
          </div>
        </section>

        {/* ── Wave divider ── */}
        <div className="flex justify-center px-6 lg:px-20 py-4">
          <WavePath />
        </div>

        {/* ── Recent Uploads ── */}
        <section className="py-12 lg:py-20 overflow-hidden">
          <div className="px-6 lg:px-20 mb-10 flex items-end justify-between">
            <div>
              <h2 className="chunky-text text-4xl lg:text-7xl uppercase text-[#1a1625]">uploads</h2>
              <p className="font-serif italic text-lg text-slate-500 mt-2">recent tutorials and experiments</p>
            </div>
            <div className="flex gap-3 lg:hidden">
              <button
                onClick={() => scroll('left')}
                className="w-11 h-11 rounded-full border border-[#7b54b3]/30 flex items-center justify-center hover:bg-[#7b54b3] hover:text-white hover:border-[#7b54b3] transition-all duration-200 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-11 h-11 rounded-full border border-[#7b54b3]/30 flex items-center justify-center hover:bg-[#7b54b3] hover:text-white hover:border-[#7b54b3] transition-all duration-200 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll on mobile, 2-column grid on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-6 px-6 lg:px-20 overflow-x-auto pb-6 no-scrollbar snap-x snap-proximity
                       lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none"
          >
            {recentVideos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                className="min-w-[260px] lg:min-w-0 snap-start group cursor-pointer block shrink-0 lg:shrink"
              >
                <div className="aspect-video bg-neutral-200 rounded-xl overflow-hidden mb-3 relative">
                  <img
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    loading="lazy"
                  />
                  {v.duration && <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 font-bold rounded">{v.duration}</div>}
                </div>
                <span className="text-[10px] font-bold tracking-wider text-[#7b54b3] uppercase">{v.tag}</span>
                <h4 className="text-sm font-black mt-1 leading-tight uppercase group-hover:text-[#7b54b3] transition-colors duration-200">{v.title}</h4>
              </a>
            ))}
          </div>
        </section>

        {/* ── About / The Method ── */}
        <section className="px-6 py-20 lg:px-20 lg:py-32 bg-[#00c4cc] text-[#032b2e] relative overflow-hidden">
          <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="block text-[20vw] font-black leading-none tracking-tighter p-8"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(3,43,46,0.18) 40%, transparent 40%)',
                backgroundSize: '10px 10px',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >MEOW</span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Text */}
            <div className="space-y-8">
              <h2 className="chunky-text text-5xl lg:text-8xl uppercase leading-none text-[#032b2e]">the<br />method</h2>
              <div className="space-y-5 font-serif text-lg lg:text-xl leading-relaxed text-[#032b2e]/80">
                <p>
                  I share the AI workflows you can put into practice, including the mistakes along the way.
                </p>
                <p>
                  My videos explore how creators can work with AI without getting overwhelmed, one step at a time.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-[#032b2e]/15">
                <div>
                  <p className="text-3xl font-black text-[#032b2e]">21K</p>
                  <p className="text-xs uppercase tracking-widest text-[#7b54b3] font-bold mt-1">subscribers</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#032b2e]">600+</p>
                  <p className="text-xs uppercase tracking-widest text-[#7b54b3] font-bold mt-1">skool members</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#032b2e]">1M+</p>
                  <p className="text-xs uppercase tracking-widest text-[#7b54b3] font-bold mt-1">total views</p>
                </div>
              </div>
            </div>

            {/* Portrait with hover effect */}
            <div className="relative max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <div className="aspect-square rounded-full border-2 border-[#032b2e]/20 p-3">
                <div className="group relative w-full h-full rounded-full overflow-hidden cursor-pointer">
                  <img
                    alt="Mia Meow — colour"
                    src="/profile-color.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <img
                    alt="Mia Meow"
                    src="/profile-bw.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 lg:group-hover:opacity-0"
                  />
                </div>
              </div>
              {/* Yellow badge */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#f4d00a] rounded-full flex items-center justify-center text-[#1a1625] font-black text-center text-xs p-4 rotate-12 select-none leading-tight">
                Always<br />in beta.
              </div>
            </div>

            {/* Floating fun image — appears below the portrait */}
            <div className="flex justify-center lg:justify-start mt-16 lg:mt-0 lg:absolute lg:-bottom-16 lg:right-0">
              <div className="animate-bubble">
                <img
                  src="/profile-fun.jpg"
                  alt="Mia Meow — excited"
                  className="w-48 h-48 rounded-full object-cover object-top border-4 border-[#f4d00a] shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Community + Newsletter ── */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* Community */}
          <div className="bg-white text-[#1a1625] px-6 py-20 lg:px-16 lg:py-28 flex flex-col justify-center border-r border-black/5">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#7b54b3] mb-3">skool community</p>
            <h2 className="chunky-text text-4xl lg:text-6xl mb-6 tracking-tight">the<br/>community</h2>
            <p className="text-base lg:text-lg font-serif text-slate-500 italic max-w-sm mb-8 leading-relaxed">
              600+ creators sharing workflows, resources, and feedback every day. Come build in public.
            </p>
            <a
              href="https://www.skool.com/ai-creator-labs"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1a1625] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-[#2d2540] transition-colors duration-200 w-fit cursor-pointer"
            >
              join on skool
            </a>
          </div>

          {/* Newsletter */}
          <div className="bg-[#f4d00a] text-[#1a1625] px-6 py-20 lg:px-16 lg:py-28 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#1a1625]/60 mb-3">weekly</p>
            <h2 className="chunky-text text-4xl lg:text-6xl mb-6 tracking-tight">newsletter</h2>
            <p className="text-base lg:text-lg font-serif text-[#1a1625]/70 italic max-w-sm mb-8 leading-relaxed">
              Workflow breakdowns, tool notes, and behind-the-scenes experiments delivered to your inbox.
            </p>
            <a
              href="https://mia-meow.kit.com/0988b3b4b8"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1a1625] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-[#2d2540] transition-colors duration-200 w-fit cursor-pointer"
            >
              subscribe free
            </a>
            <p className="text-xs font-medium text-[#1a1625]/50 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#f8f6f3] px-6 py-12 lg:px-20 lg:py-20 border-t border-black/8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-[#1a1625]">Mia Meow</h2>
            <p className="max-w-xs font-serif italic text-slate-500 leading-relaxed text-sm">
              AI workflows and creative systems for creators who want to put things into practical use.
            </p>
            <a
              href="mailto:mia@miameow.ai"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#7b54b3] hover:text-[#6a46a0] transition-colors duration-200 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              mia@miameow.ai
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@miameowai"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#7b54b3]/10 flex items-center justify-center text-[#7b54b3] hover:bg-[#7b54b3] hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/miameowai/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#7b54b3]/10 flex items-center justify-center text-[#7b54b3] hover:bg-[#7b54b3] hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@miameowai"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#7b54b3]/10 flex items-center justify-center text-[#7b54b3] hover:bg-[#7b54b3] hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7b54b3]">explore</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-600">
              <li>
                <a
                  href="https://www.youtube.com/@miameowai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#7b54b3] transition-colors duration-200 cursor-pointer"
                >
                  YouTube Channel
                </a>
              </li>
              <li>
                <a
                  href="https://www.skool.com/ai-creator-labs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#7b54b3] transition-colors duration-200 cursor-pointer"
                >
                  Skool Community
                </a>
              </li>
              <li>
                <a
                  href="https://mia-meow.kit.com/0988b3b4b8"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#7b54b3] transition-colors duration-200 cursor-pointer"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/miameowai/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#7b54b3] transition-colors duration-200 cursor-pointer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@miameowai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#7b54b3] transition-colors duration-200 cursor-pointer"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          <p>© 2026 Mia Meow. All rights reserved.</p>
          <p>AI workflows for creators.</p>
        </div>
      </footer>

    </div>
  );
}
