import {expect, test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {CommonHelper} from "../framework/helpers/common.helper";
import {DigestAuthPage} from "../framework/pages/digest.auth.page";

test.describe('Available Examples - Digest Authentication', () => {

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Digest Authentication');
        await allure.suite('Digest Authentication scenarios');
        await allure.description("Check 'Digest Authentication' page functionality");
        await allure.tags('auth', 'ui');
    });

    test('Digest Authentication', async ({browser}) => {
        // Setting HTTP authentication for page
        const page = await CommonHelper.setHttpAuth(browser, {username: 'admin', password: 'admin'});

        const basePage = new BasePage(page);

        // Opening main page
        await basePage.openPage({page: "main"});

        // Validating main page elements
        await basePage.validatePage();

        // Clicking on section by name
        await basePage.clickOnSectionByName('Digest Authentication');

        const digestAuthPage = new DigestAuthPage(page);

        // Validating "Basic Auth" page elements
        await digestAuthPage.validatePage();

        // Asserting page description
        await expect(digestAuthPage.descriptionElement).toHaveText(digestAuthPage.descriptionText);
    });

});
