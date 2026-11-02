import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  protected pagePath = '/checkout-complete.html';
  private readonly completeSuccessTitle;
  private readonly completePurchaseSuccessText;

  constructor(page: Page) {
    super(page);
    this.completeSuccessTitle = page.getByTestId('complete-header');
    this.completePurchaseSuccessText = 'Thank you for your order!';
  }

  async verifyCompletePurchaseSuccessTitle() {
    await expect(this.completeSuccessTitle).toBeVisible();
    await expect(this.completeSuccessTitle).toContainText(
      this.completePurchaseSuccessText,
    );
  }
}
