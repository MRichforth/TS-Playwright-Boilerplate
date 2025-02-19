import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {JavaScriptAlertsPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/javascript.alerts.page";

test.describe('Available Examples - JavaScript Alerts', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('JavaScript Alerts');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('JavaScript Alerts');
        await allure.suite('JavaScript Alerts scenarios');
        await allure.description("Check 'JavaScript Alerts' page functionality");
        await allure.tags('alerts', 'ui');
    });

    test('JavaScript Alerts - Alert', async ({page}) => {
        const javaScriptAlertsPage = new JavaScriptAlertsPage(page);

        // Validating main page elements
        await javaScriptAlertsPage.validatePage();

        // Asserting "Alert" dialog
        await javaScriptAlertsPage.handleAlertDialog();
        await javaScriptAlertsPage.clickOnDialogButton('Alert');

        // Asserting specific dialog result
        await javaScriptAlertsPage.assertDialogResult('Alert');
    });

    test('JavaScript Alerts - Confirm', async ({page}) => {
        const javaScriptAlertsPage = new JavaScriptAlertsPage(page);

        // Validating main page elements
        await javaScriptAlertsPage.validatePage();

        // Asserting "Alert" dialog
        await javaScriptAlertsPage.handleConfirmDialog('accept');
        await javaScriptAlertsPage.clickOnDialogButton('Confirm');

        // Asserting specific dialog result
        await javaScriptAlertsPage.assertDialogResult('Confirm');
    });

    test('JavaScript Alerts - Cancel', async ({page}) => {
        const javaScriptAlertsPage = new JavaScriptAlertsPage(page);

        // Validating main page elements
        await javaScriptAlertsPage.validatePage();

        // Asserting "Alert" dialog
        await javaScriptAlertsPage.handleConfirmDialog('decline');
        await javaScriptAlertsPage.clickOnDialogButton('Confirm');

        // Asserting specific dialog result
        await javaScriptAlertsPage.assertDialogResult('Cancel');
    });

    test('JavaScript Alerts - Prompt', async ({page}) => {
        const javaScriptAlertsPage = new JavaScriptAlertsPage(page);

        // Validating main page elements
        await javaScriptAlertsPage.validatePage();

        // Asserting "Alert" dialog
        const promptMessage = 'TestValue';
        await javaScriptAlertsPage.handlePromptDialog(promptMessage);
        await javaScriptAlertsPage.clickOnDialogButton('Prompt');

        // Asserting specific dialog result
        await javaScriptAlertsPage.assertDialogResult('Prompt', promptMessage);
    });

});
