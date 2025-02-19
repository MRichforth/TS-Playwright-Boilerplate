import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {ChallengingDomPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/challenging.dom.page";

test.describe('Available Examples - Challenging DOM', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Challenging DOM');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Challenging DOM');
        await allure.suite('Challenging DOM scenarios');
        await allure.description("Check 'Challenging DOM' page functionality");
        await allure.tags('dom', 'ui');
    });

    test('Challenging DOM', async ({page}) => {
        const challengingDomPage = new ChallengingDomPage(page);

        // Validating main page elements
        await challengingDomPage.validatePage();

        // Validating column titles
        await challengingDomPage.validateColumnTitles();

        // Validating columns items except "Actions" column
        await challengingDomPage.validateColumnItems('Lorem');
        await challengingDomPage.validateColumnItems('Ipsum');
        await challengingDomPage.validateColumnItems('Dolor');
        await challengingDomPage.validateColumnItems('Sit');
        await challengingDomPage.validateColumnItems('Amet');
        await challengingDomPage.validateColumnItems('Diceret');

        // Validating "Action" column items
        await challengingDomPage.validateActionColumnItems();

        // Validating buttons
        await challengingDomPage.clickOnBasicButton();
        await challengingDomPage.clickOnAlertButton();
        await challengingDomPage.clickOnSuccessButton();
    });

});
