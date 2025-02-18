/* eslint @typescript-eslint/no-explicit-any: "off" */
import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";
import {TMainSections} from "./index";

export type TNetworkResponseType = {
    url: string,
    status: number,
    statusText: string
}

export class SlowResourcesPage extends BasePage {

    readonly page: Page;
    readonly slowExternalUrl: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.slowExternalUrl = process.env.ENV_URL ? `${process.env.ENV_URL}/slow_external`: 'http://localhost-app:5000/slow_external';
    }

    @step('Creating response handler')
    async createResponseHandler(url: string, responseTimeout = 40000) {
        return this.page.waitForResponse(url, {timeout: responseTimeout});
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
        expect(response.url()).toEqual(expectedData.url);
        expect(response.status()).toEqual(expectedData.status);
        expect(response.statusText()).toEqual(expectedData.statusText);
    }

}