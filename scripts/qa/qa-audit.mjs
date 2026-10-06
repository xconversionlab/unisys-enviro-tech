import { chromium } from 'playwright-core';

const base = process.env.BASE || 'http://localhost:12000';
const routes = ['/', '/about', '/about/company', '/about/certificates', '/services',
  '/services/water-treatment-system', '/services/sewage-treatment-system',
  '/services/reverse-osmosis-system', '/services/water-wastewater-analysis',
  '/industries', '/clients', '/contact'];
const vps = [
  { name: 'phone320', width: 320, height: 720 },
  { name: 'phone', width: 360, height: 800 },
  { name: 'phoneL', width: 414, height: 896 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desk', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
let problems = 0;

for (const vp of vps) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => consoleErrors.push('reqfailed ' + r.url() + ' :: ' + (r.failure()?.errorText || '')));
  page.on('response', (r) => { if (r.status() >= 400) consoleErrors.push('status ' + r.status() + ' ' + r.url()); });

  for (const r of routes) {
    const resp = await page.goto(base + r, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(300);
    // scroll through so lazy images load, then wait for them to settle
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const t = setInterval(() => {
          window.scrollTo(0, y);
          y += 700;
          if (y > document.body.scrollHeight) { clearInterval(t); res(); }
        }, 30);
      });
    });
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const report = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      // find elements wider than the viewport
      const wide = [];
      document.querySelectorAll('body *').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth + 1 && rect.height > 0) {
          const style = getComputedStyle(el);
          if (style.position !== 'fixed' && style.overflowX !== 'hidden' && style.overflowX !== 'clip') {
            wide.push({ tag: el.tagName, cls: String(el.className).slice(0, 70), w: Math.round(rect.width) });
          }
        }
      });
      const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
      const imgs = [...document.querySelectorAll('img')].map((i) => ({
        src: i.currentSrc || i.src,
        ok: i.complete && i.naturalWidth > 0,
        alt: i.getAttribute('alt'),
      }));
      return { overflow, wide: wide.slice(0, 5), h1s, imgCount: imgs.length, brokenImgs: imgs.filter((i) => !i.ok), noAlt: imgs.filter((i) => i.alt === null) };
    });

    const issues = [];
    if (report.overflow > 1) issues.push(`overflow ${report.overflow}px`);
    if (report.overflow > 1 && report.wide.length) issues.push(`wide: ${JSON.stringify(report.wide)}`);
    if (report.h1s.length !== 1) issues.push(`h1 count ${report.h1s.length}`);
    if (report.brokenImgs.length) issues.push(`broken imgs ${report.brokenImgs.length}: ${report.brokenImgs.map(i=>i.src).join(',')}`);
    if (report.noAlt.length) issues.push(`imgs missing alt attr: ${report.noAlt.length}`);
    if (resp && resp.status() >= 400) issues.push(`status ${resp.status()}`);

    if (issues.length) {
      problems++;
      console.log(`✗ [${vp.name} ${vp.width}] ${r} :: ${issues.join(' | ')}`);
    }
  }
  if (consoleErrors.length) {
    console.log(`  console errors @${vp.name}:`, [...new Set(consoleErrors)].slice(0, 4));
  }
  await ctx.close();
}

await browser.close();
console.log(problems === 0 ? 'ALL CLEAN' : `${problems} route/viewport issues`);
