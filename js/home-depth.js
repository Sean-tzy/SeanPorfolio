/* The hero responds only while visible and only to a fine pointer. */
(() => {
  const home = document.getElementById('home');
  const world = document.getElementById('villageWorld');
  if (!home || !world) return;

  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let frame = 0;
  let x = 0;
  let y = 0;

  const reset = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    for (const name of ['far', 'back', 'front', 'house', 'palm', 'shrubs', 'rim', 'rim-far']) {
      world.style.removeProperty('--depth-' + name);
    }
    world.style.removeProperty('--depth-rotate-x');
    world.style.removeProperty('--depth-rotate-y');
  };

  const move = event => {
    if (!visible || !fine.matches || reduced.matches || event.pointerType !== 'mouse') return;
    const box = home.getBoundingClientRect();
    x = Math.max(-18, Math.min(18, ((event.clientX - box.left) / box.width - .5) * 36));
    y = Math.max(-12, Math.min(12, ((event.clientY - box.top) / box.height - .5) * 24));
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      for (const [name, dx, dy] of [
        ['far', -.16, -.14], ['back', -.32, -.23], ['front', -.5, -.35],
        ['house', -.72, -.52], ['palm', -1, -.75], ['shrubs', -1.25, -.9],
        ['rim', -1.45, -.8], ['rim-far', -.72, -.4]
      ]) {
        world.style.setProperty('--depth-' + name,
          `translate3d(${(x * dx).toFixed(1)}px, ${(y * dy).toFixed(1)}px, 0)`);
      }
      world.style.setProperty('--depth-rotate-x', (-y * .09).toFixed(2) + 'deg');
      world.style.setProperty('--depth-rotate-y', (x * .09).toFixed(2) + 'deg');
    });
  };

  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible) reset();
  });
  observer.observe(home);
  home.addEventListener('pointermove', move, { passive: true });
  home.addEventListener('pointerleave', reset);
  fine.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  window.addEventListener('pagehide', event => { reset(); if (!event.persisted) observer.disconnect(); });
})();
