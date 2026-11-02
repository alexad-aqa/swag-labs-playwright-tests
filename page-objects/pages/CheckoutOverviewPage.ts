import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryTileComponent } from '../components/InventoryTileComponent';

export class CheckoutOverviewPage extends BasePage {
  protected pagePath = 'checkout-step-two.html';
  private readonly inventoryTile: InventoryTileComponent;
  protected readonly expectedLocator;
  private readonly itemTotalLabel;
  private readonly taxAmountLabel;
  private readonly finishButton;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.getByTestId('finish');
    this.inventoryTile = new InventoryTileComponent(page);
    this.inventoryTile.expectedLocator = 'cart-list';
    this.itemTotalLabel = page.getByTestId('subtotal-label');
    this.taxAmountLabel = page.getByTestId('tax-label');
  }

  async getItemTotal() {
    const itemTotal = await this.itemTotalLabel.textContent();
    const itemTotalNumber = parseFloat(
      itemTotal.replace(/[^0-9.]/g, ''),
    ).toFixed(2);
    console.log(itemTotalNumber);
    return itemTotalNumber;
  }

  async getTaxAmount() {
    const taxAmount = await this.taxAmountLabel.textContent();
    const taxAmountNumber = parseFloat(
      taxAmount.replace(/[^0-9.]/g, ''),
    ).toFixed(2);
    console.log(taxAmount, taxAmountNumber);
    return taxAmountNumber;
  }

  async calculateTaxAmount() {
    const totalAmount = await this.getItemTotal();
    const expectedtaxAmount = (
      Math.round(totalAmount * 0.08 * 100) / 100
    ).toFixed(2);
    console.log(expectedtaxAmount);
    return expectedtaxAmount;
  }

  async finishPurchase() {
    await this.finishButton.click();
  }
}
