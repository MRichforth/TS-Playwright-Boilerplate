/* eslint @typescript-eslint/no-unused-vars: "off" */
import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {SlowResourcesPage, TNetworkResponseType} from "../framework/pages/slow.resources.page";

test.describe('Available Examples - Slow Resources', () => {

    test.beforeEach(async ({page}, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 30000);
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Slow Resources');
        await allure.suite('Slow Resources scenarios');
        await allure.description("Check 'Slow Resources' page functionality");
        await allure.tags('slow', 'ui');
    });

    test('Slow Resources', async ({page}) => {
        const basePage = new BasePage(page);

        // Navigating to main page
        await basePage.openPage({page: "main"});

        // Validating main page elements
        await basePage.validatePage();

        // Creating response handler
        const slowResourcesPage = new SlowResourcesPage(page);
        const responsePromise = slowResourcesPage.createResponseHandler(slowResourcesPage.slowExternalUrl);

        // Clicking on specific section button
        await slowResourcesPage.clickOnSectionByName('Slow Resources');

        // Asserting required network response
        const responseData: TNetworkResponseType = {
            url: slowResourcesPage.slowExternalUrl,
            status: 503,
            statusText: 'Service Unavailable'
        }
        await slowResourcesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await slowResourcesPage.validatePage();
    });

});
