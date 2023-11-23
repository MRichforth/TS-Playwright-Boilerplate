import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class DragAndDropPage extends BasePage {

    readonly page: Page;
    readonly aBoxElement: Locator;
    readonly bBoxElement: Locator;
    readonly boxElements: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.aBoxElement = this.page.locator('//div[@id="column-a"]');
        this.bBoxElement = this.page.locator('//div[@id="column-b"]');
        this.boxElements = this.page.locator('//div[@id="columns"]//div');
    }

    @step('Asserting order of blocks by block names')
    async assertOrderOfBlocks(...blockNames: string[]) {
        const listOfBoxElements = await this.boxElements.all();
        for (const item of listOfBoxElements) {
            const index = listOfBoxElements.indexOf(item);
            const itemText = await item.textContent();
            expect(itemText).toEqual(blockNames[index]);
        }
    }
}