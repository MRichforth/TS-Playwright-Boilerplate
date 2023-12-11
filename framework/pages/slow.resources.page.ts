/* eslint @typescript-eslint/no-explicit-any: "off" */
import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";
import {TMainSections} from "./index";

export type TNetworkResponseType = {
    status: number,
    statusText: string
}

export class SlowResourcesPage extends BasePage {

    readonly page: Page;
    readonly expectedUrl: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.expectedUrl = 'https://the-internet.herokuapp.com/slow_external';
    }

    @step('Creating response handler')
    async createResponseHandler(responseTimeout = 40000) {
        return this.page.waitForResponse(this.expectedUrl, {timeout: responseTimeout});
    }

    @step('Clicking on section by name')
    async clickOnSectionByName(sectionName: TMainSections) {
        await this.page.locator(`//a[contains(., "${sectionName}")]`).first().click();
    }

    @step('Asserting response data')
    async assertResponseData(responsePromise: any, expectedData: TNetworkResponseType) {
        /**
         * Response received as a result of request execution doesn't contain all required fields of Promise<Response> type,
         * so it was decided to use "any" type
         */
        const response = await responsePromise
        expect(response.url()).toEqual(this.expectedUrl);
        expect(response.status()).toEqual(expectedData.status);
        expect(response.statusText()).toEqual(expectedData.statusText);
    }

}