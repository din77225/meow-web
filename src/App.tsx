/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Video, ArrowRight, Play, ChevronLeft, ChevronRight, Globe, Camera, PlayCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-[#f8f9fa] font-display text-slate-900 overflow-x-hidden min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-6 lg:px-12 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-[#7d56b3] flex items-center justify-center rounded-full text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-black tracking-tight">mia meow</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm">
          <a className="hover:text-[#7d56b3] transition-colors" href="#">videos</a>
          <a className="hover:text-[#7d56b3] transition-colors" href="#">tools</a>
          <a className="border border-dashed border-blue-400 px-3 py-1 hover:bg-blue-50 transition-colors text-slate-800" href="#">community</a>
        </nav>
        <button className="bg-[#7d56b3] text-white px-6 py-2 text-sm font-bold rounded-lg hover:opacity-90 transition-all">
          subscribe
        </button>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] bg-[#f8f9fa] border-b border-black/5">
          {/* Left Side - Image */}
          <div className="relative flex items-center justify-center p-12 lg:p-24 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] border-r border-black/5">
            <div className="relative w-full max-w-md aspect-square">
              <img alt="Mia Meow Profile" className="w-full h-full object-cover grayscale rounded-xl shadow-2xl" src="/profile.jpg" />
              {/* Yellow Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#fbbf24] text-black font-black text-sm leading-tight px-6 py-4 rounded-xl -rotate-[10deg] shadow-xl border-4 border-white">
                CREATIVE<br/>DIRECTOR
              </div>
            </div>
          </div>

          {/* Right Side - Typography */}
          <div className="relative flex flex-col justify-center p-12 lg:p-24 overflow-hidden bg-[#f8f9fa]">
            {/* Background Text */}
            <div className="absolute top-12 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
              <span className="text-[20vw] lg:text-[14rem] font-black text-black/[0.04] leading-none tracking-tighter">MEOW</span>
            </div>

            <div className="relative z-10 max-w-xl">
              <h1 className="text-[5rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter mb-8">
                <span className="text-[#0f172a] block">digital</span>
                <span className="text-[#7d56b3] block italic">magic</span>
              </h1>
              <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-md">
                Curating experiences at the intersection of avant-garde design and digital storytelling.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-[#2dd4bf] text-[#0f172a] px-8 py-4 font-bold rounded-lg hover:bg-teal-300 transition-colors uppercase tracking-wide">
                  <PlayCircle className="w-5 h-5" /> WATCH NOW
                </button>
                <button className="border-2 border-[#7d56b3] text-[#7d56b3] px-8 py-4 font-bold rounded-lg hover:bg-purple-50 transition-colors uppercase tracking-wide bg-transparent">
                  VIEW PROJECTS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Video Hero */}
        <section className="px-6 py-12 lg:px-20">
          <a href="https://www.youtube.com/watch?v=ZMHIY15k3MY" target="_blank" rel="noreferrer" className="block relative overflow-hidden rounded-xl shadow-2xl bg-neutral-900 aspect-video group">
            <img alt="Featured Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" src="https://i.ytimg.com/vi/ZMHIY15k3MY/maxresdefault.jpg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-6">
                <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-primary transition-all duration-300">
                  <Play className="w-10 h-10 lg:w-16 lg:h-16 fill-current ml-2" />
                </div>
              </div>
              <span className="font-serif italic text-white/80 text-lg lg:text-2xl mb-2">Latest Release</span>
              <h3 className="text-3xl lg:text-6xl font-black text-white uppercase tracking-tighter max-w-4xl leading-none">
                AI That Transfers Your Real Motion to Any Avatar
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 flex items-end justify-between text-white/70">
              <div className="flex gap-4 items-center">
                <span className="text-xs font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded">9:04 MIN</span>
                <span className="text-xs font-bold tracking-widest uppercase">5 Use Cases</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1 w-24 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3"></div>
                </div>
              </div>
            </div>
          </a>
        </section>

        {/* Horizontal Scroll Recent Content */}
        <section className="py-12 lg:py-24 overflow-hidden">
          <div className="px-6 lg:px-20 mb-12 flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="chunky-text text-5xl lg:text-8xl uppercase">UPLOADS</h2>
              <p className="font-serif italic text-xl opacity-60">The latest tutorials and experiments</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex gap-8 px-6 lg:px-20 overflow-x-auto pb-8 no-scrollbar snap-x">
            {/* Video Card 1 */}
            <a href="https://www.youtube.com/watch?v=5ifJk-UwCWI" target="_blank" rel="noreferrer" className="min-w-[300px] lg:min-w-[450px] snap-start group cursor-pointer block">
              <div className="aspect-[16/10] bg-neutral-100 rounded-lg overflow-hidden mb-6 relative">
                <img alt="Video 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://i.ytimg.com/vi/5ifJk-UwCWI/hqdefault.jpg" />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 font-bold rounded uppercase">8:55</div>
              </div>
              <span className="text-xs font-bold tracking-tighter text-primary uppercase">Review</span>
              <h4 className="text-xl font-black mt-2 leading-tight uppercase group-hover:text-primary transition-colors">The World Wasn’t Ready for Seedance 2.0</h4>
            </a>
            {/* Video Card 2 */}
            <a href="https://www.youtube.com/watch?v=X1oE_vBHnt0" target="_blank" rel="noreferrer" className="min-w-[300px] lg:min-w-[450px] snap-start group cursor-pointer block">
              <div className="aspect-[16/10] bg-neutral-100 rounded-lg overflow-hidden mb-6 relative">
                <img alt="Video 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://i.ytimg.com/vi/X1oE_vBHnt0/hqdefault.jpg" />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 font-bold rounded uppercase">20:04</div>
              </div>
              <span className="text-xs font-bold tracking-tighter text-primary uppercase">Tutorial</span>
              <h4 className="text-xl font-black mt-2 leading-tight uppercase group-hover:text-primary transition-colors">Create AI Music Videos for Multiple Singers</h4>
            </a>
            {/* Video Card 3 */}
            <a href="https://www.youtube.com/watch?v=HMWFvxeNMVo" target="_blank" rel="noreferrer" className="min-w-[300px] lg:min-w-[450px] snap-start group cursor-pointer block">
              <div className="aspect-[16/10] bg-neutral-100 rounded-lg overflow-hidden mb-6 relative">
                <img alt="Video 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://i.ytimg.com/vi/HMWFvxeNMVo/hqdefault.jpg" />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 font-bold rounded uppercase">9:29</div>
              </div>
              <span className="text-xs font-bold tracking-tighter text-primary uppercase">Guide</span>
              <h4 className="text-xl font-black mt-2 leading-tight uppercase group-hover:text-primary transition-colors">Make AI Characters Actually Dance (Kling 2.6)</h4>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="px-6 py-20 lg:px-20 lg:py-40 bg-background-dark text-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <span className="chunky-text text-[25vw] leading-none uppercase">MEOW</span>
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="chunky-text text-6xl lg:text-9xl uppercase leading-none">THE<br />METHOD</h2>
              <div className="space-y-6 font-serif text-xl lg:text-2xl leading-relaxed opacity-80">
                <p>I'm obsessed with pushing pixels and making AI do backflips. It's not just about the prompt; it's about the vibe.</p>
                <p>My work explores the wild intersection of cutting-edge tech and raw, unfiltered creativity. Let's make some magic and break the internet while we're at it!</p>
              </div>
              <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-black">21K</p>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Subscribers</p>
                </div>
                <div>
                  <p className="text-3xl font-black">600+</p>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Skool Members</p>
                </div>
                <div>
                  <p className="text-3xl font-black">160K+</p>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Total Views</p>
                </div>
              </div>
            </div>
            <div className="aspect-square rounded-full border border-primary/30 p-4 relative max-w-md mx-auto lg:ml-auto lg:mr-0">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img alt="Mia Profile Dark" className="w-full h-full object-cover" src="/profile.jpg" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-yellow rounded-full flex items-center justify-center text-slate-900 font-black text-center text-xs p-4 rotate-12">
                ESTABLISHED <br /> MMXXIII
              </div>
            </div>
          </div>
        </section>

        {/* Community & Newsletter Section */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* Community Side */}
          <div className="bg-white text-slate-900 px-6 py-20 lg:px-20 lg:py-32 flex flex-col justify-center">
            <h2 className="chunky-text text-5xl lg:text-7xl mb-6 tracking-tight">the community</h2>
            <p className="text-lg lg:text-xl font-serif opacity-80 max-w-md mb-10">
              Join over 600+ creators sharing magic, resources, and feedback every single day.
            </p>
            
            <div className="flex items-center mb-10">
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Member" />
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Member" />
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Member" />
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="Member" />
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">
                  +600
                </div>
              </div>
            </div>

            <a href="https://www.skool.com/ai-creator-labs-2150" target="_blank" rel="noreferrer" className="bg-slate-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors w-fit">
              JOIN THE SKOOL
            </a>
          </div>

          {/* Newsletter Side */}
          <div className="bg-[#facc15] text-slate-900 px-6 py-20 lg:px-20 lg:py-32 flex flex-col justify-center">
            <h2 className="chunky-text text-5xl lg:text-7xl mb-6 tracking-tight">newsletter</h2>
            <p className="text-lg lg:text-xl font-serif opacity-90 max-w-md mb-10">
              Weekly design inspiration, tool recommendations, and behind-the-scenes magic delivered straight to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 mb-4" action="https://miameow.ai#newsletter" method="GET" target="_blank">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 bg-white/50 border-none rounded-lg px-6 py-4 text-slate-900 placeholder:text-slate-600 focus:ring-2 focus:ring-slate-900 outline-none"
              />
              <button type="submit" className="bg-slate-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
                SEND MAGIC
              </button>
            </form>
            <p className="text-xs font-medium opacity-70">No spam, just pure creativity. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 lg:px-20 lg:py-24 border-t border-primary/10">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Mia Meow</h2>
            <p className="max-w-xs font-serif opacity-60">Pushing the boundaries of what editorial content can be in the age of rapid media consumption.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                <Globe className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                <Camera className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                <PlayCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Links</h4>
            <ul className="space-y-4 text-sm font-medium uppercase tracking-tighter">
              <li><a className="hover:underline" href="#">Collaborations</a></li>
              <li><a className="hover:underline" href="#">Press Kit</a></li>
              <li><a className="hover:underline" href="#">Equipment</a></li>
              <li><a className="hover:underline" href="#">Privacy</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Newsletter</h4>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input className="bg-primary/5 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Your email address" type="email" />
              <button className="bg-primary text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:shadow-lg transition-all cursor-pointer">Join the circle</button>
            </form>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <p>© 2024 Mia Meow Creative Studio. All rights reserved.</p>
          <p>Designed for the digital avant-garde.</p>
        </div>
      </footer>
    </div>
  );
}

