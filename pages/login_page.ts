// pages/login_page.ts

import test, { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly url = "https://tredgate.com/pmtool";
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#username");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.locator('[type="submit"]');
  }

  async openPmtool() {
    await this.page.goto(this.url);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await test.step("Pmtool Login", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
    });
  }
}
