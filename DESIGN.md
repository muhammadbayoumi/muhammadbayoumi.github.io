# Design system rules

This site is built on the **Supabase Design System**. Every token, component, layout
rule and behaviour in the code has a source, cited next to it. This file defines the
rules, the sources, and every place the site departs from them.

Supabase is pinned to commit
[`e3febf3`](https://github.com/supabase/supabase/tree/e3febf3b632a24bca72d73fd644f83a983f7cf84)
(Apache-2.0). All Supabase paths below are at that commit.

## Rules

### 1. Supabase first, then its dependencies, then standards

Look for a source in this order and use the first tier that covers the need:

| Tier | What it is | Examples |
| --- | --- | --- |
| **1 — Supabase** | The design system and the Supabase code that uses it | `apps/design-system` (docs, registry examples, site chrome), `packages/ui`, `packages/ui-patterns`, `packages/config`, `packages/common`, `apps/www` (supabase.com), and `apps/studio` when it shows how a component is laid out |
| **2 — What Supabase is built on** | Libraries Supabase names, at the versions it pins | Tailwind CSS 4.2.4 (what a class compiles to), Lucide 0.436.0 (icons), next-themes (theme switching), Radix (widget behaviour) |
| **3 — Standards** | Used only when tiers 1–2 have nothing | WAI-ARIA APG, WCAG, MDN, the HTML spec |

A tier-3 source is a **deviation**: it gets a row in [Deviations](#deviations).
Code with no source is a bug.

### 2. Cite every rule where it is written

Write `[ID path:lines]` in a comment next to the rule. `ID` is from the
[Source registry](#source-registry); add a new row there before you use a new ID.
Quote the upstream Tailwind classes when you translate them, so the translation can
be checked by eye.

```css
.sb-card-title {                                /* :32 "text-xs font-mono uppercase" */
```

### 3. Vendored files are read-only

`assets/vendor/supabase/` holds the colour tokens exactly as Supabase ships them, and
`assets/vendor/tailwind/preflight.css` holds Tailwind's reset with only its build-time
`--theme()` calls resolved. Never edit them. To change a value, override it in
`assets/css/tokens.css` with a cited source.

To move to a newer Supabase commit: copy the five token files again, check the blob
hashes in [`assets/vendor/supabase/README.md`](assets/vendor/supabase/README.md),
re-check every cited line number, and update the commit above.

### 4. Class names say where a rule comes from

| Prefix | Meaning | File |
| --- | --- | --- |
| `sb-` | A Supabase component, translated from its source; any change to it cites a Supabase source too | `assets/css/components.css` |
| `site-` | How this page arranges those components | `assets/css/site.css` |
| (none) | Tokens, base elements, and Supabase utilities (`no-scrollbar`, `sr-only`) | `assets/css/tokens.css` |

`site.css` changes an `sb-` component only where a Supabase source composes it that
way — for example PageHeader removing NavMenu's border — and cites that source.

### 5. Adding something new

1. Search the design-system docs (`apps/design-system/content/docs`) and the registry
   examples (`apps/design-system/registry/default/example`) for a match.
2. Found it: translate its classes into an `sb-` rule and cite the file and lines.
3. Not there: look for it in how Supabase itself uses the system (`apps/studio`,
   `apps/design-system/components`), then in tier 2.
4. Still nothing: use a tier-3 standard, add it to the registry, and add a Deviations row.
5. Write the copy by [`copywriting.mdx`](#copy) and check the result against the
   checklist in `accessibility.mdx`.

### Copy

UI text follows [SB-DOC-COPY]: verb-first button labels ("Send email", "View source"),
sentence-case headings and section labels, title case for the tabs, section
descriptions as fragments with no trailing period, no marketing words and no
exclamation marks.

The biography, the mbiX story and project descriptions are the owner's own writing,
not UI copy, and are kept as written.

## Source registry

### Tier 1 — Supabase

| ID | Source |
| --- | --- |
| SB-TOK | Colour tokens, vendored: `packages/ui/build/css/source/{global,semantic,compat}.css`, `packages/ui/build/css/themes/{dark,light}.css` |
| SB-CFG-THEME | [`packages/config/css/theme.css`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/config/css/theme.css) — font stacks, `--radius-panel`, `--spacing-card` |
| SB-CFG-UTIL | [`packages/config/css/utilities.css`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/config/css/utilities.css) — `focus-ring`, `no-scrollbar` |
| SB-CFG-VAR | [`packages/config/css/variants.css`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/config/css/variants.css) — the `dark:` variant |
| SB-CFG-TYPO | [`packages/config/typography.css`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/config/typography.css) — heading and text shorthands |
| SB-DS-GLOBALS | [`apps/design-system/styles/globals.css`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/styles/globals.css) — fonts, type scale, base layer |
| SB-DS-FONTS | [`apps/design-system/lib/fonts.ts`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/lib/fonts.ts) — Inter, Manrope, Source Code Pro |
| SB-DS-LAYOUT | [`apps/design-system/app/layout.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/app/layout.tsx) — `theme-color` |
| SB-DS-TOPNAV | [`apps/design-system/components/top-navigation.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/components/top-navigation.tsx) |
| SB-WWW-FOOTER | [`apps/www/components/Footer/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/www/components/Footer/index.tsx) — the supabase.com footer |
| SB-WWW-NAV | [`apps/www/components/Nav/RightClickBrandLogo.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/www/components/Nav/RightClickBrandLogo.tsx) — header logo height `h-6` |
| SB-WWW-SECTION | [`apps/www/components/Layouts/SectionContainer.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/www/components/Layouts/SectionContainer.tsx) — footer padding |
| SB-WWW-LIVE | supabase.com measured in Chromium on 2026-09-25 at 375, 700 and 1366px wide: footer body padding 64/72/96px, bar 128px below the columns with 32px above its text, 22px icons, column headings Manrope 600 at 15px, `small` at 12px in the lighter foreground |
| SB-DS-FOOTER | [`apps/design-system/components/site-footer.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/components/site-footer.tsx) — footer row that stacks on small screens |
| SB-DS-THEMESWITCHER | [`apps/design-system/components/theme-switcher-dropdown.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/components/theme-switcher-dropdown.tsx) |
| SB-DS-EX | Registry examples: [`apps/design-system/registry/default/example/`](https://github.com/supabase/supabase/tree/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/registry/default/example) (file named at each use) |
| SB-DS-EX-DETAIL | [`…/example/page-layout-detail.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/registry/default/example/page-layout-detail.tsx) — the page template |
| SB-DS-TYPO-EX | [`…/example/typography-*.tsx`](https://github.com/supabase/supabase/tree/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/registry/default/example) — h1, lead, p, muted |
| SB-UI-BUTTON | [`packages/ui/src/components/Button/Button.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/Button/Button.tsx) |
| SB-UI-CONST | [`packages/ui/src/lib/constants.ts`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/lib/constants.ts) — button sizes |
| SB-UI-BADGE | [`packages/ui/src/components/shadcn/ui/badge.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/shadcn/ui/badge.tsx) |
| SB-UI-CARD | [`packages/ui/src/components/shadcn/ui/card.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/shadcn/ui/card.tsx) |
| SB-UI-SEPARATOR | [`packages/ui/src/components/shadcn/ui/separator.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/shadcn/ui/separator.tsx) |
| SB-UI-DROPDOWN | [`packages/ui/src/components/shadcn/ui/dropdown-menu.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/shadcn/ui/dropdown-menu.tsx) |
| SB-UI-NAVMENU | [`packages/ui/src/components/NavMenu/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/NavMenu/index.tsx) |
| SB-UI-FLOATINGPLATE | [`packages/ui/src/components/FloatingPlate/FloatingPlate.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/FloatingPlate/FloatingPlate.tsx) |
| SB-UI-THEMES | [`packages/ui/src/components/ThemeProvider/singleThemes.ts`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/ThemeProvider/singleThemes.ts) |
| SB-UI-ICONBASE | [`packages/ui/src/components/Icon/IconBase.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/Icon/IconBase.tsx) — 16×16 viewBox |
| SB-UI-ICON-GITHUB | [`packages/ui/src/components/Icon/icons/IconGitHubSolid/IconGitHubSolid.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/Icon/icons/IconGitHubSolid/IconGitHubSolid.tsx) |
| SB-UI-ICON-EMAIL | [`packages/ui/src/static/icons/email-icon.svg`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/static/icons/email-icon.svg) — solid envelope |
| SB-UI-ICON-LINKEDIN | [`packages/ui/src/components/Icon/icons/IconLinkedinSolid/IconLinkedinSolid.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui/src/components/Icon/icons/IconLinkedinSolid/IconLinkedinSolid.tsx) |
| SB-UIP-PAGECONTAINER | [`packages/ui-patterns/src/PageContainer/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/PageContainer/index.tsx) |
| SB-UIP-PAGEHEADER | [`packages/ui-patterns/src/PageHeader/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/PageHeader/index.tsx) |
| SB-UIP-PAGESECTION | [`packages/ui-patterns/src/PageSection/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/PageSection/index.tsx) |
| SB-UIP-METRICCARD | [`packages/ui-patterns/src/MetricCard/index.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/MetricCard/index.tsx) |
| SB-UIP-SKIP | [`packages/ui-patterns/src/SkipToContent/SkipToContent.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/SkipToContent/SkipToContent.tsx) |
| SB-UIP-THEMETOGGLE | [`packages/ui-patterns/src/ThemeToggle.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/ui-patterns/src/ThemeToggle.tsx) |
| SB-COMMON-PROVIDERS | [`packages/common/Providers.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/packages/common/Providers.tsx) — theme settings |
| SB-STUDIO-METRICS | [`apps/studio/components/interfaces/Observability/DatabaseInfrastructureSection.tsx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/studio/components/interfaces/Observability/DatabaseInfrastructureSection.tsx) — metric card grid |
| SB-DOC-COPY | [`…/content/docs/copywriting.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/copywriting.mdx) |
| SB-DOC-A11Y | [`…/content/docs/accessibility.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/accessibility.mdx) |
| SB-DOC-ICONS | [`…/content/docs/icons.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/icons.mdx) |
| SB-DOC-LAYOUT | [`…/content/docs/ui-patterns/layout.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/ui-patterns/layout.mdx) |
| SB-DOC-NAV | [`…/content/docs/ui-patterns/navigation.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/ui-patterns/navigation.mdx) |
| SB-DOC-SKIP | [`…/content/docs/fragments/skip-to-content.mdx`](https://github.com/supabase/supabase/blob/e3febf3b632a24bca72d73fd644f83a983f7cf84/apps/design-system/content/docs/fragments/skip-to-content.mdx) |

(`…` = `apps/design-system`.)

### Tier 2 — What Supabase is built on

| ID | Source | Why it applies |
| --- | --- | --- |
| TW | Tailwind CSS 4.2.4: [`theme.css`](https://cdn.jsdelivr.net/npm/tailwindcss@4.2.4/theme.css), [`preflight.css`](https://cdn.jsdelivr.net/npm/tailwindcss@4.2.4/preflight.css), [`dist/lib.js`](https://cdn.jsdelivr.net/npm/tailwindcss@4.2.4/dist/lib.js) (utility output) — MIT | Supabase pins `tailwindcss: ^4.2.4` (`pnpm-workspace.yaml:47`); a class means what Tailwind compiles it to |
| LUCIDE | [lucide-static 0.436.0](https://cdn.jsdelivr.net/npm/lucide-static@0.436.0/icons/) — ISC | `icons.mdx`: "We rely on Lucide"; `packages/ui` pins `lucide-react ^0.436.0` |
| EXT-NEXT-THEMES | [next-themes](https://github.com/pacocoursey/next-themes) — pre-paint script, `data-theme`, storage key, `disableTransitionOnChange` | Supabase's ThemeProvider wraps next-themes (SB-COMMON-PROVIDERS) |
| EXT-RADIX-DROPDOWN | [Radix Dropdown Menu — keyboard interactions](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#keyboard-interactions) | `dropdown-menu.tsx` is built on Radix |

### Tier 3 — Standards

| ID | Source |
| --- | --- |
| EXT-APG-MENU-BUTTON | [WAI-ARIA APG: Menu Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) |
| EXT-APG-LANDMARK | [WAI-ARIA APG: Navigation landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html) |
| EXT-MDN-ARIA-CURRENT | [MDN: aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current) |
| EXT-MDN-OVERFLOW | [MDN: overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |
| EXT-MDN-REDUCED-MOTION | [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) |
| EXT-WCAG-HEADINGS | [WCAG 2.2 — 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) (heading structure) |
| EXT-MDN-PRINT | [MDN: Printing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing) — `@media print` |
| EXT-MDN-PAGE | [MDN: @page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page) — page size and margins |
| EXT-MDN-BREAK | [MDN: break-inside](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside) and [break-after](https://developer.mozilla.org/en-US/docs/Web/CSS/break-after) |
| EXT-MDN-COLUMNS | [MDN: columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns) — multi-column lists on paper |
| EXT-MDN-BEFOREPRINT | [MDN: beforeprint](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeprint_event) and [afterprint](https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event) events |
| EXT-PLAYWRIGHT-PDF | [Playwright: page.pdf()](https://playwright.dev/python/docs/api/class-page#page-pdf) — builds `cv.pdf` in `tools/build-cv-pdf.py` |
| EXT-HTML-BUTTON | [HTML: the button element — content model is phrasing content](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) |

## Deviations

Every place the site differs from its Supabase source, and why.

| Where | Supabase does | This site does | Reason / ref |
| --- | --- | --- | --- |
| NavMenu | `<ul role="menu">`, `aria-selected` on `<li>` | Plain list of links in a labelled `<nav>`; active link has `aria-current="true"` | A `menu` role is for application menus and needs `menuitem` children; `aria-selected` is not allowed on a list item. EXT-APG-LANDMARK, EXT-MDN-ARIA-CURRENT |
| NavMenu | `focus-ring` on the `<li>` | `focus-ring` on the `<a>` | The link is what takes focus. SB-DOC-A11Y ("When the focused element is not the thing that should show the ring…") |
| NavMenu | Row does not scroll | Row scrolls sideways on narrow screens, scrollbar hidden with Supabase's `no-scrollbar` | Seven tabs do not fit 375px. EXT-MDN-OVERFLOW |
| TopNavigation | Inner row `max-w-site` (128rem) with `border-l border-r` (framed docs layout) | Inner row uses PageContainer width, no side borders | The page has no framed sidebar layout; header and content line up. SB-UIP-PAGECONTAINER |
| TopNavigation | Title is an `<h1>` | Title is a link to the top | The page already has its `<h1>`. EXT-WCAG-HEADINGS |
| MetricCard label | CardTitle (`<h3>`) | `<p>` with the same classes | The cards come before the first `<h2>`; an `<h3>` there breaks heading order. EXT-WCAG-HEADINGS |
| Button icon container | `<div aria-hidden>` | `<span aria-hidden>` with the same classes | A `<button>` only accepts phrasing content. EXT-HTML-BUTTON |
| Theme trigger | Icon only, no accessible name in `theme-switcher-dropdown.tsx` | Adds `<span class="sr-only">Toggle theme</span>` | Taken from SB-UIP-THEMETOGGLE:56; SB-DOC-A11Y requires a name for non-image icons |
| DropdownMenu | Radix positioning (Floating UI) and `tw-animate-css` enter/exit | Fixed below-right placement (`align="end"`, `sideOffset` 4); no animation | No build step and no vendored animation source. SB-UI-DROPDOWN:81, SB-DS-THEMESWITCHER:54 |
| Hero title | PageHeaderTitle uses `heading-title` (text-2xl) | Typography h1 classes (text-4xl, lg:text-5xl) via `className` | A personal page's name is the page's main heading. SB-DS-TYPO-EX `typography-h1.tsx` |
| Footer | Security band ("We protect your data", SOC2/HIPAA/ISO) above the body (:88-110) | Left out; the gradient rule under it (:111) is kept as the footer's top edge | The band is Supabase's own compliance claims |
| Footer | Newsletter form (:168-204) | One line of copy in its place, styled as the form's lead (:178) | There is no newsletter to sign up for |
| Footer | Body inside SectionContainer (`max-w-7xl`, `px-6 lg:px-12 xl:px-24`) | Padding from SectionContainer, width from PageContainer | Lines the footer up with the header and the sections. SB-UIP-PAGECONTAINER |
| Footer | Column headings are `<h6>` | `<h3>` with the same classes, under the upstream `sr-only` `<h2>Footer</h2>` | Keeps heading levels in order. EXT-WCAG-HEADINGS |
| Footer | Link classes on an inner `<div>` inside each `<a>` | Same classes on the `<a>` | Same result; one element fewer. The ring sits on the focusable element per SB-DOC-A11Y |
| Footer | ThemeToggle at the right end of the bar (:254-256) | Theme stays in the header; the bar's right end carries the design-system credit | One theme control per page, in the header where the design-system site places it. SB-DS-TOPNAV:37 |
| Footer | Bar is one row at every width | Stacks and centres below `md`, one row from `md` | The two ends do not fit side by side at 375px; stacked as the design-system site's footer row is. SB-DS-FOOTER:6 |
| Footer | Email is not among the channel icons | Adds Supabase's solid envelope, its `fill="white"` changed to `currentColor` | A hardcoded fill cannot follow the link colour or the theme; SB-DOC-ICONS asks for `currentColor` and no hardcoded colours |
| Footer | Bar's left end is `<small>© Supabase Inc</small>` alone (:253) | A GitHub mark linking to this site's source opens the line, `flex items-center gap-2` (SB-DS-TOPNAV:35) | Owner's request, 2026-09-26. Icon link styles from :122 and :125 |
| Print (CV) | No print styles anywhere in Supabase | A print block in `site.css`: A4 page, screen chrome hidden, rows kept whole, lists and one-line cards in two columns | Rules from EXT-MDN-PRINT, EXT-MDN-PAGE, EXT-MDN-BREAK, EXT-MDN-COLUMNS. Every length reuses a Supabase step: page margin 3rem (PageSection `pt-12`), sections `gap-6`, rows `py-2` (size small), spacing `mt-2`/`mt-1`, grid `grid-cols-2` (footer columns) |
| Print (CV) | Theme follows the reader's choice | Always the light theme on paper, restored after printing | Paper is light; a dark page would print as a solid block. EXT-MDN-BEFOREPRINT; the PDF build sets the light theme before loading |
| CV bullet lists | Typography list `my-6 ml-6 list-disc [&>li]:mt-2` | Same, with `my-6` replaced by `pt-2` | The list sits inside a card row, where the Detail stack spaces its parts with `pt-2`. SB-DS-TYPO-EX `typography-list.tsx:3`, SB-DS-EX-DETAIL:84 |
