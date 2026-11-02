import { test as playwrightTest, expect } from '@playwright/test';
import { BasePage } from '../page-objects/pages/BasePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { LoginPage } from '../page-objects/pages/LoginPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { CheckoutInfoPage } from '../page-objects/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../page-objects/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../page-objects/pages/CheckoutCompletePage';
import { users } from '../data/user.data';

type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  autoLogin: void;
  autoLogout: void;
  userToLogin: typeof users.standard;
};

export const test = playwrightTest.extend<MyFixtures>({
  //* PAGES

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  //* LOGIN  DATA

  userToLogin: async ({}, use) => {
    await use(users.standard);
  },

  //* AUTO ACTIONS

  autoLogin: [
    async ({ page, loginPage, inventoryPage, userToLogin }, use) => {
      await loginPage.open();
      await loginPage.login(userToLogin.username, userToLogin.password);

      await use();
    },
    { auto: true },
  ],

  autoLogout: [
    async ({ page, basePage }, use) => {
      await use();

      const isLoggedIn = await basePage.header.leftSideMenuVisible();

      if (isLoggedIn) {
        console.log('Logged out via autoLogout Fixture');
        await basePage.logout();
      }
    },
    { auto: true },
  ],
});

export { expect };
