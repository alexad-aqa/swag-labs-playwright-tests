import { Page } from '@playwright/test';

export class HeaderComponent {
  protected readonly page;
  protected readonly cartCountBadge;
  protected readonly cartIcon;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.cartCountBadge = page.getByTestId('shopping-cart-badge');
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
