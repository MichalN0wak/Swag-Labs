const { test, expect } = require('@playwright/test');
import { LoginPage } from '../pages/loginPage';

test.describe("Login tests", () => {
   
    test.beforeEach( async ({ page }) => {
        await page.goto('/', { waitUntil: "load"} );
    });
    
    test('should login with correct credentials', async ({ page }) => {
        //Arrange
        const loginPage = new LoginPage(page);
        const username = "standard_user";
        const password = "secret_sauce";
    
    //Act
    await loginPage.login(username, password);
    
    //Assert
    await expect(page).toHaveURL(loginPage.expectedPageUrl);
});
});