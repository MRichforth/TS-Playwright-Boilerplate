import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {JQueryUIMenusPage} from "../framework/pages/jquery.ui.menus.page";

test.describe('Available Examples - JQuery UI Menus', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('JQuery UI Menus');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('JQuery UI Menus');
        await allure.suite('JQuery UI Menus scenarios');
        await allure.description("Check 'JQuery UI Menus' page functionality");
        await allure.tags('jquery', 'ui');
    });

    test('JQuery UI Menus', async ({page}) => {
        const jQueryUIMenusPage = new JQueryUIMenusPage(page);

        // Validating main page elements
        await jQueryUIMenusPage.validatePage();

        // Downloading files by types
        await jQueryUIMenusPage.downloadFileByType('PDF');
        await jQueryUIMenusPage.downloadFileByType('CSV');
        await jQueryUIMenusPage.downloadFileByType('Excel');

        // Redirecting to JQuery UI page
        await jQueryUIMenusPage.clickOnJQueryUIButton();

        // Waiting until page loaded
        await jQueryUIMenusPage.waitUntilPageLoaded('networkidle');

        // Validating main page elements
        await jQueryUIMenusPage.validatePage();

        // Clicking on "Menu" button
        await jQueryUIMenusPage.clickOnMenuButton();

        // Waiting until page loaded
        await jQueryUIMenusPage.waitUntilPageLoaded('networkidle');

        // Validating main page elements
        await jQueryUIMenusPage.validatePage();
    });

});
