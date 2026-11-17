(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animate = element => {
    if (reduced.matches) return;
    element.getAnimations().forEach(animation => animation.cancel());
    element.animate([{ opacity: .35, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'ease-out' });
  };
  const chapter = document.getElementById('interests');
  const topics = [...chapter.querySelectorAll('[data-beyond-topic]')];
  const explorerNav = document.createElement('div');
  explorerNav.className = 'beyond-selector';
  explorerNav.setAttribute('role', 'tablist');
  explorerNav.setAttribute('aria-label', 'Explore beyond the classroom');
  explorerNav.innerHTML = ['The everyday', 'The horizon', 'The little things'].map((title, i) => `<button type="button" role="tab" id="beyond-tab-${i}" aria-controls="beyond-panel-${i}"><span>0${i + 1}</span>${title}<span aria-hidden="true">↗</span></button>`).join('');
  chapter.querySelector('.beyond-story').before(explorerNav);
  chapter.classList.add('beyond-interactive');
  const topicTabs = [...explorerNav.querySelectorAll('button')];
  function selectTopic(index, focus = false) {
    topics.forEach((topic, i) => { topic.hidden = i !== index; });
    topicTabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    if (focus) topicTabs[index].focus();
    animate(topics[index]);
    window.SeanScroll?.refresh();
  }
  topics.forEach((topic, i) => {
    topic.id = `beyond-panel-${i}`;
    topic.setAttribute('role', 'tabpanel');
    topic.setAttribute('aria-labelledby', `beyond-tab-${i}`);
    topic.tabIndex = 0;
    topicTabs[i].addEventListener('click', () => selectTopic(i));
    topicTabs[i].addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      selectTopic(event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : 2)) % 3, true);
    });
  });
  selectTopic(0);

  const hobbies = [...chapter.querySelectorAll('.hobby-list li')];
  const hobbyDescriptions = hobbies.map(item => item.querySelector('span').textContent);
  const hobbyOutput = document.createElement('div');
  hobbyOutput.className = 'hobby-selected';
  hobbyOutput.setAttribute('aria-live', 'polite');
  chapter.querySelector('.hobby-list').after(hobbyOutput);
  function chooseHobby(index) {
    hobbies.forEach((item, i) => item.querySelector('button').setAttribute('aria-pressed', String(i === index)));
    hobbyOutput.textContent = hobbyDescriptions[index];
    topics[0].dataset.hobby = String(index);
    animate(hobbyOutput);
  }
  hobbies.forEach((item, i) => {
    const title = item.querySelector('strong').textContent;
    item.replaceChildren();
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = ['♫ ', '✧ ', '⌘ ', '⌕ '][i] + title;
    button.addEventListener('click', () => chooseHobby(i)); item.append(button);
  });
  const garden = chapter.querySelector('.beyond-scene--garden');
  garden.removeAttribute('aria-hidden');
  garden.querySelector('svg').setAttribute('aria-hidden', 'true');
  const playLink = document.createElement('a');
  playLink.className = 'garden-play'; playLink.href = '#finalInstrument';
  playLink.textContent = 'Try the violin in the finale ↗'; garden.append(playLink);
  chapter.querySelector('.beyond-topic__note').textContent = 'Music, a cup of matcha, and time to explore something new.';
  chooseHobby(0);

  const roadmap = document.createElement('div');
  roadmap.className = 'dream-roadmap';
  const facts = Object.fromEntries([...chapter.querySelectorAll('.aspiration-facts > div')].map(row => [row.querySelector('dt').textContent, row.querySelector('dd').textContent]));
  const horizons = [
    { name: 'Explore', title: 'Keep asking questions.', text: facts.Cybersecurity },
    { name: 'Grow', title: 'Turn curiosity into capability.', text: facts['Professional identity'] },
    { name: 'Give back', title: 'Make the work mean something.', text: facts['Desired impact'] }
  ];
  roadmap.innerHTML = '<div class="dream-stops" aria-label="Explore my aspirations">' + horizons.map((h, i) => `<button type="button" aria-pressed="false" data-horizon="${i}"><span>0${i + 1}</span>${h.name}</button>`).join('') + '</div><div class="dream-card" aria-live="polite"><span class="dream-count"></span><h4></h4><p></p></div>';
  chapter.querySelector('.aspiration-facts').after(roadmap);
  topics[1].classList.add('enhanced-roadmap');
  const mountain = chapter.querySelector('.beyond-scene--mountains');
  mountain.removeAttribute('aria-hidden'); mountain.querySelector('svg').setAttribute('aria-hidden','true');
  const horizonBadge = document.createElement('span'); horizonBadge.className = 'horizon-badge'; mountain.append(horizonBadge);
  function chooseHorizon(index) {
    roadmap.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    roadmap.querySelector('.dream-count').textContent = `DIRECTION 0${index + 1} / 03`;
    roadmap.querySelector('h4').textContent = horizons[index].title;
    roadmap.querySelector('.dream-card p').textContent = horizons[index].text;
    horizonBadge.textContent = horizons[index].name;
    mountain.dataset.horizon = String(index);
    animate(roadmap.querySelector('.dream-card'));
  }
  roadmap.addEventListener('click', event => { const button = event.target.closest('[data-horizon]'); if (button) chooseHorizon(Number(button.dataset.horizon)); });
  chooseHorizon(0);

  const discoveries = [...chapter.querySelectorAll('.discovery-artifact')];
  discoveries.forEach((item, i) => {
    const heading = item.querySelector('h4');
    const content = item.querySelector('p'); content.id = `discovery-content-${i}`;
    const button = document.createElement('button'); button.type = 'button'; button.textContent = heading.textContent;
    button.setAttribute('aria-controls', content.id); button.setAttribute('aria-expanded', 'false');
    heading.replaceChildren(button); content.hidden = true;
    button.addEventListener('click', () => {
      const open = content.hidden;
      content.hidden = !open; button.setAttribute('aria-expanded', String(open));
      item.classList.toggle('discovery-open', open);
      if (open) animate(content);
    });
  });
  chapter.querySelector('.discovery-sky p').textContent = 'Small details. A fuller picture.';

  const finale = document.getElementById('contact');
  finale.classList.add('finale-interactive');
  const clearing = finale.querySelector('.final-clearing');
  clearing.hidden = true;
  const stage = document.createElement('div'); stage.className = 'finale-stage';
  stage.innerHTML = `<div class="instrument" id="finalInstrument" tabindex="-1">
    <div class="instrument-caption"><span>THE LAST MOVEMENT</span><span>04 STRINGS / YOUR TEMPO</span></div>
    <svg class="playable-violin" viewBox="0 0 320 480" aria-hidden="true">
      <defs><linearGradient id="violinWood"><stop stop-color="#6c3929"/><stop offset=".46" stop-color="#bb8851"/><stop offset=".6" stop-color="#93603a"/><stop offset="1" stop-color="#4e2c23"/></linearGradient><linearGradient id="violinNeck"><stop stop-color="#171f19"/><stop offset=".5" stop-color="#46503a"/><stop offset="1" stop-color="#0a130e"/></linearGradient></defs>
      <ellipse cx="160" cy="445" rx="105" ry="16" fill="#020a06" opacity=".55"/>
      <g class="violin-shape">
      <path d="M135 169 C96 145 70 176 79 209 Q88 237 105 243 C72 256 53 287 62 329 C68 371 110 405 160 406 C210 405 252 371 258 329 C267 287 248 256 215 243 Q232 237 241 209 C250 176 224 145 185 169 Q160 186 135 169Z" fill="url(#violinWood)" stroke="#cfad71" stroke-width="3"/>
      <path d="M138 180 C108 159 84 183 91 208 Q98 233 119 244 C87 266 67 289 76 329 C84 367 115 391 160 393 C205 391 236 367 244 329 C253 289 233 266 201 244 Q222 233 229 208 C236 183 212 159 182 180" fill="none" stroke="#efd29a" stroke-width="1" opacity=".6"/>
      <path d="M145 64 H175 L181 277 H139Z" fill="url(#violinNeck)" stroke="#bd9863"/>
      <path d="M145 70 V40 C136 16 176 8 180 30 Q181 48 161 44 Q151 42 158 33" fill="none" stroke="#ae7b46" stroke-width="10" stroke-linecap="round"/>
      <path d="M138 54 H122 M182 68 H198 M138 82 H122 M182 96 H198" stroke="#cfad71" stroke-width="8" stroke-linecap="round"/>
      <path d="M114 274 C125 252 127 281 114 294 C101 309 100 326 111 324 M206 274 C195 252 193 281 206 294 C219 309 220 326 209 324" fill="none" stroke="#211c16" stroke-width="6" stroke-linecap="round"/>
      <path d="M139 339 L151 387 H169 L181 339Z" fill="#1d251b" stroke="#b19a66"/>
      <path d="M135 312 Q160 301 185 312 L180 326 H140Z" fill="#e8c78d" stroke="#8c603b"/>
      <g stroke="#f7e7ba" stroke-width="1.3" opacity=".85"><path data-string="0" d="M150 63 L148 348"/><path data-string="1" d="M157 63 L156 348"/><path data-string="2" d="M164 63 L164 348"/><path data-string="3" d="M171 63 L172 348"/></g>
      </g><path class="violin-bow" d="M46 307 L284 180 M50 315 L288 188" stroke="#d1b786" stroke-width="3"/>
    </svg>
    <div class="violin-notes" aria-label="Play a violin string">${['G','D','A','E'].map((note,i)=>`<button type="button" data-note="${i}" aria-label="Play ${note} string"><span>${note}</span><small>${['196','294','440','659'][i]} Hz</small></button>`).join('')}</div>
    <p class="instrument-hint">Tap a string · Keyboard G / D / A / E</p>
  </div><div class="finale-reading"><p class="chapter-kicker">AN EPILOGUE IN SIX NOTES</p><div class="finale-lines"></div><div class="finale-progress" aria-label="Choose a line"></div><div class="finale-actions"><button type="button" id="finaleNext">Next line →</button><button type="button" id="finalePlay" aria-pressed="false">Play the closing melody</button></div><div class="sound-controls"><button type="button" id="finaleSound" aria-pressed="false">Enable sound</button><span id="soundStatus" role="status">Sound off · synthesized string tones</span></div></div>`;
  clearing.after(stage);
  const story = finale.querySelector('.final-story');
  const lines = [...story.querySelectorAll('.final-story__line')];
  stage.querySelector('.finale-lines').append(story);
  story.setAttribute('aria-live', 'polite');
  const progress = stage.querySelector('.finale-progress');
  progress.innerHTML = lines.map((_, i) => `<button type="button" aria-label="Read line ${i + 1}" data-line="${i}">0${i + 1}</button>`).join('');
  let lineIndex = 0, songOpen = false, sound = false, audio = null, voices = [];
  const next = document.getElementById('finaleNext');
  const play = document.getElementById('finalePlay');
  const soundButton = document.getElementById('finaleSound');
  const soundStatus = document.getElementById('soundStatus');
  const songPanel = document.createElement('section');
  songPanel.id = 'favoriteSong'; songPanel.className = 'favorite-song'; songPanel.hidden = true;
  songPanel.setAttribute('aria-label', 'Favorite song: Hinahon by ila and Natun');
  songPanel.innerHTML = '<p class="chapter-kicker">MY FAVORITE SONG</p><h4>Hinahon <span>ila &amp; Natun</span></h4><div class="favorite-song__player"></div><p>Tap Play in the Apple Music player. If it does not load, use the link below. Preview or full-song access depends on Apple Music.</p><a href="https://music.apple.com/us/song/hinahon/1880299772" target="_blank" rel="noopener noreferrer">Listen on Apple Music ↗</a>';
  stage.querySelector('.finale-actions').after(songPanel);
  play.removeAttribute('aria-pressed'); play.setAttribute('aria-expanded', 'false'); play.setAttribute('aria-controls', songPanel.id);
  play.textContent = 'Play closing melody · Hinahon';
  soundButton.textContent = 'Enable violin tones';
  soundStatus.textContent = 'Violin strings only · sound off';
  function showLine(index) {
    lineIndex = index;
    lines.forEach((line,i) => { line.hidden = i !== index; });
    progress.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-current',String(i === index)));
    next.textContent = index === lines.length - 1 ? 'Read from the beginning ↶' : 'Next line →';
    animate(lines[index]);
  }
  async function enableAudio() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    if (!audio) audio = new Audio();
    if (audio.state === 'suspended') await audio.resume();
  }
  function note(index) {
    const button = stage.querySelector(`[data-note="${index}"]`);
    if (!reduced.matches) {
      button.animate([{ background: '#ddcc96', color: '#102016', transform:'translateY(-4px)' }, { background: '#18281d', color: '#e9e8cc', transform:'translateY(0)' }],{duration:650});
      stage.querySelector('.violin-bow').animate([{transform:'translate(-8px,4px)'},{transform:'translate(8px,-4px)'},{transform:'translate(0,0)'}],{duration:480});
      stage.querySelector(`[data-string="${index}"]`).animate([{opacity:1,strokeWidth:3},{opacity:.85,strokeWidth:1.3}],{duration:500});
    }
    if (!sound || !audio || audio.state !== 'running') return;
    const frequency = [196,293.66,440,659.25][index];
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.type = 'triangle'; oscillator.frequency.value = frequency;
    const start = audio.currentTime;
    gain.gain.setValueAtTime(0,start); gain.gain.linearRampToValueAtTime(.075,start+.12); gain.gain.exponentialRampToValueAtTime(.001,start+1.1);
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(start); oscillator.stop(start+1.2);
    voices.push(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); voices = voices.filter(voice=>voice!==oscillator); };
  }
  function stopTones() {
    voices.forEach(voice=>{try{voice.stop();}catch{}}); voices=[];
  }
  function stop() {
    songOpen=false; songPanel.hidden=true;
    songPanel.querySelector('.favorite-song__player').replaceChildren();
    play.textContent='Play closing melody · Hinahon'; play.setAttribute('aria-expanded','false');
    stopTones();
  }
  function playNote(index) { stop(); note(index); showLine((lineIndex + 1) % lines.length); }
  stage.querySelector('.playable-violin').addEventListener('click', event => {
    const string = event.target.closest('[data-string]');
    if (string) playNote(Number(string.dataset.string));
  });
  stage.querySelectorAll('[data-note]').forEach(button=>button.addEventListener('click',()=>playNote(Number(button.dataset.note))));
  stage.querySelector('.instrument').addEventListener('keydown',event=>{
    const index=['g','d','a','e'].indexOf(event.key.toLowerCase());
    if(index<0 || event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
    event.preventDefault(); playNote(index);
  });
  next.addEventListener('click',()=>showLine((lineIndex+1)%lines.length));
  progress.addEventListener('click',event=>{const button=event.target.closest('[data-line]');if(button)showLine(Number(button.dataset.line));});
  play.addEventListener('click',()=>{
    if(songOpen){stop();return;}
    stopTones(); songOpen=true; songPanel.hidden=false;
    const player=document.createElement('iframe');
    player.title='Hinahon by ila & Natun — Apple Music';
    player.src='https://embed.music.apple.com/us/album/hardinera-ep/1880299767?i=1880299772&theme=dark';
    player.allow='autoplay; encrypted-media';
    player.referrerPolicy='strict-origin-when-cross-origin';
    songPanel.querySelector('.favorite-song__player').replaceChildren(player);
    play.textContent='Close song player'; play.setAttribute('aria-expanded','true');
    animate(songPanel);
  });
  soundButton.addEventListener('click',async()=>{
    if(sound){sound=false;stopTones();audio?.suspend();}else{
      try { await enableAudio(); sound=true; } catch { soundStatus.textContent='Audio is unavailable. You can still play visually.'; return; }
    }
    soundButton.setAttribute('aria-pressed',String(sound)); soundButton.textContent=sound?'Mute violin tones':'Enable violin tones';
    soundStatus.textContent=sound?'Violin strings only · sound on':'Violin strings only · sound off';
  });
  showLine(0);
  const visible = new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();});visible.observe(stage);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  reduced.addEventListener('change',()=>stage.getAnimations({subtree:true}).forEach(animation=>animation.cancel()));
  window.addEventListener('pagehide',event=>{
    stop();
    sound=false;
    soundButton.setAttribute('aria-pressed','false');
    soundButton.textContent='Enable violin tones';
    soundStatus.textContent='Violin strings only · sound off';
    audio?.suspend();
    if(!event.persisted){visible.disconnect();audio?.close();}
  });

  const contact = finale.querySelector('.final-contact');
  const composer = document.createElement('div'); composer.className='contact-prompts';
  composer.innerHTML='<span>Start a conversation</span><button type="button">Build something together</button><button type="button">Talk cybersecurity</button><button type="button">Just say hello</button>';
  contact.querySelector('h3').after(composer);
  composer.addEventListener('click',event=>{
    if(event.target.tagName!=='BUTTON')return;
    const message=document.getElementById('message');
    if(!message.value.trim()) message.value={'Build something together':'Hi Sean, I would like to collaborate on a project. ', 'Talk cybersecurity':'Hi Sean, I would love to connect about cybersecurity. ', 'Just say hello':'Hi Sean! I enjoyed exploring your portfolio. '}[event.target.textContent];
    message.focus();
  });
})();
