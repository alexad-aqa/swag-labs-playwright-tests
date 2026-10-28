import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryTileComponent } from '../components/InventoryTileComponent';

export class CartPage extends BasePage {
  protected pagePath = 'cart.html';
  private readonly inventoryTile: InventoryTileComponent;
  private readonly checkoutButton;
  protected readonly expectedLocator;

  constructor(page: Page) {
    super(page);
    this.inventoryTile = new InventoryTileComponent(page);
    this.checkoutButton = page.getByTestId('checkout');
    this.inventoryTile.expectedLocator = 'cart-contents-container';
  }

  async goToCheckoutInfo() {
    await this.checkoutButton.click();
  }
}
