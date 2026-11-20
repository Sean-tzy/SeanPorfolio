/* Short, once-per-tab introduction. Never holds the page for a slow asset. */
(() => {
  'use strict';
  const root=document.documentElement, overlay=document.getElementById('seanIntro');
  if(!overlay)return;
  if(!root.dataset.seanIntro){overlay.remove();return;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let done=false,leaving=false,minTimer=0,exitTimer=0,readyTimer=0;
  const previousFocus=document.activeElement;
  const blocked=[...document.body.children].filter(el=>el!==overlay&&!['SCRIPT','STYLE'].includes(el.tagName)).map(el=>[el,el.inert]);
  function finish(){
    if(done)return;done=true;
    clearTimeout(minTimer);clearTimeout(exitTimer);clearTimeout(readyTimer);clearTimeout(window.seanIntroFailsafe);
    const focused=overlay.contains(document.activeElement);
    blocked.forEach(([el,inert])=>{el.inert=inert;});
    delete root.dataset.seanIntro;
    document.removeEventListener('keydown',onKey);reduced.removeEventListener('change',onMotion);
    overlay.remove();
    try{sessionStorage.setItem('sean-intro-seen','1');}catch{}
    if(focused)(previousFocus!==document.body&&previousFocus?.isConnected?previousFocus:document.querySelector('.navbar-brand'))?.focus({preventScroll:true});
  }
  function leave(){if(done||leaving)return;leaving=true;overlay.classList.add('is-leaving');exitTimer=setTimeout(finish,660);}
  function onMotion(){if(reduced.matches)finish();}
  function onKey(event){if(event.key==='Escape'){event.preventDefault();finish();}else if(event.key==='Tab'){event.preventDefault();document.getElementById('skipIntro')?.focus();}}
  window.SeanIntro=Object.freeze({finish});
  overlay.hidden=false;blocked.forEach(([el])=>{el.inert=true;});
  overlay.tabIndex=-1;overlay.focus({preventScroll:true});
  document.getElementById('skipIntro').addEventListener('click',finish);
  document.addEventListener('keydown',onKey);reduced.addEventListener('change',onMotion);
  window.addEventListener('pagehide',finish,{once:true});
  const portrait=document.querySelector('.hero-portrait img');
  const imageReady=portrait?.decode?portrait.decode().catch(()=>{}):Promise.resolve();
  const assets=Promise.all([document.fonts?.ready||Promise.resolve(),imageReady]);
  const minimum=new Promise(resolve=>{minTimer=setTimeout(resolve,1000);});
  const deadline=new Promise(resolve=>{readyTimer=setTimeout(resolve,1800);});
  Promise.all([minimum,Promise.race([assets,deadline])]).then(leave);
  if(reduced.matches)finish();
})();
