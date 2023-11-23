import {Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TButtonTypes = 'Home' | 'About' | 'Contact Us' | 'Portfolio' | 'Gallery'

export class DisappearingElementsPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Validating button visibility')
    async validateButtonVisibility(buttonName: TButtonTypes) {
        const buttonLocator = this.page.locator(`//a[text()="${buttonName}"]`);
        let isVisible = await buttonLocator.isVisible();
        let count = 0;
        while (!isVisible && count <= 10) {
            console.log(`Button '${buttonName}' isn't visible! Trying to reload page, attempt: #'${count}'`);
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');
            isVisible = await buttonLocator.isVisible();
            count++;
        }
    }

}