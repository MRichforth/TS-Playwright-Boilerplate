import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {InputsPage} from "../framework/pages/inputs.page";

test.describe('Available Examples - Inputs', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Inputs');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Inputs');
        await allure.suite('Inputs scenarios');
        await allure.description("Check 'Inputs' page functionality");
        await allure.tags('inputs', 'ui');
    });

    test('Inputs', async ({page}) => {
        const inputsPage = new InputsPage(page);

        // Validating main page elements
        await inputsPage.validatePage({exclude: 'description'});

        // Asserting number input title
        await inputsPage.assertInputTitle('Number');

        // Filling number input with test values
        await inputsPage.fillNumberInput('1234567890');

        // Asserting number input value
        await inputsPage.assertNumberInputValue('1234567890');
    });

});
