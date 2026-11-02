import { expect, Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';

export class BasePage {
  protected readonly page;
  protected pagePath = '/';
  readonly header: HeaderComponent;
  protected expectedLocator = 'main';

  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  async open(path?) {
    await this.page.goto(path ?? this.pagePath);
  }

  //* Verifications

  async verifyIsOpened() {
    await expect(this.page).toHaveURL(this.pagePath);
    console.log(this.pagePath);
  }
}
