import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {ForgotPasswordPage} from "../framework/pages/forgot.password.page";

// Scenario cannot be covered due to Internal Server Error
test.describe.skip('Available Examples - Forgot Password', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Forgot Password');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Forgot Password');
        await allure.suite('Forgot Password scenarios');
        await allure.description("Check 'Forgot Password' page functionality");
        await allure.tags('password', 'ui');
    });

    test.skip('Forgot Password', async ({page}) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        // Validating main page elements
        await forgotPasswordPage.validatePage({exclude: 'description'});

        await forgotPasswordPage.fillPasswordInput('test@gmail.com')

        await forgotPasswordPage.clickOnSubmitButton();

        // Scenario cannot be further covered due to Internal Server Error
    });

});
