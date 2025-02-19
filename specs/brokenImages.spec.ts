import {expect, test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {BrokenImagesPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/broken.images.page";

test.describe('Available Examples - Broken Images', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Broken Images');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Broken Images');
        await allure.suite('Broken Images scenarios');
        await allure.description("Check 'Broken Images' page functionality");
        await allure.tags('img', 'ui');
    });

    test('Broken Images', async ({page}) => {
        const brokenImagesPage = new BrokenImagesPage(page);

        // Validating main page elements
        await brokenImagesPage.validatePage({exclude: 'description'});

        // Getting count of images on page
        const imagesCount = await brokenImagesPage.getImagesCount();

        // Asserting count of images
        expect(imagesCount).toEqual(3);

        // Validating broken images
        await brokenImagesPage.validateImages();
    });

});
