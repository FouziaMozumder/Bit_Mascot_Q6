import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutPage from '../pages/checkout.page.js';
import CommonPage from '../pages/common.page.js';

test.describe('SauceDemo Scenarios', () => {
  let login, inventory, cart, checkout, common;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    common = new CommonPage(page);

    await login.open();
  });

  test('Valid User purchase journey', async () => {
    await login.login('standard_user', 'secret_sauce');
    await common.openMenu();
    await common.resetAppState();
    const addedItems = await inventory.addFirstNProducts(1);
    await inventory.gotoCart();

    const cartItems = await cart.getCartItems();
    expect(cartItems).toEqual(expect.arrayContaining(addedItems));

    await cart.checkout();
    await checkout.fillCheckoutForm('Fouzia', 'Dhaka', '1212');
    await checkout.clickContinue();

    const overviewItems = await checkout.getOverviewItems();
    expect(overviewItems).toEqual(addedItems);

    const totalLabel = await checkout.getItemTotal();
    expect(totalLabel).toContain('$');

    await checkout.clickFinish();
    const successMsg = await checkout.getCompleteHeader();
    expect(successMsg).toContain('Thank you for your order!');

    await common.openMenu();
    await common.resetAppState();
    await common.logout();
  });
});