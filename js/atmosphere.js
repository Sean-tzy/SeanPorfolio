/* The shared atmosphere is decorative. Native scrolling owns the journey. */
(() => {
  const canvas = document.getElementById('seanField');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const chapters = [...document.querySelectorAll('main > section[data-chapter]')];
  const caption = document.getElementById('chapterCoordinate');
  const cursor = document.getElementById('enchantedCursor');
  const label = document.getElementById('cursorLabel');
  const cards = '.education-card__panel,.guardian-card,.skills-panel,.tree-leaf,.discovery-artifact,.final-contact';
  document.querySelectorAll(cards).forEach(el => el.dataset.lightCard = '');
  const pointer = { x: -1000, y: -1000, active: false };
  const motes = [];
  const sparks = [];
  let width = 0, height = 0, frame = 0, last = 0, time = 0, scrollFrame = 0;
  let offsets = [], active = '', disposed = false;

  function measure() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    motes.length = 0;
    for (let i = 0; i < (width < 768 ? 18 : 42); i++) {
      motes.push({ x: Math.random() * width, y: Math.random() * height, phase: Math.random() * 6.28, size: .5 + Math.random() * 1.5, speed: .12 + Math.random() * .3 });
    }
    offsets = chapters.map(el => ({ el, top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight }));
    updateChapter();
  }

  function updateChapter() {
    scrollFrame = 0;
    const line = scrollY + innerHeight * .4;
    const current = offsets.filter(item => item.top <= line).at(-1) || offsets[0];
    if (!current) return;
    const id = current.el.dataset.chapter;
    if (id !== active) {
      active = id;
      root.dataset.scene = id;
      caption.textContent = id + ' / 07 — ' + current.el.querySelector('h1,h2').textContent.replace(/\s+/g, ' ').trim();
    }
    if (!reduced.matches) {
      root.style.setProperty('--sky-y', Math.round((scrollY / Math.max(document.documentElement.scrollHeight - height, 1) - .5) * 70) + 'px');
    }
  }
  function scheduleChapter() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateChapter); }

  function draw(now) {
    frame = 0;
    if (disposed || reduced.matches || document.hidden) return;
    frame = requestAnimationFrame(draw);
    const interval = width < 768 ? 50 : 33;
    if (now - last < interval) return;
    const step = Math.min((now - last) / 33, 2);
    last = now; time += step * .009;
    ctx.clearRect(0, 0, width, height);
    // Fine flowing contours connect the forest to a technical, computational texture.
    for (let j = 0; j < (width < 768 ? 7 : 13); j++) {
      ctx.beginPath();
      for (let x = -20; x <= width + 24; x += 24) {
        const baseline = height * (.55 + j * .028);
        let y = baseline + Math.sin(x / 220 + time + j * .14) * 58 + Math.cos(x / 430 - time * .6) * 70;
        if (pointer.active) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          y += Math.exp(-distance * distance / 50000) * Math.sin(time * 2 + j * .2) * 40;
        }
        y -= (scrollY % height) * .025;
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(159,190,118,' + (.035 + j * .003) + ')';
      ctx.lineWidth = .75; ctx.stroke();
    }
    for (const mote of motes) {
      mote.y -= mote.speed * step; mote.x += Math.sin(time + mote.phase) * .2 * step;
      if (mote.y < -10) mote.y = height + 10;
      let x = mote.x, y = mote.y;
      if (pointer.active) {
        const dx = pointer.x - x, dy = pointer.y - y, distance = Math.hypot(dx, dy);
        if (distance < 160) { x -= dx * .12; y -= dy * .12; }
      }
      const alpha = .2 + (Math.sin(time * 1.8 + mote.phase) + 1) * .2;
      ctx.fillStyle = 'rgba(206,218,150,' + alpha + ')';
      ctx.beginPath(); ctx.arc(x, y, mote.size, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.life -= .025 * step; spark.x += spark.vx * step; spark.y += spark.vy * step;
      if (spark.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.strokeStyle = 'rgba(224,219,167,' + spark.life * .7 + ')';
      ctx.beginPath(); ctx.moveTo(spark.x - 2, spark.y); ctx.lineTo(spark.x + 2, spark.y);
      ctx.moveTo(spark.x, spark.y - 2); ctx.lineTo(spark.x, spark.y + 2); ctx.stroke();
    }
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; last = 0;
    if (reduced.matches || document.hidden || disposed) { ctx.clearRect(0, 0, width, height); return; }
    frame = requestAnimationFrame(draw);
  }
  let hoveredButton = null, hoveredCard = null;
  function resetHover() {
    if (hoveredButton) { hoveredButton.style.removeProperty('--magnet-x'); hoveredButton.style.removeProperty('--magnet-y'); }
    hoveredButton = null; hoveredCard = null;
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !fine.matches || reduced.matches) return;
    pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true;
    root.style.setProperty('--sky-x', ((event.clientX / width - .5) * 22).toFixed(1) + 'px');
    const card = event.target.closest(cards);
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--card-x', (event.clientX - rect.left).toFixed(1) + 'px');
      card.style.setProperty('--card-y', (event.clientY - rect.top).toFixed(1) + 'px');
    }
    hoveredCard = card;
    const button = event.target.closest('.hero-actions .btn,.final-contact__form .btn');
    if (button !== hoveredButton) resetHover();
    if (button) {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--magnet-x', ((event.clientX - rect.left - rect.width / 2) * .09).toFixed(1) + 'px');
      button.style.setProperty('--magnet-y', ((event.clientY - rect.top - rect.height / 2) * .12).toFixed(1) + 'px');
      hoveredButton = button;
    }
    const target = event.target.closest('a,button');
    cursor.classList.toggle('is-link', !!target);
    label.textContent = target?.matches('[data-tree-leaf]') ? 'OPEN' : target?.matches('.tree-branch-tab') ? 'EXPLORE' : target?.id === 'bookRead' ? 'READ' : target ? 'FOLLOW' : '';
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (reduced.matches || !fine.matches || event.pointerType !== 'mouse' || event.target.closest('input,textarea')) return;
    for (let i = 0; i < 9; i++) {
      const angle = Math.PI * 2 * i / 9;
      sparks.push({ x: event.clientX, y: event.clientY, vx: Math.cos(angle) * 1.7, vy: Math.sin(angle) * 1.7, life: .8 });
    }
    if (sparks.length > 45) sparks.splice(0, sparks.length - 45);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.active = false; resetHover(); });
  window.addEventListener('blur', () => { pointer.active = false; resetHover(); });
  window.addEventListener('scroll', scheduleChapter, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { resetHover(); sync(); });
  const resize = new ResizeObserver(measure);
  resize.observe(document.getElementById('mainContent'));
  const lines = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-reading', entry.isIntersecting)), { rootMargin: '-40% 0px -40% 0px' });
  document.querySelectorAll('[data-final-story]').forEach(el => lines.observe(el));
  window.addEventListener('pagehide', event => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (event.persisted) return;
    disposed = true; resize.disconnect(); lines.disconnect();
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
  });
  window.addEventListener('pageshow', () => { measure(); sync(); });
  measure(); sync();
})();

