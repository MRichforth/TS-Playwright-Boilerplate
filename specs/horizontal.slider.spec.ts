import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {HorizontalSliderPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/horizontal.slider.page";

test.describe('Available Examples - Horizontal Slider', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Horizontal Slider');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Horizontal Slider');
        await allure.suite('Horizontal Slider scenarios');
        await allure.description("Check 'Horizontal Slider' page functionality");
        await allure.tags('slider', 'ui');
    });

    test('Horizontal Slider', async ({page}) => {
        const horizontalSliderPage = new HorizontalSliderPage(page);

        // Validating main page elements
        await horizontalSliderPage.validatePage();

        // Asserting horizontal slider values
        await horizontalSliderPage.assertHorizontalSliderValues('0.5', '5', '1', '4.5', '1.5', '4', '2', '3.5', '2.5', '3');
    });

});
