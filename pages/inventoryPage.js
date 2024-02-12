const { page, locator, selector } = require('@playwright/test');

exports.InventoryPage = 
class InventoryPage {
    constructor(page) {
        this.page = page;
        this.product = this.page.locator("#item_4_title_link");
            this.productsSelectors = Array.from( { length: 6 }, (_, i) => `#item_${i}_title_link`)
    }
}