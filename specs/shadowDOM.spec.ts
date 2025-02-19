import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {ShadowDOMPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/shadow.dom.page";

test.describe('Available Examples - Shadow DOM', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Shadow DOM');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Shadow DOM');
        await allure.suite('Shadow DOM scenarios');
        await allure.description("Check 'Shadow DOM' page functionality");
        await allure.tags('dom', 'ui');
    });

    test('Shadow DOM', async ({page}) => {
        const shadowDOMPage = new ShadowDOMPage(page);

        // Validating main page elements
        await shadowDOMPage.validatePage({exclude: 'description'});

        // Asserting that text is displayed
        const visibleText = ["Let's have some different text!", "In a list!"]
        await shadowDOMPage.assertVisibleContent(visibleText);

        // Asserting that text is hidden
        const hiddenText = ["My default text"]
        await shadowDOMPage.assertHiddenContent(hiddenText);
    });

});
