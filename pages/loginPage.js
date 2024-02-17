const { page } = require('@playwright/test');

exports.LoginPage = 
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginBtn = this.page.locator('#login-button');
        this.errorMsg = this.page.locator('[data-test="error"]');
        this.errorIcon = this.page.locator('svg[data-icon="times-circle"]');
        this.expectedPageUrl = "https://www.saucedemo.com/inventory.html";
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}