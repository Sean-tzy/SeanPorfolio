/* A paged book and a small, depth-sorted 3D scene. No external renderer needed. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const book = document.getElementById('identityBook');
  const pages = [...book.querySelectorAll('.storybook-page')];
  const read = document.getElementById('bookRead');
  const follow = document.getElementById('bookScroll');
  const status = document.getElementById('bookStatus');
  const nav = document.createElement('nav');
  nav.className = 'book-navigation';
  nav.setAttribute('aria-label', 'Story pages');
  nav.innerHTML = '<button type="button" data-step="-1" aria-label="Previous page">← Previous</button>' +
    ['Roots', 'Character', 'North Star'].map((name, i) => `<button type="button" data-page="${i}">${String(i + 1).padStart(2, '0')} · ${name}</button>`).join('') +
    '<button type="button" data-step="1" aria-label="Next page">Next →</button><span class="book-position"></span>';
  book.after(nav);
  book.classList.add('book-interactive');
  book.tabIndex = 0;
  book.setAttribute('aria-label', 'Storybook. Use left and right arrow keys to turn pages.');
  let current = 0, all = false, turn = null;
  function show(index, animate = true) {
    const previous = current;
    current = Math.max(0, Math.min(pages.length - 1, index));
    turn?.cancel();
    book.classList.toggle('book-all', all);
    pages.forEach((page, i) => { page.hidden = !all && i !== current; });
    nav.hidden = all;
    nav.querySelectorAll('[data-page]').forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
    nav.querySelector('[data-step="-1"]').disabled = current === 0;
    nav.querySelector('[data-step="1"]').disabled = current === pages.length - 1;
    nav.querySelector('.book-position').textContent = `${current + 1} / ${pages.length}`;
    read.textContent = all ? 'Return to page view' : 'Read all pages';
    read.setAttribute('aria-expanded', String(all));
    status.textContent = all ? 'The complete story is open.' : `Page ${current + 1} of ${pages.length}. Select a bookmark, swipe, or use the arrow keys.`;
    if (animate && !all && !reduced.matches && previous !== current) {
      turn = pages[current].animate([
        { transform: `rotateY(${current > previous ? -14 : 14}deg)`, opacity: .45 },
        { transform: 'rotateY(0deg)', opacity: 1 }
      ], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
    window.SeanScroll?.refresh();
  }
  nav.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button) show(button.hasAttribute('data-page') ? Number(button.dataset.page) : current + Number(button.dataset.step));
  });
  read.addEventListener('click', () => { all = !all; show(current, false); });
  follow.textContent = 'Start from page 01';
  follow.addEventListener('click', () => { all = false; show(0); book.focus({ preventScroll: true }); });
  book.addEventListener('keydown', event => {
    if (all || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    show(event.key === 'Home' ? 0 : event.key === 'End' ? pages.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let swipe = null;
  book.addEventListener('pointerdown', event => { swipe = event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY }; }, { passive: true });
  book.addEventListener('pointerup', event => {
    if (!swipe || all) return;
    const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && !event.target.closest('a,button')) show(current + (dx < 0 ? 1 : -1));
    swipe = null;
  });
  book.addEventListener('pointercancel', () => { swipe = null; });
  reduced.addEventListener('change', () => turn?.cancel());
  show(0, false);

  const clearing = document.querySelector('.tree-clearing');
  const stage = document.createElement('div');
  stage.className = 'tree-stage';
  stage.innerHTML = '<span class="tree-scene-label">THE LIVING ARCHIVE / 3D</span><canvas tabindex="0" role="img" aria-label="Three-dimensional magical tree. Drag horizontally or use arrow keys to rotate. Select a glowing branch or use the category buttons below."></canvas>';
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // Original artwork and accessible archive remain available.
  clearing.prepend(stage);
  clearing.classList.add('tree-dimensional');
  const camera = document.createElement('div');
  camera.className = 'tree-camera';
  camera.innerHTML = '<button type="button" data-camera="left" aria-label="Rotate tree left">↶ Rotate</button><button type="button" data-camera="reset">Reset view</button><button type="button" data-camera="right" aria-label="Rotate tree right">Rotate ↷</button>';
  stage.after(camera);
  clearing.querySelector('.tree-clearing-caption').textContent = 'Drag to orbit · Select a glowing branch to explore its stories';
  const tabs = [...clearing.querySelectorAll('.tree-branch-tab')];
  tabs.forEach((tab, i) => { tab.querySelector('.tree-branch-tab__sigil').textContent = String(i + 1).padStart(2, '0'); });
  const faces = [], lights = [];
  let seed = 81;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const add = (a, b) => a.map((v, i) => v + b[i]);
  const scale = (a, s) => a.map(v => v * s);
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const unit = a => scale(a, 1 / (Math.hypot(...a) || 1));
  function face(vertices, color) { faces.push({ vertices, color }); }
  function limb(a, b, r1, r2) {
    const axis = unit(b.map((v, i) => v - a[i]));
    const u = unit(cross(axis, Math.abs(axis[1]) > .9 ? [1,0,0] : [0,1,0]));
    const v = cross(axis, u);
    const ring = (p, r, i) => add(p, add(scale(u, Math.cos(i * Math.PI / 3) * r), scale(v, Math.sin(i * Math.PI / 3) * r)));
    for (let i = 0; i < 6; i++) face([ring(a,r1,i),ring(a,r1,i+1),ring(b,r2,i+1),ring(b,r2,i)], `hsl(31 25% ${23 + i * 3}%)`);
  }
  function crown(p, radius) {
    const vertices = [[0,1,0],[1,0,0],[0,0,1],[-1,0,0],[0,0,-1],[0,-.65,0]].map(v => add(p, scale(v, radius)));
    for (let i = 1; i <= 4; i++) {
      const next = i === 4 ? 1 : i + 1;
      face([vertices[0],vertices[i],vertices[next]], `hsl(${135 + random()*25} 29% ${27 + random()*17}%)`);
      face([vertices[5],vertices[next],vertices[i]], `hsl(148 28% ${17 + random()*12}%)`);
    }
  }
  // Tapered hexagonal trunk, radial roots, and five spatially distinct branches.
  const trunk = [[0,-1.7,0],[-.12,-.6,.08],[.12,.5,0],[0,1.6,-.08],[.12,2.3,0]];
  for (let i = 0; i < trunk.length - 1; i++) limb(trunk[i],trunk[i+1],.28-i*.055,.225-i*.055);
  for (let i = 0; i < 9; i++) { const a = i * Math.PI * 2 / 9; limb([0,-1.5,0],[Math.cos(a)*1.2,-1.78,Math.sin(a)*1.2],.15,.025); }
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5 + .3;
    const end = [Math.cos(a)*1.85, .75 + (i%2)*.65, Math.sin(a)*1.65];
    const joint = [end[0]*.5, .25, end[2]*.5];
    limb([0,-.4,0],joint,.17,.11); limb(joint,end,.11,.04);
    lights.push({ p: [end[0]*1.12,end[1]-.15,end[2]*1.12], index: i });
    for (let j = 0; j < 7; j++) {
      const p = add(end, [(random()-.5)*1.4,random()*.85,(random()-.5)*1.3]);
      crown(p,.5+random()*.35);
    }
  }
  for (let i = 0; i < 9; i++) crown([(random()-.5)*1.8,1.9+random()*.65,(random()-.5)*1.6],.65);
  const stars = Array.from({length:28}, () => [(random()-.5)*6,random()*4-1.5,(random()-.5)*4]);
  let width = 0, height = 0, yaw = -.35, target = yaw, frame = 0, visible = false, dragging = null, hits = [];
  let selected = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  function project(p) {
    const x = p[0]*Math.cos(yaw) + p[2]*Math.sin(yaw);
    const z = -p[0]*Math.sin(yaw) + p[2]*Math.cos(yaw);
    const y = p[1]*.97 - z*.24;
    const depth = z*.97 + p[1]*.24;
    const s = Math.min(width/8,height/7.2) * 9 / (9 + depth);
    return { x:width/2+x*s, y:height*.60-y*s, z:depth, s };
  }
  function draw() {
    ctx.clearRect(0,0,width,height);
    const ground = project([0,-1.8,0]);
    ctx.fillStyle = '#050e0b'; ctx.beginPath(); ctx.ellipse(width/2,ground.y, Math.min(width*.36,230),28,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#9cb98a40';
    for (const r of [1.5,2,2.5]) {
      ctx.beginPath();
      for (let i=0;i<=64;i++) { const a=i*Math.PI/32, p=project([Math.cos(a)*r,-1.8,Math.sin(a)*r]); i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y); }
      ctx.stroke();
    }
    const projected = faces.map(f => { const points=f.vertices.map(project); return { points, color:f.color, z:points.reduce((n,p)=>n+p.z,0)/points.length }; });
    projected.sort((a,b)=>b.z-a.z);
    for (const f of projected) {
      ctx.beginPath(); f.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.closePath();
      ctx.fillStyle=f.color; ctx.fill();
    }
    for (const star of stars) { const p=project(star); ctx.fillStyle='#e8dda29c'; ctx.fillRect(p.x,p.y,2,2); }
    hits = lights.map(light => ({ ...project(light.p), index:light.index }));
    for (const p of hits) {
      const active = p.index === selected;
      const glow=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,active?32:20);
      glow.addColorStop(0,active?'#fff5ba99':'#d5eeb455'); glow.addColorStop(1,'#d5eeb400');
      ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(p.x,p.y,active?32:20,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=active?'#f1e7b3':'#203e2c'; ctx.strokeStyle='#e1d39c';
      ctx.beginPath(); ctx.arc(p.x,p.y,13,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle=active?'#162519':'#f1e7b3'; ctx.font='11px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(String(p.index+1),p.x,p.y);
    }
  }
  function tick() {
    frame=0;
    if (!visible || document.hidden) return;
    const delta=target-yaw;
    yaw = reduced.matches || Math.abs(delta)<.001 ? target : yaw+delta*.2;
    draw();
    if (Math.abs(target-yaw)>.001) frame=requestAnimationFrame(tick);
  }
  function requestDraw() { if (!frame && visible && !document.hidden) frame=requestAnimationFrame(tick); }
  function resize() {
    const rect=stage.getBoundingClientRect(); width=rect.width; height=rect.height;
    const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); requestDraw();
  }
  const resizeObserver=new ResizeObserver(resize); resizeObserver.observe(stage);
  const visibility=new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if (!visible) { cancelAnimationFrame(frame); frame=0; } else requestDraw();
  }); visibility.observe(stage);
  const rotate=amount=>{ target+=amount; requestDraw(); };
  camera.addEventListener('click', event=>{
    const action=event.target.closest('button')?.dataset.camera;
    if (action==='reset') { target=-.35; requestDraw(); } else if(action) rotate(action==='left'?-.5:.5);
  });
  canvas.addEventListener('keydown',event=>{
    if (!['ArrowLeft','ArrowRight','Home'].includes(event.key)) return;
    event.preventDefault(); if(event.key==='Home') target=-.35; else target+=event.key==='ArrowLeft'?-.3:.3; requestDraw();
  });
  canvas.addEventListener('pointerdown',event=>{
    if (event.button!==0) return;
    dragging={id:event.pointerId,x:event.clientX,startX:event.clientX,startY:event.clientY,moved:false};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove',event=>{
    if (!dragging || dragging.id!==event.pointerId) return;
    const dx=event.clientX-dragging.x;
    if (Math.hypot(event.clientX-dragging.startX,event.clientY-dragging.startY)>6) dragging.moved=true;
    dragging.x=event.clientX; rotate(dx*.008);
  });
  canvas.addEventListener('pointerup',event=>{
    if (!dragging) return;
    if(!dragging.moved) {
      const rect=canvas.getBoundingClientRect();
      const hit=hits.slice().sort((a,b)=>a.z-b.z).find(p=>Math.hypot(p.x-event.clientX+rect.left,p.y-event.clientY+rect.top)<26);
      if(hit) tabs[hit.index].click();
    }
    dragging=null;
  });
  canvas.addEventListener('lostpointercapture',()=>{dragging=null;});
  canvas.addEventListener('pointercancel',()=>{dragging=null;});
  tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{selected=i; requestDraw();}));
  // Existing tab keyboard handlers change aria-selected without dispatching clicks.
  const selection=new MutationObserver(()=>{selected=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');requestDraw();});
  tabs.forEach(tab=>selection.observe(tab,{attributes:true,attributeFilter:['aria-selected']}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestDraw();});
  reduced.addEventListener('change',requestDraw);
  window.addEventListener('pagehide',event=>{cancelAnimationFrame(frame);frame=0;if(!event.persisted){resizeObserver.disconnect();visibility.disconnect();selection.disconnect();}});
  window.addEventListener('pageshow',requestDraw);
})();
