// tests/using_api_on_frontend.spec.ts
import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register User in TEG#B and check API", async ({ page }) => {
  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000_000 });
  const email = faker.internet.exampleEmail();
  const password = "123456";

  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/register");
  await page.locator('[data-testid="username-input"]').fill(username);
  await page.locator('[data-testid="email-input"]').fill(email);
  await page.locator('[data-testid="password-input"]').fill(password);

  // ? Zapínáme čekání na response (bez await - test bude pokračovat dál)
  const responsePromise = page.waitForResponse(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
  );
  await page.locator('[data-testid="submit-button"]').click();

  // ? Po kliknutí počkáme na dokončení čekání na response
  const response = await responsePromise;
  const responseBody = await response.json(); //? API Response body
  const request = response.request(); // ? API Request - pro testování dotazu
  const requestBody = request.postDataJSON(); // ? Request body - tělo dotazu

  // * Testy requestu
  expect(
    requestBody.username,
    "Registration Request Body: username has text",
  ).toBe(username);
  expect(requestBody.email, "Registration Request Body: email has text").toBe(
    email,
  );

  // * Testy response
  expect(
    responseBody.username,
    "Registration Response Body: username has text",
  ).toBe(username);
  expect(responseBody.email, "Registration Response Body: email has text").toBe(
    email,
  );
});
