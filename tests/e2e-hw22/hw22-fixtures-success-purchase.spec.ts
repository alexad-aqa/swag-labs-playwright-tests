import { test, expect } from '../../fixtures/my-fixtures';

test.describe('hw22: Swag Labs E2E', { tag: '@hw22:fixtures' }, () => {
  test('Purchase Success Test', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    let stepNum = 1;

    const { priceOnInventory, titleOnInventory } =
      await test.step(`${stepNum++}. Product Item added into Cart on Inventory Page`, async () => {
        const titleOnInventory = 'Sauce Labs Backpack';

        await inventoryPage.verifyIsOpened();
        await inventoryPage.inventoryTile.addToCartByTitle(titleOnInventory);
        const priceOnInventory =
          await inventoryPage.inventoryTile.getPriceByTitle(titleOnInventory);
        await inventoryPage.verifyRemoveButtonVisible(titleOnInventory);
        await inventoryPage.verifyAddToCartBtnNotVisible(titleOnInventory);
        await inventoryPage.verifyCartCountBadge(1);

        return { priceOnInventory, titleOnInventory };
      });

    await test.step(`${stepNum++}. Added Product Item shown in Cart`, async () => {
      await inventoryPage.header.openCart();
      await cartPage.verifyIsOpened();

      const titleOnCart =
        await cartPage.inventoryTile.getItemByTitle(titleOnInventory);
      const priceOnCart =
        await cartPage.inventoryTile.getPriceByTitle(titleOnInventory);

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
        await checkoutOverviewPage.inventoryTile.getItemByTitle(
          titleOnInventory,
        );
      const priceOnOverview =
        await checkoutOverviewPage.inventoryTile.getPriceByTitle(
          titleOnInventory,
        );
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
