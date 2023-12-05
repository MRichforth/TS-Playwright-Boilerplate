import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {JavaScriptOnloadEventErrorPage, TConsoleErrorData} from "../framework/pages/javascript.onload.event.error.page";

test.describe('Available Examples - JavaScript onload event error', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('JavaScript onload event error');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('JavaScript onload event error');
        await allure.suite('JavaScript onload event error scenarios');
        await allure.description("Check 'JavaScript onload event error' page functionality");
        await allure.tags('error', 'ui');
    });

    test('JavaScript onload event error', async ({page}) => {
        const javaScriptOnloadEventErrorPage = new JavaScriptOnloadEventErrorPage(page);

        // Creating event handler for console error
        const consoleErrorData: TConsoleErrorData = {
            name: "TypeError",
            message: "Cannot read properties of undefined (reading 'xyz')",
            stack: "at onload"
        };
        await javaScriptOnloadEventErrorPage.assertPageConsoleError(consoleErrorData);

        // Reloading page to trigger new console error
        await javaScriptOnloadEventErrorPage.reloadPage();
    });

});
