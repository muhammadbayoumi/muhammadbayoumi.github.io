"""Build cv.pdf from cv.html.

Run from the repository root after every change to cv.html:

    python tools/build-cv-pdf.py

Needs Playwright with Chromium:

    pip install playwright
    python -m playwright install chromium

The page prints exactly as a browser prints it: A4 with the margins of the @page
rule in assets/css/site.css, the print media query, and the light theme (the
beforeprint handler in main.js does not run during a headless PDF export, so the
theme is set before the page loads). Background graphics are off, as they are by
default in a browser's print dialog [EXT-PLAYWRIGHT-PDF].
"""

import pathlib

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "cv.html"
TARGET = ROOT / "cv.pdf"


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(color_scheme="light")
        page.add_init_script("try { localStorage.setItem('theme', 'light'); } catch (e) {}")
        page.goto(SOURCE.as_uri(), wait_until="networkidle")
        page.evaluate("document.fonts.ready.then(() => true)")
        page.emulate_media(media="print")
        page.pdf(
            path=str(TARGET),
            prefer_css_page_size=True,
            print_background=False,
            outline=True,
            tagged=True,
        )
        browser.close()
    print(f"wrote {TARGET.relative_to(ROOT)} ({TARGET.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
