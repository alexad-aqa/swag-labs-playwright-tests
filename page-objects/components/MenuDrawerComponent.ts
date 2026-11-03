import { Page } from '@playwright/test';

export class MenuDrawerComponent {
  protected readonly page;
  protected readonly logoutButton;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout-sidebar-link');
  }

  async clickLogout() {
    await this.logoutButton.click();
  }
}
