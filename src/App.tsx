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
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden min-h-screen flex flex-col">
      {/* Abstract Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-blob"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-teal/10 blur-blob"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-accent-yellow/10 blur-blob"></div>
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-6 lg:px-20 border-b border-primary/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary flex items-center justify-center rounded-full text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter">Mia Meow</h2>
        </div>
        <nav className="hidden md:flex items-center gap-12 font-medium text-sm uppercase tracking-widest">
          <a className="hover:text-primary transition-colors" href="#">Portfolio</a>
          <a className="hover:text-primary transition-colors" href="#">Journal</a>
          <a className="hover:text-primary transition-colors" href="#">Shop</a>
          <a className="hover:text-primary transition-colors" href="#">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <a className="p-2 hover:bg-primary/10 rounded-full transition-colors" href="#">
            <Video className="w-5 h-5" />
          </a>
          <button className="bg-primary text-white px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-lg transition-all">
            Subscribe
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 py-12 lg:px-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="font-serif italic text-2xl lg:text-3xl text-primary block">AI Content Creator</span>
              <h1 className="chunky-text text-[15vw] lg:text-[8rem] uppercase leading-none">
                MIA MEOW
              </h1>
            </div>
            <p className="text-lg lg:text-xl max-w-2xl leading-relaxed font-serif opacity-80">
              Leveraging the newest AI tools for content creation, marketing, and business. Sharing experiments, wins, and lessons learned in the AI world.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://www.youtube.com/@miameowai" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                Explore Channel <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/watch?v=ZMHIY15k3MY" target="_blank" rel="noreferrer" className="flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary/5 transition-colors">
                Latest Video
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-sm lg:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent-teal/30 to-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative aspect-square bg-neutral-200 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                {/* Image of a woman looking to the side with pencil effect */}
                <img alt="Mia Meow Profile" className="w-full h-full object-cover theme-filter transition-all duration-700" src="/profile.jpg" />
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

