// Muhammad Bayoumi — personal site.
// Behaviour sources are cited as [ID]; the IDs are defined in DESIGN.md → "Source registry".

// ── Content counters (site content, not design) ──
// <span data-years-since="2019">7</span>: the HTML carries a fallback number.
const thisYear = new Date().getFullYear();
document.querySelectorAll('[data-years-since]').forEach(el => {
  const start = parseInt(el.getAttribute('data-years-since'), 10);
  if (!Number.isNaN(start) && thisYear > start) el.textContent = String(thisYear - start);
});
document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = String(thisYear);
});

// ── Theme ──
// next-themes behaviour [EXT-NEXT-THEMES] with Supabase's settings: themes dark/light,
// default "system", attribute data-theme, storage key "theme", no transitions while
// switching [SB-COMMON-PROVIDERS packages/common/Providers.tsx:22-26].
const STORAGE_KEY = 'theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');

const readTheme = () => {
  try { return localStorage.getItem(STORAGE_KEY) || 'system'; } catch { return 'system'; }
};
const resolve = theme => (theme === 'system' ? (media.matches ? 'dark' : 'light') : theme);

const applyTheme = theme => {
  const resolved = resolve(theme);
  // disableTransitionOnChange: suspend transitions for one frame [EXT-NEXT-THEMES]
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.appendChild(style);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.style.colorScheme = resolved;
  window.getComputedStyle(document.body);
  requestAnimationFrame(() => style.remove());
  // Trigger icon: Sun when light, Moon otherwise [SB-DS-THEMESWITCHER theme-switcher-dropdown.tsx:45-51]
  document.querySelectorAll('[data-theme-icon]').forEach(icon => {
    // SVG elements have no .hidden property; toggle the attribute that preflight hides.
    icon.toggleAttribute('hidden', icon.getAttribute('data-theme-icon') !== (resolved === 'light' ? 'light' : 'dark'));
  });
  menuItems.forEach(item => {
    const checked = item.dataset.value === theme;
    item.setAttribute('aria-checked', String(checked));
    item.setAttribute('data-state', checked ? 'checked' : 'unchecked');
  });
};

const setTheme = theme => {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* storage blocked: theme lasts for this visit */ }
  applyTheme(theme);
};

media.addEventListener('change', () => {
  if (readTheme() === 'system') applyTheme('system');
});

// ── Theme menu ──
// Menu button pattern [EXT-APG-MENU-BUTTON] with the keyboard map Radix DropdownMenu
// implements [EXT-RADIX-DROPDOWN]: Enter/Space/ArrowDown open on the first item,
// ArrowUp opens on the last, arrows move without wrapping, Home/End jump,
// Escape closes and returns focus, Tab and outside clicks close.
const trigger = document.getElementById('theme-trigger');
const menu = document.getElementById('theme-menu');
const menuItems = [...menu.querySelectorAll('[role="menuitemradio"]')];

const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

const openMenu = focusIndex => {
  menu.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  trigger.setAttribute('data-state', 'open');
  menu.setAttribute('data-state', 'open');
  menuItems[focusIndex].focus();
};

const closeMenu = ({ restoreFocus = true } = {}) => {
  if (!isOpen()) return;
  menu.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('data-state', 'closed');
  menu.setAttribute('data-state', 'closed');
  if (restoreFocus) trigger.focus();
};

trigger.addEventListener('click', () => (isOpen() ? closeMenu() : openMenu(0)));
trigger.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openMenu(0);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    openMenu(menuItems.length - 1);
  }
});

menu.addEventListener('keydown', e => {
  const i = menuItems.indexOf(document.activeElement);
  const focusAt = n => menuItems[Math.max(0, Math.min(menuItems.length - 1, n))].focus();
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); focusAt(i + 1); break;
    case 'ArrowUp': e.preventDefault(); focusAt(i - 1); break;
    case 'Home': e.preventDefault(); focusAt(0); break;
    case 'End': e.preventDefault(); focusAt(menuItems.length - 1); break;
    case 'Escape': e.preventDefault(); closeMenu(); break;
    case 'Tab': closeMenu({ restoreFocus: false }); break;
  }
});

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    setTheme(item.dataset.value);
    closeMenu();
  });
  item.addEventListener('pointermove', () => item.focus());
});

document.addEventListener('pointerdown', e => {
  if (isOpen() && !menu.contains(e.target) && !trigger.contains(e.target)) closeMenu({ restoreFocus: false });
});

applyTheme(readTheme());

// ── Printing ──
// Paper is printed in the light theme, then the chosen theme comes back
// [EXT-MDN-BEFOREPRINT]. Supabase ships no print theme — see DESIGN.md → Deviations.
let themeBeforePrint = null;
window.addEventListener('beforeprint', () => {
  themeBeforePrint = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.style.colorScheme = 'light';
});
window.addEventListener('afterprint', () => {
  if (!themeBeforePrint) return;
  document.documentElement.setAttribute('data-theme', themeBeforePrint);
  document.documentElement.style.colorScheme = themeBeforePrint;
  themeBeforePrint = null;
});

// ── Sticky header offset ──
// `scroll-mt-(--header-height)` needs the real header height [SB-DOC-SKIP skip-to-content.mdx "Usage"].
const header = document.getElementById('site-header');
const setHeaderHeight = () =>
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
setHeaderHeight();
new ResizeObserver(setHeaderHeight).observe(header);

// ── Section tabs ──
// NavMenuItem shows data-state="active" [SB-UI-NAVMENU NavMenu/index.tsx:33-34]; the link
// carries aria-current instead of aria-selected [EXT-MDN-ARIA-CURRENT] — see Deviations.
const tabItems = [...document.querySelectorAll('.sb-navmenu-item')];
const tabLinks = tabItems.map(li => li.querySelector('a'));
const sections = tabLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

// Scroll only the tab row sideways; scrollIntoView() would also move the page
// and cut short a smooth scroll that is under way.
const tabList = document.querySelector('.sb-navmenu-list');
const keepTabVisible = li => {
  const start = li.getBoundingClientRect().left - tabList.getBoundingClientRect().left + tabList.scrollLeft;
  const end = start + li.offsetWidth;
  if (start < tabList.scrollLeft) tabList.scrollLeft = start;
  else if (end > tabList.scrollLeft + tabList.clientWidth) tabList.scrollLeft = end - tabList.clientWidth;
};

const setActive = id => {
  tabItems.forEach((li, n) => {
    const active = tabLinks[n].getAttribute('href') === '#' + id;
    li.setAttribute('data-state', active ? 'active' : 'inactive');
    if (active) {
      tabLinks[n].setAttribute('aria-current', 'true');
      keepTabVisible(li);
    } else {
      tabLinks[n].removeAttribute('aria-current');
    }
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Document pages: "On this page" ──
// A section is active once its heading reaches the top fifth of the viewport,
// the zone the design-system TOC watches with rootMargin "0% 0% -80% 0%"
// [SB-DS-TOC apps/design-system/components/toc.tsx:44-54]. It is measured on
// scroll instead of by an IntersectionObserver, which misses headings that a
// fast scroll or a jump skips over (see Deviations). The matching link takes
// NavigationItem's active state [SB-DS-SIDENAV-ITEM side-navigation-item.tsx:33-35].
const tocLinks = [...document.querySelectorAll('[data-toc] a[href^="#"]')];
if (tocLinks.length) {
  const ids = [...new Set(tocLinks.map(a => a.getAttribute('href').slice(1)))];
  const headings = ids.map(id => document.getElementById(id)).filter(Boolean);
  const setTocActive = id => {
    tocLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + id;
      a.setAttribute('data-state', active ? 'active' : 'inactive');
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };
  let tocFrame = 0;
  const updateToc = () => {
    tocFrame = 0;
    const limit = window.innerHeight * 0.2;
    let current = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= limit) current = h;
      else break;
    }
    setTocActive(current.id);
  };
  updateToc();
  window.addEventListener('scroll', () => { if (!tocFrame) tocFrame = requestAnimationFrame(updateToc); }, { passive: true });
  window.addEventListener('resize', updateToc);
}

// On phones the list sits in an accordion; picking a section closes it.
document.querySelectorAll('details.doc-toc-mobile a').forEach(a => {
  a.addEventListener('click', () => a.closest('details').removeAttribute('open'));
});

// Print buttons print the page itself [EXT-MDN-PRINT]; the beforeprint handler
// above switches to the light theme first.
document.querySelectorAll('[data-print]').forEach(button => {
  button.addEventListener('click', () => window.print());
});
