import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class ShadowDOMPage extends BasePage {

    readonly page: Page;
    readonly titleElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.titleElement = this.page.locator('//div[@id="content"]/h1');
    }

    @step('Asserting that provided texts are displayed on page')
    async assertVisibleContent(visibleText: string[]) {
        for (const text of visibleText) {
            const pageTextLocators = await this.page.locator(`//*[text()="${text}"]`).all();
            for (const pageTextLocator of pageTextLocators) {
                await expect(pageTextLocator).toBeVisible();

                const pageTextValue = await pageTextLocator.textContent();
                expect(pageTextValue).toEqual(text);
            }
        }
    }

    @step('Asserting that provided texts are hidden on page')
    async assertHiddenContent(hiddenText: string[]) {
        for (const text of hiddenText) {
            const pageTextLocators = await this.page.locator('p > slot').all();
            for (const pageTextLocator of pageTextLocators) {
                await expect(pageTextLocator).toBeHidden();

                const pageTextValue = await pageTextLocator.textContent();
                expect(pageTextValue).toEqual(text);
            }
        }

    }

}