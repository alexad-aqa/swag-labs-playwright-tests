import { expect, test } from '@playwright/test';
import { LoginPage } from '../../page-objects/pages/LoginPage';
import { users } from '../../data/user.data';
import { InventoryPage } from '../../page-objects/pages/InventoryPage';
import { CartPage } from '../../page-objects/pages/CartPage';
import { CheckoutInfoPage } from '../../page-objects/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../page-objects/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../page-objects/pages/CheckoutCompletePage';

test.describe('hw20: Swag Labs E2E', { tag: '@hw20:oop' }, () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutInfoPage;
  let checkoutOverviewPage;
  let checkoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('Purchase Success Test', async () => {
    let stepNum = 1;
    await test.step(`${stepNum++}. User logged in as ${users.standard.username}`, async () => {
      await loginPage.open();
      await loginPage.login(users.standard.username, users.standard.password);
      await inventoryPage.verifyIsOpened();
    });

    const { priceOnInventory, titleOnInventory } =
      await test.step(`${stepNum++}. Product Item added into Cart on Inventory Page`, async () => {
        const titleOnInventory = 'Sauce Labs Backpack';
        //TODO: titles should not be hardcoded

        await inventoryPage.inventoryTile.addToCartByTitle(titleOnInventory);
        // TODO: to product count to be dynamic on add
        const priceOnInventory =
          await inventoryPage.inventoryTile.getPriceByTitle(titleOnInventory);
        await inventoryPage.verifyAddToCartBtnNotVisible();
        await inventoryPage.verifyRemoveButtonVisible();
        await inventoryPage.verifyCartCountBadge(1);

        return { priceOnInventory, titleOnInventory };
      });

    await test.step(`${stepNum++}. Added Product Item shown in Cart`, async () => {
      await inventoryPage.header.openCart();
      await cartPage.verifyIsOpened();

      const titleOnCart = await cartPage.inventoryTile.getItemByTitle();
      const priceOnCart = await cartPage.inventoryTile.getPriceByTitle();

      expect(titleOnCart).toEqual(titleOnInventory);
      expect(priceOnCart).toEqual(priceOnInventory);

      await cartPage.goToCheckoutInfo();
    });

    await test.step(`${stepNum++}. User Info Submitted on Checkout Step 1`, async () => {
      await checkoutInfoPage.verifyIsOpened();
      await checkoutInfoPage.submitUserInfo('standardUser');
    });

    await test.step(`${stepNum++}. Added Product shown on Checkout Step 2`, async () => {
      await checkoutOverviewPage.verifyIsOpened();
      const titleOnOverview =
        await checkoutOverviewPage.inventoryTile.getItemByTitle();
      const priceOnOverview =
        await checkoutOverviewPage.inventoryTile.getPriceByTitle();
      expect(titleOnOverview).toEqual(titleOnInventory);
      expect(priceOnOverview).toEqual(priceOnInventory);
    });

    await test.step(`${stepNum++}. Total Amount & Tax calculated on Checkout Step 2`, async () => {
      const totalOnOverview = await checkoutOverviewPage.getItemTotal();
      expect(totalOnOverview).toBe(priceOnInventory);
      // TODO to improve calc of total amount

      const taxAmountOnOverview = await checkoutOverviewPage.getTaxAmount();
      const expectedTax = await checkoutOverviewPage.calculateTaxAmount();
      expect(taxAmountOnOverview).toBe(expectedTax);
    });

    await test.step(`${stepNum++}. Order Submitted on Checkout Step 2`, async () => {
      await checkoutOverviewPage.finishPurchase();
      await checkoutCompletePage.verifyIsOpened();
      await checkoutCompletePage.verifyCompletePurchaseSuccessTitle();
    });
  });
});
