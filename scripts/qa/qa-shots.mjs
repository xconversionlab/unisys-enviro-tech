import { chromium } from 'playwright-core';
const base = 'http://localhost:12000';
const routes = ['/', '/about', '/about/company', '/about/certificates', '/services',
  '/services/water-treatment-system', '/services/sewage-treatment-system',
  '/services/reverse-osmosis-system', '/services/water-wastewater-analysis',
  '/industries', '/clients', '/contact'];
const vps = [{ name: 'desk', width: 1440, height: 900 }, { name: 'mob', width: 390, height: 844 }];
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const tag = process.argv[2] || 'base';
for (const vp of vps) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);
    await page.evaluate(async () => { await new Promise(res => { let y = 0; const t = setInterval(() => { window.scrollTo(0, y); y += 600; if (y > document.body.scrollHeight) { clearInterval(t); res(); } }, 40); }); });
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const name = r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-');
    await page.screenshot({ path: `/tmp/shots/${tag}-${vp.name}-${name}.png`, fullPage: true });
    console.log('shot', tag, vp.name, r);
  }
  await ctx.close();
}
await browser.close();
