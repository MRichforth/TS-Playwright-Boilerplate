import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {TyposPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/typos.page";

test.describe('Available Examples - Typos', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Typos');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Typos');
        await allure.suite('Typos scenarios');
        await allure.description("Check 'Typos' page functionality");
        await allure.tags('typos', 'ui');
    });

    test('Typos', async ({page}) => {
        const typosPage = new TyposPage(page);

        // Validating main page elements
        await typosPage.validatePage();

        // Asserting visibility of typo in word "won't"
        await typosPage.assertTypoVisibility();
    });

});
