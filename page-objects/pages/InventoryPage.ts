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
    const inventoryItem = this.inventoryTile.inventoryList.filter({
      hasText: title,
    });
    const specificAddToCartBtn = inventoryItem.locator(
      this.inventoryTile.addToCartButton,
    );
    await expect(specificAddToCartBtn).toBeHidden();
  }

  async verifyRemoveButtonVisible(title) {
    const inventoryItem = this.inventoryTile.inventoryList.filter({
      hasText: title,
    });
    const specificRemoveBtn = inventoryItem.locator(
      this.inventoryTile.removeButton,
    );
    await expect(specificRemoveBtn).toBeVisible();
  }
}
