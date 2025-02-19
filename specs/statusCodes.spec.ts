import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {StatusCodesPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/status.codes.page";
import {TNetworkResponseType} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/slow.resources.page";

test.describe('Available Examples - Status Codes', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Status Codes');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Status Codes');
        await allure.suite('Status Codes scenarios');
        await allure.description("Check 'Status Codes' page functionality");
        await allure.tags('api', 'ui');
    });

    test('Status Codes - 200', async ({page}) => {
        const statusCodesPage = new StatusCodesPage(page);

        // Validating main page elements
        await statusCodesPage.validatePage();

        // Creating response handler
        const responsePromise = statusCodesPage.createResponseHandler(statusCodesPage.successfulStatusCodeUrl, 5000);

        // Clicking on "200" example button
        await statusCodesPage.clickOnExampleButton('200');

        // Asserting required network response
        const responseData: TNetworkResponseType = {
            url: statusCodesPage.successfulStatusCodeUrl,
            status: 200,
            statusText: 'OK'
        }
        await statusCodesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await statusCodesPage.validatePage();
    });

    test('Status Codes - 301', async ({page}) => {
        const statusCodesPage = new StatusCodesPage(page);

        // Validating main page elements
        await statusCodesPage.validatePage();

        // Creating response handler
        const responsePromise = statusCodesPage.createResponseHandler(statusCodesPage.redirectionStatusCodeUrl, 5000);

        // Clicking on "301" example button
        await statusCodesPage.clickOnExampleButton('301');

        // Asserting required network response
        const responseData: TNetworkResponseType = {
            url: statusCodesPage.redirectionStatusCodeUrl,
            status: 301,
            statusText: 'Moved Permanently'
        }
        await statusCodesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await statusCodesPage.validatePage();
    });

    test('Status Codes - 404', async ({page}) => {
        const statusCodesPage = new StatusCodesPage(page);

        // Validating main page elements
        await statusCodesPage.validatePage();

        // Creating response handler
        const responsePromise = statusCodesPage.createResponseHandler(statusCodesPage.clientErrorStatusCodeUrl, 5000);

        // Clicking on "404" example button
        await statusCodesPage.clickOnExampleButton('404');

        // Asserting required network response
        const responseData: TNetworkResponseType = {
            url: statusCodesPage.clientErrorStatusCodeUrl,
            status: 404,
            statusText: 'Not Found'
        }
        await statusCodesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await statusCodesPage.validatePage();
    });

    test('Status Codes - 500', async ({page}) => {
        const statusCodesPage = new StatusCodesPage(page);

        // Validating main page elements
        await statusCodesPage.validatePage();

        // Creating response handler
        const responsePromise = statusCodesPage.createResponseHandler(statusCodesPage.serverErrorStatusCodeUrl, 5000);

        // Clicking on "404" example button
        await statusCodesPage.clickOnExampleButton('500');

        // Asserting required network response
        const responseData: TNetworkResponseType = {
            url: statusCodesPage.serverErrorStatusCodeUrl,
            status: 500,
            statusText: 'Internal Server Error'
        }
        await statusCodesPage.assertResponseData(responsePromise, responseData);

        // Validating main page elements
        await statusCodesPage.validatePage();
    });

});
