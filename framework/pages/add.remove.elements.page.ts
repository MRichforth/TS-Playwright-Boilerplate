import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class AddRemoveElementsPage extends BasePage {

    readonly page: Page;
    readonly addElementButton: Locator;
    readonly deleteElementButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.addElementButton = this.page.locator('//div[@class="example"]/button');
        this.deleteElementButton = this.page.locator('//button[@class="added-manually"]');
    }

    @step('Clicking on "Add Element" button')
    async clickOnAddElementButton() {
        await this.addElementButton.click();
    }

    @step('Clicking on "Delete Element" button')
    async clickOnDeleteElementButton() {
        await this.deleteElementButton.click();
    }

    @step('Getting number of "Delete" buttons')
    async getDeleteButtonQuantity() {
        return await this.deleteElementButton.count();
    }

}