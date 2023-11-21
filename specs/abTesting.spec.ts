import {expect, test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {ABTestingPage} from "../framework/pages/a.b.testing.page";

test.describe('Available Examples - A/B Testing', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('A/B Testing');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('A/B Testing');
        await allure.suite('A/B Testing scenarios');
        await allure.description("Check 'A/B Testing' page functionality");
        await allure.tags('a/b', 'ui');
    });

    test('A/B Test Control', async ({page}) => {
        // Asserting page title
        await expect(page).toHaveTitle('The Internet');

        const abTestingPage = new ABTestingPage(page);

        // Validating main page elements except title
        await abTestingPage.validatePage({exclude: 'title'});

        // Validating A/B title
        await abTestingPage.validateABTitle();

        // Asserting page description
        await expect(abTestingPage.descriptionElement).toHaveText(abTestingPage.descriptionText);
    });

});
