import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {HoversPage} from "../framework/pages/hovers.page";

test.describe('Available Examples - Hovers', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Hovers');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Hovers');
        await allure.suite('Hovers scenarios');
        await allure.description("Check 'Hovers' page functionality");
        await allure.tags('hovers', 'ui');
    });

    test('Hovers', async ({page}) => {
        const hoversPage = new HoversPage(page);

        // Validating main page elements
        await hoversPage.validatePage();

        // Asserting info cards details
        await hoversPage.assertInfoCardDetailsByIndex('1');
        await hoversPage.assertInfoCardDetailsByIndex('2');
        await hoversPage.assertInfoCardDetailsByIndex('3');
    });

});
