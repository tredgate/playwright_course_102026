import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Data Generation with Faker", async ({ request }) => {
  const generatedUsername =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000_000 });
  const generatedEmail = faker.internet.exampleEmail();

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username: generatedUsername,
        password: "123456",
        email: generatedEmail,
      },
    },
  );
});
