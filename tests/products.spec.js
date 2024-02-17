const { test, expect, browser, locator } = require('@playwright/test');
import exp from 'constants';
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

test.describe("Products sorting tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: "load"} );
        await page.waitForLoadState('domcontentloaded');
    })

    test("should_check_if_products_are_sorted_alphabetically_asc_by_default", async ({ page }) => {
        //Arrange
        const inventoryPage = new InventoryPage(page);
        const productsNames = []
        const sortingType = 'Name (A to Z)';
        let isSortedAlphabeticallyAsc = false;

        //Act
        await inventoryPage.defineArrayOfProductsNames(productsNames);
        isSortedAlphabeticallyAsc = await inventoryPage.checkSortingByNameAsc(productsNames);

        //Assert
        await expect(productsNames).toHaveLength(6);
        await expect(inventoryPage.sortingActiveOption).toHaveText(sortingType);
        await expect(isSortedAlphabeticallyAsc).toBe(true);
    });
});