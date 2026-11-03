import { expect } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';
import { MenuDrawerComponent } from '../components/MenuDrawerComponent';
export class BasePage {
  protected readonly page;
  protected pagePath = '';
  readonly header: HeaderComponent;
  readonly menuDrawer: MenuDrawerComponent;
  protected expectedLocator = 'main';

  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.menuDrawer = new MenuDrawerComponent(page);
  }

  async open(path?) {
    await this.page.goto(path ?? this.pagePath);
  }

  async logout() {
    await this.header.openLeftSideMenu();
    await this.menuDrawer.clickLogout();
  }

  //* Verifications

  async verifyIsOpened(path?) {
    await expect(this.page).toHaveURL(this.pagePath ?? path);
    console.log(this.pagePath);
  }
}
