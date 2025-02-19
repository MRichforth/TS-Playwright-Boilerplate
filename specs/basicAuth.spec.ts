import {expect, test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {CommonHelper} from "@mrichforth/ts-playwright-boilerplate-framework/dist/helpers/common.helper";
import {BasicAuthPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/basic.auth.page";

test.describe('Available Examples - Basic Auth', () => {

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Basic Auth');
        await allure.suite('Basic Auth scenarios');
        await allure.description("Check 'Basic Auth' page functionality");
        await allure.tags('auth', 'ui');
    });

    test('Basic Auth', async ({browser}) => {
        // Setting HTTP authentication for page
        const page = await CommonHelper.setHttpAuth(browser, {username: 'admin', password: 'admin'});

        const basePage = new BasePage(page);

        // Opening main page
        await basePage.openPage({page: "main"});

        // Validating main page elements
        await basePage.validatePage();

        // Clicking on section by name
        await basePage.clickOnSectionByName('Basic Auth');

        const basicAuthPage = new BasicAuthPage(page);

        // Validating "Basic Auth" page elements
        await basicAuthPage.validatePage();

        // Asserting page description
        await expect(basicAuthPage.descriptionElement).toHaveText(basicAuthPage.descriptionText);
    });

});
