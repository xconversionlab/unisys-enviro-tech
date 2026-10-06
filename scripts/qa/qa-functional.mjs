import { chromium } from 'playwright-core';

const base = 'http://localhost:12000';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const out = [];

// --- Mobile menu open/close + nav to a service ---
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(200);
  const open = await page.locator('#mobile-navigation').isVisible();
  out.push(`mobile menu opens: ${open}`);
  await page.getByRole('button', { name: /Expand Products & Services/ }).click();
  await page.waitForTimeout(200);
  const subVisible = await page.getByRole("navigation", { name: "Mobile main navigation" }).getByRole("link", { name: "Reverse Osmosis System" }).isVisible();
  out.push(`mobile submenu expands: ${subVisible}`);
  await page.getByRole("navigation", { name: "Mobile main navigation" }).getByRole("link", { name: "Reverse Osmosis System" }).click();
  await page.waitForURL('**/services/reverse-osmosis-system', { timeout: 15000 });
  out.push(`mobile nav to service: ${page.url().endsWith('/services/reverse-osmosis-system')}`);
  const menuGone = (await page.locator('#mobile-navigation').count()) === 0;
  out.push(`menu closes after nav: ${menuGone}`);
  await ctx.close();
}

// --- Keyboard: tab to skip link, then to first nav ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  out.push(`first tab focus: "${focused}"`);
  await ctx.close();
}

// --- Desktop dropdown keyboard access ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const link = page.getByRole('link', { name: 'About Us' });
  await link.focus();
  await page.waitForTimeout(250);
  const childVisible = await page.getByRole("link", { name: "Certificates" }).first().isVisible();
  out.push(`desktop dropdown opens on focus: ${childVisible}`);
  await ctx.close();
}

// --- Contact form validation blocks empty submit ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.waitForTimeout(250);
  const errCount = await page.locator('[id$="-error"]').count();
  out.push(`validation errors on empty submit: ${errCount}`);
  const stillOnForm = await page.getByRole('button', { name: 'Send message' }).isVisible();
  out.push(`stays on form after invalid submit: ${stillOnForm}`);
  await page.fill('#name', 'Test User');
  await page.fill('#phone', '9884313191');
  await page.fill('#email', 'not-an-email');
  await page.fill('#message', 'Hello');
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.waitForTimeout(200);
  const emailErr = await page.locator('#email-error').count();
  out.push(`invalid email flagged: ${emailErr === 1}`);
  await ctx.close();
}

// --- Reduced motion: content visible ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const hidden = await page.locator('.reveal[data-reveal="hidden"]').count();
  out.push(`reduced motion leaves no hidden reveals: ${hidden === 0}`);
  await ctx.close();
}

// --- Images all load (naturalWidth > 0) ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const r of ['/', '/about', '/about/company', '/about/certificates', '/services',
    '/services/water-treatment-system', '/services/sewage-treatment-system',
    '/services/reverse-osmosis-system', '/services/water-wastewater-analysis',
    '/industries', '/clients', '/contact']) {
    await page.goto(base + r, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight;
          if (y < document.body.scrollHeight) setTimeout(step, 120);
          else setTimeout(resolve, 600);
        };
        step();
      });
    });
    const bad = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    if (bad.length) out.push(`broken images on ${r}: ${bad.join(', ')}`);
  }
  out.push('image check complete');
  await ctx.close();
}

await browser.close();
console.log(out.join('\n'));
