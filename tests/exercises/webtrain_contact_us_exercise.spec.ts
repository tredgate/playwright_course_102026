import { test } from "@playwright/test";

test("Exercise: Forms", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator("#full-name").fill("Pepa Vomáčka");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#contact-date").fill("2026-11-01");
  await page.locator("#newsletter").check();
  await page.locator("#role").selectOption("instructor");
  await page.locator("#comments").fill("Nějaký komentář");
  await page.locator('[data-testid="button-submit"]').click();
});
