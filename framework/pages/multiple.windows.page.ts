import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class MultipleWindowsPage extends BasePage {

    readonly page: Page;
    readonly newTabButtonElement: Locator;
    readonly newPageTitleElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.newTabButtonElement = this.page.locator('//a[contains(@href, "new")]');
        this.newPageTitleElement = this.page.locator('//div[@class="example"]//h3');
    }

    @step('Asserting new page title')
    async assertNewPageTitle(title: string) {
        await this.newPageTitleElement.waitFor({state: 'visible'});
        const newPageTitle = await this.newPageTitleElement.textContent();
        expect(newPageTitle).toEqual(title);
    }

}