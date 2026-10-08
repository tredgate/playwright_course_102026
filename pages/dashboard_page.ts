import test, { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly notificationButton: Locator;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notificationButton = this.page.locator("#user_notifications_report");
    this.profileButton = this.page.locator("#user_dropdown");
    this.logoutButton = this.page.locator("#logout");
  }

  async waitUntilNotificationIsLoaded() {
    await expect(this.notificationButton).toBeVisible();
  }

  async clickProfile() {
    await this.profileButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async logout() {
    await test.step("Pmtool Logout", async () => {
      await this.waitUntilNotificationIsLoaded();
      await this.clickProfile();
      await this.clickLogout();
    });
  }
}
