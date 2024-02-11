const { test, expect } = require('@playwright/test');
import exp from 'constants';
import { LoginPage } from '../pages/loginPage';
import { loginData } from '../test-data/loginData';

test.describe("Login tests", () => {
    
    test.beforeEach( async ({ page }) => {
        await page.goto('/', { waitUntil: "load"} );
        await page.waitForLoadState('domcontentloaded');
    });
    
    test('when_credentials_are_correct_should_login', async ({ page }) => {
        //Arrange
        const loginPage = new LoginPage(page);
    
        //Act
        await loginPage.login(loginData.standardUserName, loginData.correctPassword);
    
        //Assert
        await expect(page).toHaveURL(loginPage.expectedPageUrl, { timeout: 5000});
    });

    test('when_credentials_are_incorrect_should_appear_error_message', async ({ page }) => {
        //Arrange
        const loginPage = new LoginPage(page);
        const expectedErrorMessage = "Epic sadface: Username and password do not match any user in this service"
    
        //Act
        await loginPage.login(loginData.standardUserName, loginData.wrongPassword);
    
        //Assert
        await expect(loginPage.errorMsg).toBeVisible({ timeout: 5000 });
        await expect(loginPage.errorMsg).toHaveText(expectedErrorMessage);
        await expect(loginPage.usernameInput).toHaveClass("input_error form_input error");
        await expect(loginPage.passwordInput).toHaveClass("input_error form_input error");
        await expect(loginPage.errorIcon).toHaveCount(2);
    });
});