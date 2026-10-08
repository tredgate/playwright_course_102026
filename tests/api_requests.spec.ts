// tests/api_requests.spec.ts

import { test } from "@playwright/test";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET Request with URL params", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: { userId: 145 },
  });
});

test("Request Headers", async ({ request }) => {
  await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
    {
      headers: {
        train: "Hlavicky v Playwright",
      },
    },
  );
});

test("POST with JSOB Body", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/body",
    {
      data: {
        stringProperty: "PetrTest",
        numberProperty: 67,
        booleanProperty: false,
      },
    },
  );
});
