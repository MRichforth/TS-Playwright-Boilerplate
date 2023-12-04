import {Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export class ExitIntentPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Moving mouse outside of viewport')
    async moveMouseOutsideOfViewport() {
        await this.page.locator('html').dispatchEvent('mouseleave');
    }

}