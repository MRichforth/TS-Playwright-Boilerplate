import {Page} from "@playwright/test";
import {SlowResourcesPage} from "./slow.resources.page";
import {step} from "../helpers/allure.helper";

export type TStatusCodeTypes = '200' | '301' | '404' | '500';

export class StatusCodesPage extends SlowResourcesPage {

    readonly page: Page;
    readonly baseUrl: string;
    readonly successfulStatusCodeUrl: string;
    readonly redirectionStatusCodeUrl: string;
    readonly clientErrorStatusCodeUrl: string;
    readonly serverErrorStatusCodeUrl: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.baseUrl = process.env.ENV_URL ? `${process.env.ENV_URL}/status_codes`: 'http://localhost-app:5000/status_codes';
        this.successfulStatusCodeUrl = `${this.baseUrl}/200`;
        this.redirectionStatusCodeUrl = `${this.baseUrl}/301`;
        this.clientErrorStatusCodeUrl = `${this.baseUrl}/404`;
        this.serverErrorStatusCodeUrl = `${this.baseUrl}/500`;
    }

    @step('Clicking on status code example button')
    async clickOnExampleButton(code: TStatusCodeTypes) {
        const exampleButtonLocator = this.page.locator(`//a[contains(@href, "${code}")]`);
        await exampleButtonLocator.waitFor({state: 'visible'});
        await exampleButtonLocator.click();
        await this.page.waitForLoadState('networkidle');
    }

}