import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {FormAuthenticationPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/form.authentication.page";

test.describe('Available Examples - Form Authentication', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Form Authentication');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Form Authentication');
        await allure.suite('Form Authentication scenarios');
        await allure.description("Check 'Form Authentication' page functionality");
        await allure.tags('authentication', 'ui');
    });

    test('Form Authentication - Positive', async ({page}) => {
        const formAuthenticationPage = new FormAuthenticationPage(page);

        // Validating main page elements
        await formAuthenticationPage.validatePage();

        // Filling credentials
        await formAuthenticationPage.fillUsernameField('tomsmith');
        await formAuthenticationPage.fillPasswordField('SuperSecretPassword!');

        // Log in
        await formAuthenticationPage.clickOnLoginButton();
        await formAuthenticationPage.validatePage();

        // Validating "Success" page
        await formAuthenticationPage.checkVisibilityOfNotificationBar();
        await formAuthenticationPage.checkNotificationText('You logged into a secure area!');

        // Log out
        await formAuthenticationPage.clickOnLogoutButton();
        await formAuthenticationPage.validatePage();
    });

    test('Form Authentication - Negative login', async ({page}) => {
        const formAuthenticationPage = new FormAuthenticationPage(page);

        // Validating main page elements
        await formAuthenticationPage.validatePage();

        // Filling credentials
        await formAuthenticationPage.fillUsernameField('admin');
        await formAuthenticationPage.fillPasswordField('SuperSecretPassword!');

        // Clicking on "Login" button
        await formAuthenticationPage.clickOnLoginButton();

        // Validating "Failed" page
        await formAuthenticationPage.checkVisibilityOfNotificationBar();
        await formAuthenticationPage.checkNotificationText('Your username is invalid!');
    });

    test('Form Authentication - Negative password', async ({page}) => {
        const formAuthenticationPage = new FormAuthenticationPage(page);

        // Validating main page elements
        await formAuthenticationPage.validatePage();

        // Filling credentials
        await formAuthenticationPage.fillUsernameField('tomsmith');
        await formAuthenticationPage.fillPasswordField('admin');

        // Clicking on "Login" button
        await formAuthenticationPage.clickOnLoginButton();

        // Validating "Failed" page
        await formAuthenticationPage.checkVisibilityOfNotificationBar();
        await formAuthenticationPage.checkNotificationText('Your password is invalid!');
    });

});
