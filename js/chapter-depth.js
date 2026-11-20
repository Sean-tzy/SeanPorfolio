/* Chapter depth: progressive enhancement; content stays in the original document.
   All new scroll/pointer work shares one event-driven frame. No perpetual JS loop. */
(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
  const make = (tag, className, content) => {
    const el = document.createElement(tag); el.className = className;
    if (content) el.innerHTML = content;
    return el;
  };
  let frame = 0, dirty = true, pointer = { x: -100, y: -100 }, surface = null;
  let bounds = new Map(), trailBounds, milestoneOffsets = [], sceneBounds = new Map();
  const visible = new Set();
  const watches = [];
  const watch = el => { if (el) watches.push(el); return el; };

  // Education: one continuous route, with five individually lit milestones.
  const trail = watch($('.education-trail'));
  const milestones = $$('.education-card', trail);
  trail.classList.add('light-trail');
  trail.dataset.cursor = 'FOLLOW';
  const route = make('li', 'learning-route', '<span class="learning-route__lit"></span><span class="learning-lantern"><i></i></span>');
  route.setAttribute('aria-hidden', 'true'); trail.prepend(route);
  const routeLit = $('.learning-route__lit', route), lantern = $('.learning-lantern', route);
  milestones.forEach((el, i) => {
    el.style.setProperty('--step', i + 1);
    const state = make('span', 'milestone-state', 'Ahead');
    state.setAttribute('aria-hidden', 'true'); $('.education-card__eyebrow', el).after(state);
  });

  // Guardian: original learning-area articles become the security core's dossier.
  const guardian = $('.guardian-grid');
  const cards = $$('.guardian-card', guardian);
  guardian.className = 'guardian-environment';
  guardian.dataset.depthSurface = 'guardian';
  const coordinates = [[20,22],[80,22],[13,65],[87,65],[50,88]];
  const nodeNames = ['Defensive security', 'Digital forensics', 'Infrastructure', 'Monitoring', 'Responsible research'];
  const stage = make('div', 'guardian-stage', '<span class="scene-caption">THE DIGITAL SANCTUARY</span><svg class="guardian-connections" viewBox="0 0 600 500" preserveAspectRatio="none" aria-hidden="true"></svg><div class="security-orbit orbit-one"></div><div class="security-orbit orbit-two"></div><div class="security-core" aria-hidden="true"><span class="core-shell"></span><svg viewBox="0 0 80 90"><path d="M40 8 68 20v23c0 19-13 31-28 39C25 74 12 62 12 43V20Z"/><path d="m27 43 9 9 18-21"/></svg><span>SEAN</span><small>LEARN · UNDERSTAND · PROTECT</small></div>');
  stage.dataset.cursor = 'SCAN';
  const dossier = make('div', 'guardian-dossier', '<p class="depth-eyebrow">EXPLORE THE SYSTEM</p><p class="guardian-hint">Choose a node to trace its connection.</p>');
  const nodes = coordinates.map(([x,y], i) => {
    const node = make('button', 'security-node', '<span class="node-mark">0' + (i+1) + '</span><span>' + nodeNames[i] + '</span>');
    node.type = 'button'; node.style.left = x + '%'; node.style.top = y + '%';
    node.id = 'security-node-' + i; node.setAttribute('aria-controls', 'security-detail-' + i);
    node.dataset.cursor = 'EXPLORE +';
    stage.append(node);
    const line = document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('d', 'M300 240 L' + x*6 + ' ' + y*5); line.dataset.node = i;
    $('.guardian-connections', stage).append(line);
    cards[i].id = 'security-detail-' + i;
    cards[i].setAttribute('aria-labelledby', node.id);
    dossier.append(cards[i]);
    return node;
  });
  const cycle = make('div', 'security-cycle', '<span class="depth-eyebrow">A DEFENSIVE MINDSET</span>');
  const phaseMap = [0,3,1,4];
  ['Protect','Detect','Analyze','Respond'].forEach((title,i) => {
    const b = make('button', '', '<span>0'+(i+1)+'</span>'+title+'<i aria-hidden="true">'+(i<3?'→':'↗')+'</i>'); b.type='button';
    b.dataset.phase = i; b.addEventListener('click', () => selectGuardian(phaseMap[i])); cycle.append(b);
  });
  guardian.append(stage, dossier, cycle); watch(guardian);
  function selectGuardian(index) {
    nodes.forEach((node,i) => node.setAttribute('aria-pressed', String(index === i)));
    cards.forEach((card,i) => { card.hidden = i !== index; });
    $$('.guardian-connections path', stage).forEach((path,i) => path.classList.toggle('is-connected', index === i));
    $$('.security-cycle button',cycle).forEach((button,i) => button.setAttribute('aria-pressed',String(phaseMap[i] === index)));
    guardian.dataset.activeNode = index;
    guardian.classList.remove('is-scanning');
    if (!reduced.matches) { requestAnimationFrame(() => guardian.classList.add('is-scanning')); }
  }
  nodes.forEach((node,i) => {
    node.addEventListener('click', () => selectGuardian(i));
    node.addEventListener('focus', () => selectGuardian(i));
    node.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key==='Home'?0:event.key==='End'?4:(i+(['ArrowRight','ArrowDown'].includes(event.key)?1:4))%5;
      nodes[next].focus();
    });
  });
  selectGuardian(0);

  // Capability architecture. Only technologies already present are included.
  const skills = $('.skills-panel:not(.skills-panel--personal)');
  const groups = $('.skill-groups',skills);
  const originalGroups = $$('.skill-group',groups).map(group => ({title:$('h4',group).textContent, tech:$$('li',group).map(li=>li.textContent)}));
  const categories = [
    {name:'Development', verb:'Build the interface', tech:[...originalGroups[0].tech,...originalGroups[1].tech], text:'Languages, structure, styling, and interaction — the building blocks of websites and applications.'},
    {name:'Cybersecurity', verb:'Understand and protect', tech:[...originalGroups[3].tech,...originalGroups[5].tech,'Linux'], text:'Explore systems, examine evidence, and understand risk through responsible security practice.'},
    {name:'Backend', verb:'Connect the layers', tech:['PHP','Laragon','XAMPP','Docker'], text:'Server-side code and local environments connect an interface to the services behind it.'},
    {name:'Systems', verb:'Know the environment', tech:[...originalGroups[4].tech,'Docker','Nmap'], text:'Operating systems, networks, and containers provide the environment in which software runs.'},
    {name:'Tools', verb:'Make work repeatable', tech:[...originalGroups[6].tech,'Laragon','XAMPP','Docker'], text:'Version control, local development, and inspection support a repeatable development workflow.'}
  ];
  const descriptions = {
    Java:'A language for structured, object-oriented application development.', PHP:'Server-side programming for web applications.', 'C++':'Programming with direct control over data structures and memory.', JavaScript:'Behavior, events, and interaction in the browser.', HTML:'Semantic structure for accessible web content.', CSS:'Layout, typography, responsive design, and visual motion.', Bootstrap:'Reusable responsive layout and interface components.', Laragon:'A local environment for developing and running web applications.', XAMPP:'A local web-server environment for development.', Docker:'Containers package applications and their runtime environments.', Nmap:'Network discovery and inspection within authorized scope.', Linux:'An operating-system environment for development and system exploration.', Windows:'An operating-system environment for everyday development.', 'Defensive security':'Understanding risk and protecting systems and their users.', 'Digital forensics':'Examining digital evidence with attention to context and handling.', 'Responsible research':'Learning within permission and reporting findings responsibly.', Git:'Version control for tracking and organizing source changes.', GitHub:'Repositories and collaboration around version-controlled code.', 'Browser developer tools':'Inspecting layout, behavior, accessibility, and performance in the browser.'
  };
  const relationships = {JavaScript:['HTML','CSS','Browser developer tools'],HTML:['CSS','JavaScript','Bootstrap'],CSS:['HTML','JavaScript','Bootstrap'],PHP:['Laragon','XAMPP','HTML'],Docker:['Linux','Windows','PHP'],Nmap:['Linux','Defensive security','Responsible research'],Git:['GitHub'],GitHub:['Git'],Java:['C++'], 'C++':['Java']};
  const architecture = make('div','capability-system','<div class="capability-heading"><span class="depth-eyebrow">CAPABILITY ATLAS</span><span>SELECT A LAYER. TRACE THE CONNECTIONS.</span></div><div class="capability-map"><svg class="capability-wires" aria-hidden="true"></svg><div class="capability-categories" aria-label="Capability layers"></div><div class="capability-technologies" aria-label="Technologies and learning areas"></div></div><div class="capability-insight" role="status" aria-live="polite"><span class="depth-eyebrow"></span><h4></h4><p></p><div class="capability-related"></div></div>');
  groups.after(architecture); groups.hidden = true;
  skills.classList.add('capabilities-enhanced'); skills.dataset.depthSurface='skills';
  $('.skills-grove').classList.add('capabilities-grove'); watch(skills);
  const categoryButtons = categories.map((category,i) => {
    const button = make('button','capability-category','<span>0'+(i+1)+'</span><strong>'+category.name+'</strong><small>'+category.verb+'</small><i aria-hidden="true">↗</i>');
    button.type='button'; button.dataset.cursor='EXPLORE +'; button.setAttribute('aria-controls','capabilityInsight');
    button.addEventListener('click',()=>selectCapability(i)); $('.capability-categories',architecture).append(button); return button;
  });
  const skillButtons = new Map();
  originalGroups.forEach((group,i) => {
    const row = make('div','capability-band','<span class="capability-band-label">'+group.title+'</span><div></div>');
    group.tech.forEach(name => {
      const button=make('button','capability-tech'); button.type='button'; button.textContent=name; button.dataset.cursor='EXPLORE +';
      button.setAttribute('aria-controls','capabilityInsight');
      button.addEventListener('click',()=>selectCapability(categories.findIndex(c=>c.tech.includes(name)),name));
      $('div',row).append(button); skillButtons.set(name,button);
    });
    $('.capability-technologies',architecture).append(row);
  });
  $('.capability-insight',architecture).id='capabilityInsight';
  let selectedCategory=0, selectedSkill=null;
  function selectCapability(index, name=null) {
    selectedCategory=index; selectedSkill=name;
    const category=categories[index];
    const related = name ? (relationships[name] || category.tech.filter(n=>n!==name).slice(0,4)) : category.tech;
    categoryButtons.forEach((button,i)=>{ button.setAttribute('aria-pressed',String(i===index)); button.classList.toggle('is-related',!!name && categories[i].tech.includes(name)); });
    skillButtons.forEach((button,tech)=>{
      const active=name ? tech===name || related.includes(tech) : category.tech.includes(tech);
      button.classList.toggle('is-related',active); button.classList.toggle('is-selected',tech===name);
      button.setAttribute('aria-pressed',String(tech===name));
    });
    const insight=$('.capability-insight',architecture);
    $('.depth-eyebrow',insight).textContent=name?'TECHNOLOGY / '+category.name.toUpperCase():'LAYER 0'+(index+1)+' / 05';
    $('h4',insight).textContent=name || category.verb;
    $('p',insight).textContent=name?descriptions[name]:category.text;
    $('.capability-related',insight).textContent=(name?'Connects with: ':'Includes: ')+related.join(' · ');
    dirty=true; schedule();
  }

  // Organic flight: two veined wings hinged independently in CSS 3D.
  const garden=watch($('.beyond-scene--garden'));
  garden.dataset.depthSurface='garden';
  const butterfly=make('div','dimensional-butterfly','<div class="butterfly-flight"><span class="butterfly-wing wing-left"></span><span class="butterfly-wing wing-right"></span><span class="butterfly-body"></span><i class="butterfly-antenna antenna-left"></i><i class="butterfly-antenna antenna-right"></i></div>');
  butterfly.setAttribute('aria-hidden','true'); garden.append(butterfly);
  $$('.hobby-list button').forEach((button,i)=>{button.dataset.cursor='DISCOVER';button.addEventListener('click',()=>{garden.style.setProperty('--perch-x',[-12,28,8,-28][i]+'px');garden.style.setProperty('--perch-y',[0,-28,25,-12][i]+'px');});});

  // Give the existing landscape separate focal planes, preserving the artwork.
  const horizon=watch($('.beyond-scene--mountains'));
  horizon.classList.add('dimensional-horizon'); horizon.dataset.depthSurface='horizon';
  const landscape=$('.mountain-artwork',horizon);
  const landscapePaths=$$(':scope > path',landscape);
  landscapePaths.forEach((path,i)=>path.classList.add(i<2?'horizon-far':i===2?'horizon-mid':'horizon-near'));
  const atmosphere=make('div','horizon-atmosphere'); atmosphere.setAttribute('aria-hidden','true'); horizon.append(atmosphere);
  const goals=make('div','horizon-goals'); goals.setAttribute('aria-hidden','true');
  ['Explore','Grow','Give back'].forEach((name,i)=>{const goal=make('span','horizon-goal','<small>0'+(i+1)+'</small>'+name);goal.style.setProperty('--goal',i);goals.append(goal);}); horizon.append(goals);
  $$('.dream-stops button').forEach((button,i)=>{button.dataset.cursor='FOLLOW';button.addEventListener('click',()=>{horizon.style.setProperty('--horizon-direction',i);});});

  // Cabinet of curiosities: native disclosure buttons retain every original fact.
  const cabinet=$('.beyond-topic--discoveries'); cabinet.classList.add('curiosity-cabinet');
  $('.discovery-sky p',cabinet).textContent='A cabinet of little things.';
  $('.discovery-sky',cabinet).insertAdjacentHTML('beforeend','<span class="cabinet-caption">FIVE OBJECTS / FIVE SMALL STORIES</span>');
  const objects=[
    ['lens','A lens for curiosity','<span class="lens-glass"></span><span class="lens-handle"></span>'],
    ['steps','Steps for consistency','<span></span><span></span><span></span>'],
    ['matcha','A bowl of matcha','<span class="matcha-steam"></span><span class="matcha-rim"></span><span class="matcha-bowl"></span>'],
    ['frames','Two frames for my parents','<span></span><span></span>'],
    ['compass','A compass for direction','<span class="compass-case"></span><span class="compass-needle"></span>']
  ];
  $$('.discovery-artifact',cabinet).forEach((item,i)=>{
    const icon=$('.discovery-artifact__icon',item); icon.className='curiosity-object object-'+objects[i][0]; icon.innerHTML=objects[i][2];
    const button=$('button',item); button.prepend(icon); button.dataset.cursor='OPEN +';
    button.insertAdjacentHTML('afterbegin','<span class="artifact-number">0'+(i+1)+' / '+objects[i][0].toUpperCase()+'</span>');
    button.setAttribute('aria-label',objects[i][1]+': '+button.textContent.replace('0'+(i+1)+' / '+objects[i][0].toUpperCase(),'').trim());
    item.dataset.depthSurface='artifact'; watch(item);
    button.addEventListener('click',()=>{button.dataset.cursor=button.getAttribute('aria-expanded')==='true'?'CLOSE −':'OPEN +';dirty=true;schedule();});
  });

  // Shared, event-driven motion. Geometry is refreshed only after layout changes.
  const surfaces=$$('[data-depth-surface]');
  function measure() {
    bounds.clear(); sceneBounds.clear();
    surfaces.forEach(el=>{const r=el.getBoundingClientRect();bounds.set(el,{left:r.left,top:r.top+scrollY,width:r.width,height:r.height});});
    const r=trail.getBoundingClientRect(); trailBounds={top:r.top+scrollY,height:r.height};
    milestoneOffsets=milestones.map(el=>el.getBoundingClientRect().top+scrollY-trailBounds.top+40);
    [guardian,garden,horizon].forEach(el=>{const r=el.getBoundingClientRect();sceneBounds.set(el,{top:r.top+scrollY,height:r.height});});
    drawCapabilityWires(); dirty=false;
  }
  function drawCapabilityWires() {
    const map=$('.capability-map',architecture), svg=$('.capability-wires',map), rect=map.getBoundingClientRect();
    svg.replaceChildren();
    if(innerWidth<768 || !rect.width) return;
    svg.setAttribute('viewBox','0 0 '+rect.width+' '+rect.height);
    const start=categoryButtons[selectedCategory].getBoundingClientRect();
    const x1=start.right-rect.left,y1=start.top+start.height/2-rect.top;
    skillButtons.forEach(button=>{
      if(!button.classList.contains('is-related'))return;
      const end=button.getBoundingClientRect(), x2=end.left-rect.left,y2=end.top+end.height/2-rect.top;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d','M'+x1+' '+y1+' C'+(x1+24)+' '+y1+' '+(x2-24)+' '+y2+' '+x2+' '+y2);
      svg.append(path);
    });
  }
  function render() {
    frame=0; if(document.hidden)return;
    if(dirty)measure();
    if(visible.has(trail) && trailBounds) {
      const travel=clamp(scrollY+innerHeight*.5-trailBounds.top,0,trailBounds.height);
      routeLit.style.transform='scaleY('+travel/trailBounds.height+')';
      lantern.style.transform='translate3d(0,'+travel.toFixed(1)+'px,0)';
      milestones.forEach((el,i)=>{
        const distance=milestoneOffsets[i]-travel;
        const state=reduced.matches?'completed':distance < -125?'completed':distance < 125?'illuminated':distance<330?'approaching':'inactive';
        if(el.dataset.lightState!==state){el.dataset.lightState=state;$('.milestone-state',el).textContent={inactive:'Ahead',approaching:'Approaching',illuminated:'In focus',completed:'Along the way'}[state];}
      });
    }
    for(const scene of [guardian,garden,horizon]) {
      if(!visible.has(scene))continue;
      const r=sceneBounds.get(scene); if(!r || !r.height)continue;
      const p=clamp((scrollY+innerHeight-r.top)/(innerHeight+r.height));
      if(scene===guardian)scene.classList.toggle('is-unlocked',p>.14 || reduced.matches);
      if(scene===garden)scene.style.setProperty('--flight-scroll',reduced.matches?'0px':((p-.5)*60).toFixed(1)+'px');
      if(scene===horizon){scene.style.setProperty('--horizon-shift',reduced.matches?'0px':((p-.5)*(innerWidth<768?28:85)).toFixed(1)+'px');scene.style.setProperty('--horizon-open',reduced.matches?1:p);}
    }
    if(surface && fine.matches && !reduced.matches){
      const r=bounds.get(surface);
      if(r?.width){const x=clamp((pointer.x-r.left)/r.width*2-1,-1,1), y=clamp((pointer.y+scrollY-r.top)/r.height*2-1,-1,1);
        surface.style.setProperty('--depth-x',x.toFixed(3));surface.style.setProperty('--depth-y',y.toFixed(3));
        if(surface.dataset.depthSurface==='book'){surface.style.setProperty('--book-tilt-x',(-y*1.3)+'deg');surface.style.setProperty('--book-tilt-y',(x*2)+'deg');}
      }
    }
    if(cursorVisible){cursor.style.transform='translate3d('+pointer.x+'px,'+pointer.y+'px,0)';}
  }
  function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(render);}
  const visibility=new IntersectionObserver(entries=>{
    dirty=true; entries.forEach(entry=>{entry.target.classList.toggle('depth-in-view',entry.isIntersecting);if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});schedule();
  },{rootMargin:'80px 0px'});
  watches.forEach(el=>visibility.observe(el));
  function resetSurface(){if(surface){['--depth-x','--depth-y','--book-tilt-x','--book-tilt-y'].forEach(key=>surface.style.removeProperty(key));}surface=null;}

  // Keep the SEAN cursor, but expose labels only for meaningful affordances.
  const cursor=$('#enchantedCursor'), label=$('#cursorLabel'); let cursorVisible=false;
  function hideCursor(){cursorVisible=false;cursor.classList.remove('is-visible','is-link','is-pressed');document.documentElement.classList.remove('depth-pointer-ready');}
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!fine.matches||reduced.matches)return;
    pointer={x:event.clientX,y:event.clientY};
    const next=event.target.closest('[data-depth-surface]');if(next!==surface){resetSurface();surface=next;}
    const target=event.target.closest('[data-cursor],.book-navigation button,.tree-branch-tab,a,button');
    const text=target?.dataset.cursor || (target?.closest('.book-navigation')?(target.dataset.step==='-1'?'← TURN PAGE':'TURN PAGE →'):target?.matches('.tree-branch-tab')?'EXPLORE +':'');
    const editing=event.target.closest('input,textarea,select,dialog');
    cursorVisible=!!text&&!editing; label.textContent=text;
    cursor.classList.toggle('is-visible',cursorVisible);cursor.classList.toggle('is-link',cursorVisible);
    document.documentElement.classList.toggle('depth-pointer-ready',cursorVisible);
    schedule();
  },{passive:true});
  document.addEventListener('pointerdown',()=>{if(cursorVisible)cursor.classList.add('is-pressed');},{passive:true});
  document.addEventListener('pointerup',()=>cursor.classList.remove('is-pressed'),{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{hideCursor();resetSurface();});
  window.addEventListener('blur',()=>{hideCursor();resetSurface();});
  document.addEventListener('keydown',()=>hideCursor());
  window.addEventListener('scroll',()=>{hideCursor();schedule();},{passive:true});
  window.addEventListener('resize',()=>{dirty=true;resetSurface();schedule();},{passive:true});
  const resize=new ResizeObserver(()=>{dirty=true;schedule();});resize.observe($('#mainContent'));
  document.fonts?.ready.then(()=>{dirty=true;schedule();});
  const syncMotion=()=>{hideCursor();resetSurface();dirty=true;schedule();};
  reduced.addEventListener('change',syncMotion);fine.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('depth-document-hidden',document.hidden);if(document.hidden){cancelAnimationFrame(frame);frame=0;hideCursor();}else{dirty=true;schedule();}});
  window.addEventListener('pagehide',event=>{cancelAnimationFrame(frame);frame=0;hideCursor();if(!event.persisted){visibility.disconnect();resize.disconnect();}});
  window.addEventListener('pageshow',()=>{dirty=true;schedule();});
  selectCapability(0);schedule();
})();
