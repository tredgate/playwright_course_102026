import { test } from "@playwright/test";

test("Exercise: API calls", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/auth/register",
    {
      data: {
        email: "luke@example.com",
        password: "heslo1",
        firstName: "Luke",
        lastName: "Skywalker",
        age: 25,
      },
    },
  );
});
