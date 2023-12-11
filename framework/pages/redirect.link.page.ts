import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class RedirectLinkPage extends BasePage {

    readonly page: Page;
    readonly redirectLinkElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.redirectLinkElement = this.page.locator('//a[@id="redirect"]');
    }

    @step('Clicking on redirect link button')
    async clickOnRedirectLink() {
        await this.redirectLinkElement.waitFor({state: 'visible'});
        await this.redirectLinkElement.click();
        await this.page.waitForLoadState('networkidle');
    }

}