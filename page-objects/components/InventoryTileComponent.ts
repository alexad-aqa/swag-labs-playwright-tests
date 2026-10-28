import { Page } from '@playwright/test';

export class InventoryTileComponent {
  protected readonly page;
  protected readonly inventoryName;
  protected readonly inventoryList;
  protected readonly addToCartButton;
  protected readonly removeButton;
  protected readonly itemPrice;
  protected expectedLocator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId('inventory-item');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.inventoryName = page.getByTestId('inventory-item-name');
    this.expectedLocator = this.expectedLocator;
  }
  //** Wait
  async interactWithTile() {
    await this.page
      .getByTestId(this.expectedLocator)
      .waitFor({ state: 'visible' });
  }

  async getItemByTitle(title: string) {
    await this.interactWithTile();
    const inventoryItem = this.inventoryList.filter({ hasText: title });
    const inventoryItemName = await inventoryItem
      .locator(this.inventoryName)
      .innerText();
    console.log(inventoryItemName);
    return inventoryItemName;
  }

  async getPriceByTitle(title: string) {
    const inventoryItem = this.inventoryList.filter({ hasText: title });
    const priceText = await inventoryItem.locator(this.itemPrice).innerText();
    const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, '')).toFixed(
      2,
    );
    console.log(priceText, priceNumber);
    return priceNumber;
  }

  async addToCartByTitle(title: string) {
    await this.interactWithTile();
    const inventoryItem = this.inventoryList.filter({
      hasText: title,
    });
    await inventoryItem.locator(this.addToCartButton).click();
  }
}
