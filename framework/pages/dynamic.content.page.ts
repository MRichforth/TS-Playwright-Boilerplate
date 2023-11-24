import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TStaticRowTypes = { imageSrc: string, text: string };

export class DynamicContentPage extends BasePage {

    readonly page: Page;
    readonly rowElement: Locator;
    readonly staticPageLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.rowElement = this.page.locator('//div[@id="content"]/div[@class="row"]');
        this.staticPageLink = this.page.locator('//div[@class="example"]//a');
    }

    @step('Clicking on static page button')
    async clickOnStaticPageButton() {
        await this.staticPageLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Validating dynamic rows content')
    async validateDynamicRowsContent() {
        for (const row of await this.rowElement.all()) {
            // Asserting text visibility
            await expect(row).toBeVisible();
            expect(await row.textContent()).toBeTruthy();

            // Asserting image visibility
            const imageLocator = row.locator('img');
            await expect(imageLocator).toBeVisible();

            // Asserting image src
            const imageSrc = await imageLocator.getAttribute('src');
            expect(imageSrc).toContain('Original-Facebook-Geek-Profile-Avatar');
        }
    }

    @step('Validating static rows content')
    async validateStaticRowContent(row: TStaticRowTypes) {
        // Asserting text visibility
        const textLocator = this.page.locator(`//div[@id="content"]/div[@class="row"]//*[contains(., "${row.text}")]`);
        await expect(textLocator).toBeVisible();

        // Asserting image visibility
        const imageLocator = this.page.locator(`//div[@id="content"]/div[@class="row"]//img[@src="${row.imageSrc}"]`);
        await expect(imageLocator).toBeVisible();
    }

}