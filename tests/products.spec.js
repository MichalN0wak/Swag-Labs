const { test, expect, browser, locator } = require('@playwright/test');
import { InventoryPage } from '../pages/inventoryPage';

test.describe("Products details tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: "load"} );
        await page.waitForLoadState('domcontentloaded');
    })
    
    test("should_open_product_details_page_by_provided_productId", async ({ page }) => {
        //Arrange
        const inventoryPage = new InventoryPage(page);
        let itemId = 4; //from 0 - 5
        const productDetailsOpenLink = inventoryPage.productsSelectors[itemId];

        //Act
        await page.locator(productDetailsOpenLink).click();
        
        //Assert
        await expect(page).toHaveURL(`https://www.saucedemo.com/inventory-item.html?id=${itemId}`)
    })
});

// test.describe("Products sorting tests", () => {

// });