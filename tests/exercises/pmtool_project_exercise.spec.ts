import { test } from "@playwright/test";

test("Exercises: Open Projects in Pmtool", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator('[type="submit"]').click();
  await page.locator("#Projects").click();
});
