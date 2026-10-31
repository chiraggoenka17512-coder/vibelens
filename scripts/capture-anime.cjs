const { chromium } = require('playwright');

async function capture() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Navigating to animejs.com...');
  await page.goto('https://animejs.com/', { waitUntil: 'networkidle' });
  
  // Wait for the intro animation to finish
  console.log('Waiting for animation intro to settle...');
  await page.waitForTimeout(5000);

  console.log('Capturing hero...');
  await page.screenshot({ path: 'animejs-hero.png' });

  // Scroll a bit down to capture the interactive features
  console.log('Scrolling down to interactive sections...');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'animejs-section-1.png' });

  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'animejs-section-2.png' });

  // Now capture easings page
  console.log('Navigating to easings...');
  await page.goto('https://animejs.com/easings/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'animejs-easings.png' });

  // Now capture documentation
  console.log('Navigating to docs...');
  await page.goto('https://animejs.com/documentation/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'animejs-docs-detail.png' });

  await browser.close();
  console.log('Capture complete!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
