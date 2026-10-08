// tests/tags.spec.ts

import { test } from "@playwright/test";

test.describe(
  "Tagged describe",
  {
    tag: "@describe",
  },
  () => {
    test("Untagged test in tagged describe", async ({ page }) => {
      await page.goto("https://tredgate.com/pmtool");
    });

    test(
      "Tagged test in tagged describe",
      {
        tag: "@test",
      },
      async ({ page }) => {
        await page.goto("https://tredgate.com/pmtool");
      },
    );
  },
);

test.describe("Untagged describe", () => {
  test("Untagged test in untagged describe", async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool");
  });

  test(
    "Tagged test in untagged describe",
    {
      tag: "@test",
    },
    async ({ page }) => {
      await page.goto("https://tredgate.com/pmtool");
    },
  );
});
