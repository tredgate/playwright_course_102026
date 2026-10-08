// tests/test_steps.spec.ts

import { test, expect } from "@playwright/test";

test("test.step in test()", async ({ page }) => {
  await test.step("Open Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool/");
  });
  await test.step("Login Pmtool", async () => {
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
  });
  await test.step("Wait until app load", async () => {
    await expect(page.locator("#user_notifications_report")).toBeVisible();
  });
  await test.step("Logout", async () => {
    await page.locator("#user_dropdown").click();
    await page.locator("#logout").click();
  });
});
