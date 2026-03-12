/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Instagram, Play, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

// TikTok SVG icon (not in lucide-react)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
  </svg>
);

// Recent video data
const recentVideos = [
  {
    id: '5ifJk-UwCWI',
    duration: '8:55',
    tag: 'Review',
    title: 'The World Wasn\'t Ready for Seedance 2.0',
  },
  {
    id: 'X1oE_vBHnt0',
    duration: '20:04',
    tag: 'Tutorial',
    title: 'Create AI Music Videos for Multiple Singers',
  },
  {
    id: 'HMWFvxeNMVo',
    duration: '9:29',
    tag: 'Guide',
    title: 'Make AI Characters Actually Dance (Kling 2.6)',
  },
];

export default function App() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -480 : 480, behavior: 'smooth' });
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
          href="https://www.youtube.com/@miameowai"
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

          {/* Left: Profile image with B&W / colour hover */}
          <div className="relative flex items-center justify-center p-8 lg:p-12 border-r border-black/8 min-h-[50vh] lg:min-h-auto">
            <div className="relative w-full max-w-[360px] aspect-[3/4]">
              {/* Blob container — acts as the hover group */}
              <div
                className="group relative w-full h-full overflow-hidden shadow-2xl cursor-pointer"
                style={{ borderRadius: '42% 58% 52% 48% / 46% 48% 52% 54%' }}
              >
                {/* Color image — always present underneath */}
                <img
                  alt="Mia Meow — colour"
                  src="/profile-color.jpg"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* B&W image — sits on top, fades out on hover */}
                <img
                  alt="Mia Meow"
                  src="/profile-bw.jpg"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
                />
              </div>

              {/* Yellow badge */}
              <div className="absolute bottom-4 -right-2 lg:right-0 bg-[#f4d00a] text-[#1a1625] font-bold text-xs px-5 py-2 rounded-full -rotate-2 shadow-md select-none">
                AI EDUCATOR
              </div>
            </div>
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
                <span className="block text-[#1a1625]">workflows</span>
                <span className="block text-[#7b54b3]">that ship.</span>
              </h1>

              <p className="text-base lg:text-lg text-slate-600 font-medium mb-8 leading-relaxed max-w-md">
                AI workflows and creative systems for creators who want results, not hype. New tutorials every week on YouTube.
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
                  <p className="text-2xl font-black text-[#1a1625]">160K+</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-0.5">total views</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Video ── */}
        <section className="px-6 py-12 lg:px-20 lg:py-16" id="videos">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#7b54b3] mb-4">latest release</p>
          <a
            href="https://www.youtube.com/watch?v=ZMHIY15k3MY"
            target="_blank"
            rel="noreferrer"
            className="block relative overflow-hidden rounded-2xl shadow-xl bg-[#18151d] aspect-video group cursor-pointer"
            aria-label="Watch: AI That Transfers Your Real Motion to Any Avatar"
          >
            <img
              alt="AI That Transfers Your Real Motion to Any Avatar"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.02] transition-transform duration-700"
              src="https://i.ytimg.com/vi/ZMHIY15k3MY/maxresdefault.jpg"
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
                AI That Transfers Your Real Motion to Any Avatar
              </h3>
              <p className="text-white/60 text-sm mt-3 font-medium">9:04 min</p>
            </div>
          </a>
        </section>

        {/* ── Recent Uploads ── */}
        <section className="py-12 lg:py-20 overflow-hidden border-t border-black/5">
          <div className="px-6 lg:px-20 mb-10 flex items-end justify-between">
            <div>
              <h2 className="chunky-text text-4xl lg:text-7xl uppercase text-[#1a1625]">uploads</h2>
              <p className="font-serif italic text-lg text-slate-500 mt-2">recent tutorials and experiments</p>
            </div>
            <div className="flex gap-3">
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

          <div
            ref={scrollRef}
            className="flex gap-6 px-6 lg:px-20 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
          >
            {recentVideos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                className="min-w-[280px] lg:min-w-[420px] snap-start group cursor-pointer block shrink-0"
              >
                <div className="aspect-video bg-neutral-200 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] px-2 py-0.5 font-bold rounded">{v.duration}</div>
                </div>
                <span className="text-xs font-bold tracking-wider text-[#7b54b3] uppercase">{v.tag}</span>
                <h4 className="text-base lg:text-lg font-black mt-1.5 leading-tight uppercase group-hover:text-[#7b54b3] transition-colors duration-200">{v.title}</h4>
              </a>
            ))}
          </div>
        </section>

        {/* ── About / The Method ── */}
        <section className="px-6 py-20 lg:px-20 lg:py-32 bg-[#18151d] text-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span className="block text-[20vw] font-black text-white/[0.03] leading-none tracking-tighter p-8">MEOW</span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Text */}
            <div className="space-y-8">
              <h2 className="chunky-text text-5xl lg:text-8xl uppercase leading-none">the<br />method</h2>
              <div className="space-y-5 font-serif text-lg lg:text-xl leading-relaxed text-slate-300">
                <p>
                  I build AI workflows that actually work, and share every mistake along the way.
                </p>
                <p>
                  My videos explore how creators can use tools like Midjourney, HeyGen, and Kling without getting overwhelmed, focusing on the process, not the hype.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-black">21K</p>
                  <p className="text-xs uppercase tracking-widest text-[#00c4cc] font-bold mt-1">subscribers</p>
                </div>
                <div>
                  <p className="text-3xl font-black">600+</p>
                  <p className="text-xs uppercase tracking-widest text-[#00c4cc] font-bold mt-1">skool members</p>
                </div>
                <div>
                  <p className="text-3xl font-black">160K+</p>
                  <p className="text-xs uppercase tracking-widest text-[#00c4cc] font-bold mt-1">total views</p>
                </div>
              </div>
            </div>

            {/* Portrait with hover effect */}
            <div className="relative max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <div className="aspect-square rounded-full border border-[#7b54b3]/40 p-3">
                <div className="group relative w-full h-full rounded-full overflow-hidden cursor-pointer">
                  {/* Color image underneath */}
                  <img
                    alt="Mia Meow — colour"
                    src="/profile-color.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* B&W image on top, fades on hover */}
                  <img
                    alt="Mia Meow"
                    src="/profile-bw.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
                  />
                </div>
              </div>
              {/* Yellow badge */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#f4d00a] rounded-full flex items-center justify-center text-[#1a1625] font-black text-center text-xs p-4 rotate-12 select-none leading-tight">
                EST.<br />2023
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
              AI workflows and creative systems for creators. New tutorials every week on YouTube.
            </p>
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
          <p>© 2025 Mia Meow. All rights reserved.</p>
          <p>AI workflows for creators.</p>
        </div>
      </footer>

    </div>
  );
}
