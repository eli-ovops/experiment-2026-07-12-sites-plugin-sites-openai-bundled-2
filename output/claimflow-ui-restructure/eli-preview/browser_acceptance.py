from pathlib import Path
import json

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError


URL = "https://eli.roxychao.com/?v=20260713-claimflow-final-polish-v1"
OUTPUT = Path(__file__).parent


def inspect(page, name, width, height):
    console_errors = []
    page.on("console", lambda msg: console_errors.append({"type": msg.type, "text": msg.text}) if msg.type in {"error", "warning"} else None)
    page.set_viewport_size({"width": width, "height": height})
    response = page.goto(URL, wait_until="domcontentloaded", timeout=30000)
    try:
        page.wait_for_load_state("networkidle", timeout=8000)
    except PlaywrightTimeoutError:
        pass
    result = page.evaluate(
        """() => ({
          title: document.title,
          h1Count: document.querySelectorAll('h1').length,
          h1: document.querySelector('h1')?.textContent?.trim(),
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
          mainCta: [...document.querySelectorAll('a,button')].some(el => el.textContent?.includes('Apply for a Recovery Pilot')),
          formCount: document.querySelectorAll('form').length,
          formLabels: document.querySelectorAll('form label').length,
          missingImageAlt: [...document.querySelectorAll('img')].filter(img => !img.hasAttribute('alt')).length,
          faqButtons: [...document.querySelectorAll('button')].filter(el => el.closest('[class*=faq], #faq, [data-faq]') || el.getAttribute('aria-expanded') !== null).length,
          fixedPilotCta: [...document.querySelectorAll('a,button')].some(el => getComputedStyle(el).position === 'fixed' && el.textContent?.includes('Pilot'))
        })"""
    )
    result.update({
        "viewport": name,
        "httpStatus": response.status if response else None,
        "consoleErrors": console_errors,
    })
    page.screenshot(path=str(OUTPUT / f"{name}.png"), full_page=False)
    return result


with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    results = []
    for name, width, height in [
        ("desktop-1440", 1440, 900),
        ("tablet-768", 768, 1024),
        ("mobile-390", 390, 844),
        ("mobile-320", 320, 720),
    ]:
        page = browser.new_page()
        results.append(inspect(page, name, width, height))
        page.close()
    browser.close()

(OUTPUT / "browser-acceptance.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(json.dumps(results, indent=2))
