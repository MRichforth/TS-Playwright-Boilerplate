/* eslint @typescript-eslint/no-unused-vars: "off" */
import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {SlowResourcesPage, TNetworkResponseType} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/slow.resources.page";

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
            status: 200,
            statusText: 'OK'
        }
        await slowResourcesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await slowResourcesPage.validatePage();
    });

});
