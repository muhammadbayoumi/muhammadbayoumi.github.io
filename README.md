# muhammadbayoumi.github.io

Personal website of Muhammad Bayoumi — live at **https://muhammadbayoumi.github.io**

Built on the [Supabase Design System](https://supabase.com/design-system). Plain HTML,
CSS and JavaScript with no build step; GitHub Pages serves the `main` branch as is.

**Before changing anything, read [DESIGN.md](DESIGN.md)**: every token, component and
layout rule has a cited source, and new work must follow the same rules.

```
index.html                 the home page
cv.html                    the CV (content from the LinkedIn profile)
cv.pdf                     the CV as a PDF, built from cv.html
assets/vendor/supabase/    Supabase colour tokens, unmodified (Apache-2.0)
assets/vendor/tailwind/    Tailwind preflight (MIT)
assets/css/tokens.css      fonts, type scale, radius, base layer
assets/css/components.css  Supabase components (sb-*)
assets/css/site.css        page composition (site-*)
assets/js/main.js          theme menu, section tabs, counters, print theme
tools/build-cv-pdf.py      rebuilds cv.pdf
```

Third-party licences: Supabase (Apache-2.0) in `assets/vendor/supabase/LICENSE`,
Tailwind CSS (MIT) in `assets/vendor/tailwind/LICENSE`, Lucide icons (ISC) inline in
`index.html`.

## Updating the CV

`cv.pdf` is not written by hand. After any change to `cv.html` (or to the CSS it
uses), rebuild it from the repository root and commit both files together:

```bash
python tools/build-cv-pdf.py
```

It needs Playwright with Chromium (`pip install playwright`, then
`python -m playwright install chromium`).
