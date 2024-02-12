import { test, expect, chromium } from '@playwright/test';
const { LoginPage } = require("../pages/loginPage");
import { loginData } from '../test-data/loginData';
const authFile = 'playwright/.auth/user.json';

module.exports = async config => {
    const browser = await chromium.launch( { headless: true});
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/', { waitUntil: "load"} );
    await page.waitForLoadState('domcontentloaded');
    await loginPage.login(loginData.standardUserName, loginData.correctPassword);
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
    await page.context().storageState({ path: authFile });
    await browser.close();
}