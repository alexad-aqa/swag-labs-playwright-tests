import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInfoPage extends BasePage {
  protected pagePath = 'checkout-step-one.html';
  private readonly firstNameInput;
  private readonly lastNameInput;
  private readonly zipCodeInput;
  private readonly continueButton;
  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.zipCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipcode) {
    await this.zipCodeInput.fill(zipcode);
  }
  async continue() {
    await this.continueButton.click();
  }

  async submitUserInfo(prefix) {
    const firstName = `${prefix}_${Date.now()}`;
    const lastName = `${prefix}_${Date.now()}`;
    const zipcode = `abcd123`;

    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zipcode);
    await this.continue();

    console.log(firstName, lastName, zipcode);

    return {
      firstName,
      lastName,
      zipcode,
    };
  }
}
