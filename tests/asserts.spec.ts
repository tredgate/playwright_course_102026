// tests/asserts.spec.ts
import { expect, test } from "@playwright/test";

test("toContainText Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator('[type="submit"]').click();

  // * Expect s vlastní message
  await expect(
    page.locator("#welcome-page-header"),
    "Zpráva assertu - zobrazí se v logu kroků",
  ).toContainText("Vítej v testovací aplikaci");

  // * Expect bez message - vypíše se výchozí log
  await expect(page.locator("#welcome-page-header")).toContainText(
    "Vítej v testovací aplikaci",
  );
});

test("toHaveText Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator('[type="submit"]').click();
  await expect(
    page.locator("#welcome-page-header"),
    "Expect Welcome Page Header toHaveText",
  ).toHaveText("Vítej v testovací aplikaci Tredgate Project");
});

test("toBeVisible Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(
    page.locator(".login-page-logo img"),
    "Expect Logo is Visible",
  ).toBeVisible();
});

test("toHaveValue Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("playwright_jaro24");
  await expect(
    page.locator("#username"),
    "Expect Username Input has Value",
  ).toHaveValue("playwright_jaro24");
});

// ? Přeskočený test - padá (ukázka pádu soft assertu) - odeber skip pro aktivaci test.skip() => test()
test.skip("Soft Asserts", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect
    .soft(page.locator(".form-title"))
    .toHaveText("Přihlášení do aplikace"); // ? Skutečný text: Login
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator('[type="submit"]').click();
  await expect(
    page.locator("#welcome-page-header"),
    "Expect Welcome Page Header toHaveText",
  ).toHaveText("Vítej v testovací aplikaci Tredgate Project");
});

test("Negative Asserts - Element is not Visible", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect
    .soft(page.locator(".form-title"), "Login Title is Visible")
    .toBeVisible();
  await expect(
    page.locator(".alert"),
    "Alert is not Visible",
  ).not.toBeVisible(); // ? Alternativa: toBeHidden()
});
