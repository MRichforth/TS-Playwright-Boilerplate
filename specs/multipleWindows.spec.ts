import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {MultipleWindowsPage} from "../framework/pages/multiple.windows.page";

test.describe('Available Examples - Multiple Windows', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Multiple Windows');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Multiple Windows');
        await allure.suite('Multiple Windows scenarios');
        await allure.description("Check 'Multiple Windows' page functionality");
        await allure.tags('windows', 'ui');
    });

    test('Multiple Windows', async ({page}) => {
        const multipleWindowsPage = new MultipleWindowsPage(page);

        // Validating main page elements
        await multipleWindowsPage.validatePage({exclude: 'description'});

        // Opening link in a new browser tab and creating a new instance of page
        const newTab = await multipleWindowsPage.openLinkInNewTab(multipleWindowsPage.newTabButtonElement);

        // Creating a new instance of class for new browser page
        const newMultipleWindowsPage = new MultipleWindowsPage(newTab);

        // Asserting new page title
        await newMultipleWindowsPage.assertNewPageTitle('New Window');

        // Switching to the previous tab
        await newMultipleWindowsPage.switchToTab(0);

        // Validating main page elements
        await multipleWindowsPage.validatePage({exclude: 'description'});
    });

});
