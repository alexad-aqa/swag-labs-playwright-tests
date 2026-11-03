import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly errorAlert;
  private readonly lockedUserErrorText;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorAlert = page.getByTestId('error');
    this.lockedUserErrorText =
      'Epic sadface: Sorry, this user has been locked out.';
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLockedUserValidation() {
    await expect(this.errorAlert).toBeVisible();
    await expect(this.errorAlert).toContainText(this.lockedUserErrorText);
  }
}
