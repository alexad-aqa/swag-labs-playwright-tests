import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryTileComponent } from '../components/InventoryTileComponent';

export class InventoryPage extends BasePage {
  protected pagePath = 'inventory.html';
  private readonly inventoryTile: InventoryTileComponent;

  constructor(page: Page) {
    super(page);
    this.inventoryTile = new InventoryTileComponent(page);
    this.inventoryTile.expectedLocator = 'inventory-container';
  }

  //* Verifications

  async verifyCartCountBadge(count) {
    await expect(this.header.cartCountBadge).toBeVisible();
    await expect(this.header.cartCountBadge).toHaveText(String(count));
  }

  async verifyAddToCartBtnNotVisible(title) {
    await expect(this.inventoryTile.addToCartButton).toBeHidden();
  }

  async verifyRemoveButtonVisible() {
    await expect(this.inventoryTile.removeButton).toBeVisible();
  }
}
