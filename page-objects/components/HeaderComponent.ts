import { Page } from '@playwright/test';

export class HeaderComponent {
  protected readonly page;
  protected readonly cartCountBadge;
  protected readonly cartIcon;
  protected readonly menuIcon;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.cartCountBadge = page.getByTestId('shopping-cart-badge');
    this.menuIcon = page.getByRole('button', { name: 'Open Menu' });
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async leftSideMenuVisible() {
    await this.menuIcon.isVisible();
  }

  async openLeftSideMenu() {
    await this.menuIcon.click();
  }
}
