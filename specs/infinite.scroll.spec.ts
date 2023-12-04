import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {InfiniteScrollPage} from "../framework/pages/infinite.scroll.page";

test.describe('Available Examples - Infinite Scroll', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Infinite Scroll');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Infinite Scroll');
        await allure.suite('Infinite Scroll scenarios');
        await allure.description("Check 'Infinite Scroll' page functionality");
        await allure.tags('scroll', 'ui');
    });

    test('Infinite Scroll', async ({page}) => {
        const infiniteScrollPage = new InfiniteScrollPage(page);

        // Validating main page elements
        await infiniteScrollPage.validatePage({exclude: 'description'});

        // Asserting visibility of footer link in viewport
        await infiniteScrollPage.assertVisibilityOfFooterLink();
    });

});
