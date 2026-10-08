// tests/page_objects.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login_page";
import { DashboardPage } from "../pages/dashboard_page";

test("Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.fillUsername("playwright_jaro24");
  await loginPage.fillPassword("Playwright!2024");
  await loginPage.clickLogin();
});

test("Page Objects (shared steps)", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.login("playwright_jaro24", "Playwright!2024");
});

test("Pmtool Login, Logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.openPmtool();
  await loginPage.fillUsername("playwright_jaro24");
  await loginPage.fillPassword("Playwright!2024");
  await loginPage.clickLogin();
  await dashboardPage.waitUntilNotificationIsLoaded();
  await dashboardPage.clickProfile();
  await dashboardPage.clickLogout();
});

test("Pmtool Login, Logout (shared steps)", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.openPmtool();
  await loginPage.login("playwright_jaro24", "Playwright!2024");
  await dashboardPage.logout();
});
