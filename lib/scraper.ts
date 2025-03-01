"use server";

import puppeteer, { Browser } from "puppeteer";

export async function scrapePage(
  url: string,
  timeout: number = 15_000
): Promise<string | null> {
  let browser = null as Browser | null;
  try {
    browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout,
    });

    const htmlContent = await page.evaluate(() => document.body.innerText);

    const textContent = htmlContent.replace(/<[^>]*>?/gm, "");

    console.log(textContent);

    return textContent;
  } catch (e) {
    console.log(e);

    return null;
  } finally {
    if (browser) {
      browser.close();
    }
  }
}
