import { chromium } from 'playwright-core';

const base = 'http://localhost:12000';
const routes = ['/', '/about', '/about/company', '/about/certificates', '/services',
  '/services/water-treatment-system', '/services/sewage-treatment-system',
  '/services/reverse-osmosis-system', '/services/water-wastewater-analysis',
  '/industries', '/clients', '/contact'];

function lum(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function parseRGB(s) {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map((x) => parseFloat(x));
  return { rgb: parts.slice(0, 3), a: parts.length > 3 ? parts[3] : 1 };
}
function contrast(fg, bg) {
  const L1 = lum(fg), L2 = lum(bg);
  const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const issues = [];

for (const vp of [{ name: 'desk', width: 1440, height: 900 }, { name: 'mob', width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(300);

    const res = await page.evaluate(() => {
      const out = { headings: [], touch: [], nameless: [], contrast: [], noAlt: [], landmarks: {}, labels: [] };

      const lum = (rgb) => {
        const [r, g, b] = rgb.map((v) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const parseRGB = (s) => {
        const m = s.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const parts = m[1].split(',').map((x) => parseFloat(x));
        return { rgb: parts.slice(0, 3), a: parts.length > 3 ? parts[3] : 1 };
      };
      const contrast = (fg, bg) => {
        const L1 = lum(fg), L2 = lum(bg);
        const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
        return (hi + 0.05) / (lo + 0.05);
      };

      // headings
      document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
        out.headings.push({ tag: h.tagName, text: h.textContent.trim().slice(0, 60), visible: h.offsetParent !== null });
      });

      // touch targets (interactive)
      const interactive = document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]');
      interactive.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        if (el.offsetParent === null) return;
        // only inline-flow nav/footer links can be smaller; flag buttons and standalone controls
        if (rect.height < 24) {
          out.touch.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 30), h: Math.round(rect.height), w: Math.round(rect.width) });
        }
      });

      // accessible names for links/buttons
      interactive.forEach((el) => {
        if (el.offsetParent === null) return;
        const name = (el.getAttribute('aria-label') || el.textContent.trim() || el.getAttribute('title') || '').trim();
        if (!name && !el.querySelector('img[alt]:not([alt=""])') && el.tagName !== 'INPUT' && el.tagName !== 'SELECT' && el.tagName !== 'TEXTAREA') {
          out.nameless.push({ tag: el.tagName, html: el.outerHTML.slice(0, 100) });
        }
      });

      // form labels
      document.querySelectorAll('input, select, textarea').forEach((el) => {
        const id = el.id;
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
        if (!hasLabel && !aria) out.labels.push({ tag: el.tagName, type: el.type, name: el.name });
      });

      // images
      document.querySelectorAll('img').forEach((i) => {
        if (i.getAttribute('alt') === null) out.noAlt.push(i.src.slice(0, 80));
      });

      // landmarks
      out.landmarks = {
        header: document.querySelectorAll('header').length,
        main: document.querySelectorAll('main').length,
        footer: document.querySelectorAll('footer').length,
        nav: document.querySelectorAll('nav').length,
      };

      // contrast: sample visible text nodes
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      const seen = new Set();
      while ((n = walker.nextNode())) {
        const t = n.textContent.trim();
        if (!t || t.length < 3) continue;
        const el = n.parentElement;
        if (!el || el.offsetParent === null) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const fg = parseRGB(cs.color);
        if (!fg) continue;
        // find effective background
        let bgEl = el, bg = null;
        while (bgEl) {
          const b = parseRGB(getComputedStyle(bgEl).backgroundColor);
          if (b && b.a > 0.6) { bg = b.rgb; break; }
          bgEl = bgEl.parentElement;
        }
        if (!bg) bg = [255, 255, 255];
        const ratio = contrast(fg.rgb, bg);
        const size = parseFloat(cs.fontSize);
        const weight = parseInt(cs.fontWeight) || 400;
        const large = size >= 24 || (size >= 18.66 && weight >= 700);
        const min = large ? 3 : 4.5;
        const key = `${cs.color}|${bg.join(',')}|${Math.round(size)}|${weight}`;
        if (ratio < min && !seen.has(key)) {
          seen.add(key);
          out.contrast.push({ text: t.slice(0, 40), fg: cs.color, bg: `rgb(${bg.join(',')})`, ratio: Math.round(ratio * 100) / 100, size: Math.round(size), weight, min });
        }
      }
      return out;
    });

    const tag = `[${vp.name}] ${r}`;
    // heading structure
    const h1s = res.headings.filter((h) => h.tag === 'H1');
    if (h1s.length !== 1) issues.push(`${tag} h1 count = ${h1s.length}`);
    // heading order: no jumps down more than 1
    let prev = 0;
    res.headings.filter((h) => h.visible).forEach((h) => {
      const lvl = parseInt(h.tag[1]);
      if (prev && lvl > prev + 1) issues.push(`${tag} heading jump h${prev}->h${lvl} (${h.text})`);
      prev = lvl;
    });
    if (res.noAlt.length) issues.push(`${tag} img missing alt: ${res.noAlt.join(',')}`);
    if (res.nameless.length) issues.push(`${tag} nameless controls: ${JSON.stringify(res.nameless)}`);
    if (res.labels.length) issues.push(`${tag} unlabelled inputs: ${JSON.stringify(res.labels)}`);
    if (res.landmarks.main !== 1) issues.push(`${tag} main landmarks = ${res.landmarks.main}`);
    if (res.landmarks.header < 1) issues.push(`${tag} no header landmark`);
    if (res.landmarks.footer < 1) issues.push(`${tag} no footer landmark`);
    if (res.contrast.length) issues.push(`${tag} contrast: ${JSON.stringify(res.contrast)}`);
    if (vp.name === 'mob' && res.touch.length) issues.push(`${tag} small touch targets: ${JSON.stringify(res.touch.slice(0, 6))}`);
  }
  await ctx.close();
}

await browser.close();
if (!issues.length) console.log('A11Y CLEAN');
else console.log(issues.join('\n'));
