// tests/api_reusing_data.spec.ts
import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data between API Calls", async ({ request }) => {
  const generatedUsername =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000_000 });
  const generatedEmail = faker.internet.exampleEmail();
  let userId;

  // * 1. request: registrace uživatele
  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username: generatedUsername,
        password: "123456",
        email: generatedEmail,
      },
    },
  );
  const registerBody = await registerResponse.json();
  userId = registerBody.userId; // ? Uloží nově vytvořené ID do proměnné

  // * 2. request - provolání GET na nově založeného uživatele
  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    },
  );
  const userBody = await userResponse.json();
  expect(userBody.email, "User Body email has text").toBe(generatedEmail);
  expect(userBody.username, "User Body username has text").toBe(
    generatedUsername,
  );
});
