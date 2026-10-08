import { expect, test } from "@playwright/test";

test("Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("PETR");
  await page.locator("#password").fill("123456");
  await expect(page).toHaveScreenshot("login_page.png");
});
