// Muhammad Bayoumi — personal site

// Years since a start year, e.g. <span data-years-since="2019">7</span>.
// The HTML carries a fallback number so the page reads correctly without JS.
const thisYear = new Date().getFullYear();
document.querySelectorAll('[data-years-since]').forEach(el => {
  const start = parseInt(el.getAttribute('data-years-since'), 10);
  if (!Number.isNaN(start) && thisYear > start) el.textContent = String(thisYear - start);
});
document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = String(thisYear);
});

// Navbar: shadow once scrolled, mobile menu toggle.
const navbar = document.getElementById('navbar');
const toggler = navbar.querySelector('.navbar-toggler');
const menu = document.getElementById('navMenu');

const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const setOpen = open => {
  navbar.classList.toggle('open', open);
  toggler.setAttribute('aria-expanded', String(open));
  toggler.querySelector('i').className = open ? 'bi bi-x-lg' : 'bi bi-list';
};
toggler.addEventListener('click', () => setOpen(!navbar.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

// Highlight the nav link of the section in view.
const links = [...menu.querySelectorAll('.nav-link')];
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}
