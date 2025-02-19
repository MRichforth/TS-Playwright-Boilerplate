import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {FloatingMenuPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/floating.menu.page";
import {CommonAssertionsHelper} from "@mrichforth/ts-playwright-boilerplate-framework/dist/helpers/common.assertions.helper";

test.describe('Available Examples - Floating Menu', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Floating Menu');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Floating Menu');
        await allure.suite('Floating Menu scenarios');
        await allure.description("Check 'Floating Menu' page functionality");
        await allure.tags('floating', 'ui');
    });

    test('Floating Menu', async ({page}) => {
        const floatingMenuPage = new FloatingMenuPage(page);

        // Validating main page elements
        await floatingMenuPage.validatePage({exclude: 'description'});

        // Checking if floating menu is displayed
        await floatingMenuPage.checkVisibilityOfFloatingMenu();

        // Validating "Home" button functionality
        await floatingMenuPage.clickOnFloatMenuItem('Home');
        await CommonAssertionsHelper.assertUrl(page, /#home/)

        // Validating "News" button functionality
        await floatingMenuPage.clickOnFloatMenuItem('News');
        await CommonAssertionsHelper.assertUrl(page, /#news/)

        // Validating "Contact" button functionality
        await floatingMenuPage.clickOnFloatMenuItem('Contact');
        await CommonAssertionsHelper.assertUrl(page, /#contact/)

        // Validating "About" button functionality
        await floatingMenuPage.clickOnFloatMenuItem('About');
        await CommonAssertionsHelper.assertUrl(page, /#about/)

        // Checking visibility if first paragraph on the page
        await floatingMenuPage.checkVisibilityOfParagraph('first');

        // Scrolling page to the bottom
        await floatingMenuPage.scrollPageToBottom();

        // Checking visibility of the last paragraph on the page
        await floatingMenuPage.checkVisibilityOfParagraph('last');

        // Checking if floating menu is displayed
        await floatingMenuPage.checkVisibilityOfFloatingMenu();
    });

});
