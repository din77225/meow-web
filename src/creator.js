const menu=document.querySelector('.menu'),nav=document.querySelector('#nav-links');
function closeMenu(){if(!menu)return;menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.querySelector('span').textContent='+';}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.querySelector('span').textContent=open?'−':'+';});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeMenu();});
matchMedia('(min-width:601px)').addEventListener('change',closeMenu);
// Set this to false to hide the upcoming course and its navigation link.
const courseEnabled=true;
document.querySelectorAll('[data-course]').forEach(el=>el.hidden=!courseEnabled);
const rail=document.querySelector('.video-rail');
if(rail){
 const previous=document.querySelector('.rail-prev'),next=document.querySelector('.rail-next'),status=document.querySelector('.rail-status');
 const cards=[...rail.querySelectorAll('.video-card')],end=rail.querySelector('.channel-end');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 function updateRail(){const r=rail.getBoundingClientRect();const visible=cards.map((c,i)=>({i:i+1,r:c.getBoundingClientRect()})).filter(c=>c.r.right>r.left+40&&c.r.left<r.right-40);const atEnd=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-3;previous.disabled=rail.scrollLeft<3;next.disabled=atEnd;const label=atEnd?'End of selection. Explore the full channel →':visible.length?`Videos ${visible[0].i}–${visible.at(-1).i} of ${cards.length}`:'More on YouTube';if(status&&status.textContent!==label)status.textContent=label;}
 function step(direction){const distance=cards[0].getBoundingClientRect().width+24;rail.scrollBy({left:direction*distance,behavior:reduced.matches?'instant':'smooth'});}
 previous.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
 rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}if(e.key==='Home'||e.key==='End'){e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:reduced.matches?'instant':'smooth'});}});
 rail.addEventListener('scroll',updateRail,{passive:true});new ResizeObserver(updateRail).observe(rail);updateRail();
}

// Shared public numbers, refreshed when this tab is reopened or after five minutes.
// This endpoint is produced by the site's existing build pipeline, never an API key.
let lastStatsRefresh=0;
async function refreshStats(){
 if(!document.querySelector('[data-stat]'))return;
 try{
  const response=await fetch('/links-data.json',{cache:'no-store'});
  if(!response.ok)throw new Error('Stats unavailable');
  const stats=await response.json();
  for(const key of ['subscribers']){
   const value=stats[key];
   if(typeof value==='string'&&/^\d[\d,.]*(?:[KM])?\+?$/.test(value)){
    document.querySelectorAll(`[data-stat="${key}"]`).forEach(el=>el.textContent=value);
    if(stats.updated) document.querySelectorAll(`[data-stat="${key}"]`).forEach(el=>el.title=`YouTube count updated ${stats.updated}`);
   }
  }
  lastStatsRefresh=Date.now();
 }catch{/* Keep existing values; initial fallbacks make no numeric claim. */}
}
refreshStats();
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastStatsRefresh>300000)refreshStats();});
setInterval(()=>{if(!document.hidden)refreshStats();},300000);
// Both decorative videos stay silent and respect reduced motion and page visibility.
document.querySelectorAll('.course-loop,.resource-loop').forEach(loop=>{
 const motionButton=loop.parentElement.querySelector('.motion-toggle');
 if(!motionButton)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let pausedByUser=false,playRequested=false,nearViewport=false,loaded=false;
 function loadVideo(){if(loaded)return;loop.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;});loop.load();loaded=true;}
 loop.muted=true;
 function syncMotion(){
  const stop=(preference.matches&&!playRequested)||pausedByUser||!nearViewport||document.hidden||loop.closest('[hidden]');
  if(stop)loop.pause();else{loadVideo();loop.play().catch(()=>{});}
 }
 function updateMotionButton(){
  motionButton.innerHTML=loop.paused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  motionButton.title=loop.paused?'Play animation':'Pause animation';
  motionButton.setAttribute('aria-label',loop.paused?'Play background animation':'Pause background animation');
  motionButton.setAttribute('aria-pressed',String(loop.paused));
 }
 motionButton.addEventListener('click',()=>{pausedByUser=!loop.paused;playRequested=loop.paused;syncMotion();});
 loop.addEventListener('play',updateMotionButton);loop.addEventListener('pause',updateMotionButton);
 preference.addEventListener('change',()=>{playRequested=false;syncMotion();});
 document.addEventListener('visibilitychange',syncMotion);
 document.querySelectorAll('[data-course-toggle]').forEach(el=>el.addEventListener('change',syncMotion));
 const observer=new IntersectionObserver(entries=>{nearViewport=entries[0].isIntersecting;syncMotion();},{rootMargin:'150px'});observer.observe(loop);
 syncMotion();updateMotionButton();
});

// Brand credits: advance a group, pause out of view, and honor reduced motion.
const brandBanner=document.querySelector('.brand-banner');
if(brandBanner){
 const track=brandBanner.querySelector('.brand-logos'), viewport=brandBanner.querySelector('.brand-window'), controls=brandBanner.querySelector('.brand-controls');
 const originals=[...track.children], count=originals.length, motion=matchMedia('(prefers-reduced-motion:reduce)');
 let index=0,width=0,paused=motion.matches,hovered=false,focused=false,visible=false,moving=false,timer,lastMove=0;
 originals.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');track.append(clone);});
 brandBanner.classList.add('is-carousel');controls.hidden=false;
 const perPage=()=>matchMedia('(max-width:650px)').matches?2:5;
 const paint=()=>track.style.transform=`translateX(${-index*width}px)`;
 const pauseButton=controls.querySelector('[data-brand-pause]');
 function updateButton(){pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.setAttribute('aria-label',paused?'Play brand slideshow':'Pause brand slideshow');pauseButton.title=paused?'Play':'Pause';pauseButton.innerHTML=paused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7v10M15 7v10"/></svg>';}
 function schedule(){clearTimeout(timer);if(!paused&&!hovered&&!focused&&visible&&!document.hidden&&!moving)timer=setTimeout(()=>move(3),Math.max(0,3000-(performance.now()-lastMove)));}
 function move(amount){if(moving)return;clearTimeout(timer);lastMove=performance.now();if(index+amount<0){index+=count;track.style.transition='none';paint();track.getBoundingClientRect();}index+=amount;moving=true;track.style.transition=motion.matches?'none':'transform 750ms cubic-bezier(.22,1,.36,1)';paint();setTimeout(()=>{index=((index%count)+count)%count;track.style.transition='none';paint();moving=false;schedule();},motion.matches?0:780);}
 controls.querySelector('[data-brand-prev]').addEventListener('click',()=>move(-3));controls.querySelector('[data-brand-next]').addEventListener('click',()=>move(3));
 pauseButton.addEventListener('click',()=>{paused=!paused;updateButton();schedule();});
 brandBanner.addEventListener('mouseenter',()=>{hovered=true;schedule();});brandBanner.addEventListener('mouseleave',()=>{hovered=false;schedule();});
 brandBanner.addEventListener('focusin',()=>{focused=true;schedule();});brandBanner.addEventListener('focusout',e=>{focused=brandBanner.contains(e.relatedTarget);schedule();});
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{paused=motion.matches;updateButton();schedule();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;lastMove=performance.now();schedule();}).observe(brandBanner);
 new ResizeObserver(()=>{width=viewport.clientWidth/perPage();track.style.transition='none';paint();}).observe(viewport);
 updateButton();
}
