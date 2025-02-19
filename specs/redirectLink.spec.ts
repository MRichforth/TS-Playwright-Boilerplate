import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {RedirectLinkPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/redirect.link.page";
import {CommonAssertionsHelper} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/helpers/common.assertions.helper";

test.describe('Available Examples - Redirect Link', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Redirect Link');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Redirect Link');
        await allure.suite('Redirect Link scenarios');
        await allure.description("Check 'Redirect Link' page functionality");
        await allure.tags('redirect', 'ui');
    });

    test('Redirect Link', async ({page}) => {
        const redirectLinkPage = new RedirectLinkPage(page);

        // Validating main page elements
        await redirectLinkPage.validatePage();

        // Clicking on redirect link button
        await redirectLinkPage.clickOnRedirectLink();

        // Validating main page elements
        await redirectLinkPage.validatePage();

        // Asserting new page url
        await CommonAssertionsHelper.assertUrl(page, /status_codes/);
    });

});
