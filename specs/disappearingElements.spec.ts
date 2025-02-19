import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {DisappearingElementsPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/disappearing.elements.page";

test.describe('Available Examples - Disappearing Elements', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Disappearing Elements');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Disappearing Elements');
        await allure.suite('Disappearing Elements scenarios');
        await allure.description("Check 'Disappearing Elements' page functionality");
        await allure.tags('elements', 'ui');
    });

    test('Disappearing Elements', async ({page}) => {
        const disappearingElementsPage = new DisappearingElementsPage(page);

        // Validating main page elements
        await disappearingElementsPage.validatePage();

        // Validating main page buttons
        await disappearingElementsPage.validateButtonVisibility('Home');
        await disappearingElementsPage.validateButtonVisibility('About');
        await disappearingElementsPage.validateButtonVisibility('Contact Us');
        await disappearingElementsPage.validateButtonVisibility('Portfolio');
        await disappearingElementsPage.validateButtonVisibility('Gallery');
    });

});
