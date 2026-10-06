// tests/iframe_actions.spec.ts
import { test } from "@playwright/test";

test("Operating in iframe", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // await page.locator("#name").fill("Pepa"); // ! Nebude fungovat, prvek je v iframe
  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Píšeme v iframe");
});
