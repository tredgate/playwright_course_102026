import { expect, test } from "@playwright/test";

test("Exercise: Api Asserts", async ({ request }) => {
  const response = await request.patch(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train",
  );
  const responseBody = await response.json();
  expect(responseBody.id, "Response Body id has value").toBe(1);
  expect(
    typeof responseBody.timestamp,
    "Response Body timestamp is a string",
  ).toBe("string");
});
