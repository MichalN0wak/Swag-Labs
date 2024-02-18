const { page } = require('@playwright/test');

exports.InventoryPage = 
class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsSelectors = Array.from( { length: 6 }, (_, i) => `#item_${i}_title_link`)
        this.productsNamesSelectors = Array(6).fill('.inventory_item_name ');
        this.sortingTypesList = this.page.locator('[data-test="product_sort_container"]')
        this.sortingActiveOption = this.page.locator('.active_option');
    }
    
    async defineArrayOfProductsNames(arrayOfNames) {
        for (let i = 0; i < this.productsNamesSelectors.length; i++) {
            const name = await this.page.locator(this.productsNamesSelectors).nth(i).textContent();
            arrayOfNames.push(name);
        }
    }

    async checkSortingByNameAsc(arrayOfNames) {
        for (let i = 1; i < arrayOfNames.length; i++) {
            if (arrayOfNames[i] < arrayOfNames[i - 1]) {
                return false;
            }
        }
        return true;
    }
    async checkSortingByNameDesc(arrayOfNames) {
        for (let i = 1; i < arrayOfNames.length; i++) {
            if (arrayOfNames[i] > arrayOfNames[i - 1]) {
                return false;
            }
        }
        return true;
    }
}