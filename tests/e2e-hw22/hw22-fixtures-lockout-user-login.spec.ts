import { users } from '../../data/user.data';
import { test } from '../../fixtures/my-fixtures';

test.describe('hw22: Swag Labs E2E', { tag: '@hw22:fixtures' }, () => {
  test.use({
    userToLogin: users.locked_out_user,
  });

  test('Product Item added into Cart on Inventory Page', async ({
    loginPage,
  }) => {
    await loginPage.verifyLockedUserValidation();
  });
});
