/* Small interaction layer for SEAN. Content remains in the original HTML. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const hero = document.getElementById('home');
  const portrait = document.querySelector('.hero-portrait');
  const book = document.getElementById('identityBook');
  const read = document.getElementById('bookRead');
  const follow = document.getElementById('bookScroll');
  const status = document.getElementById('bookStatus');
  let frame = 0;
  // Keep the hero lighting static; moving its gradient repainted the whole hero.

  document.querySelector('.book-controls').hidden = false;
  if (!book.hasAttribute('data-interactive-book')) {
  read.addEventListener('click', () => {
    const open = !book.classList.contains('book-reading');
    book.classList.toggle('book-reading', open);
    read.setAttribute('aria-expanded', String(open));
    read.textContent = open ? 'Return to page turns ↶' : 'Open my story ↗';
    status.textContent = open
      ? 'The whole story is open. Every page is available below.'
      : 'Scroll forward or backward to turn the pages.';
  });
  follow.addEventListener('click', () => {
    book.classList.remove('book-reading');
    read.setAttribute('aria-expanded', 'false');
    read.textContent = 'Open my story ↗';
    status.textContent = 'Scroll forward or backward to turn the pages.';
    book.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
  });

  }

  const detail = document.getElementById('treeDetail');
  const archive = document.getElementById('treeArchive');
  archive.addEventListener('click', event => {
    if (!event.target.closest('[data-tree-leaf]')) return;
    detail.classList.remove('is-opening');
    requestAnimationFrame(() => detail.classList.add('is-opening'));
  });
  const observer = new ResizeObserver(() => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      window.SeanScroll?.refresh();
    });
  });
  observer.observe(document.getElementById('experience'));

  // The mobile menu must also close when a chapter is chosen during its opening transition.
  const menu = document.getElementById('navMenu');
  menu.addEventListener('click', event => {
    const link = event.target.closest('a[data-chapter-link]');
    if (!link) return;
    const collapse = window.bootstrap?.Collapse.getOrCreateInstance(menu, { toggle: false });
    if (menu.classList.contains('collapsing')) {
      menu.addEventListener('shown.bs.collapse', () => collapse?.hide(), { once: true });
    } else {
      collapse?.hide();
    }
    const target = document.querySelector(link.getAttribute('href'));
    target?.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
  });
  menu.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    window.bootstrap?.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    document.querySelector('.navbar-toggler').focus();
  });

  const form = document.querySelector('.final-contact__form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = 'Portfolio message from ' + data.get('name');
    const body = data.get('message') + '\n\nFrom: ' + data.get('name') + '\nReply to: ' + data.get('email');
    location.href = form.action + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  window.addEventListener('blur', () => {
    document.getElementById('enchantedCursor')?.classList.remove('is-visible', 'is-pressed');
    document.documentElement.classList.remove('enchanted-pointer-ready');
  });
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    observer.disconnect();
    if (frame) cancelAnimationFrame(frame);
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) window.SeanScroll?.refresh();
  });
})();

