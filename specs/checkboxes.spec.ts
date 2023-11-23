import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {CheckboxesPage} from "../framework/pages/checkboxes.page";

test.describe('Available Examples - Checkboxes', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Checkboxes');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Checkboxes');
        await allure.suite('Checkboxes scenarios');
        await allure.description("Check 'Checkboxes' page functionality");
        await allure.tags('checkbox', 'ui');
    });

    test('Checkboxes', async ({page}) => {
        const checkboxesPage = new CheckboxesPage(page);

        // Validating main page elements
        await checkboxesPage.validatePage({exclude: 'description'});

        // Ticking checkboxes according to their states
        await checkboxesPage.tickCheckboxByName('checkbox 1', true);
        await checkboxesPage.tickCheckboxByName('checkbox 2', false);

        await checkboxesPage.tickCheckboxByName('checkbox 1', false);
        await checkboxesPage.tickCheckboxByName('checkbox 2', true);
    });

});
