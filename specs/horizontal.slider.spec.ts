import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {HorizontalSliderPage} from "../framework/pages/horizontal.slider.page";

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
        await allure.tags('geolocation', 'ui');
    });

    test('Horizontal Slider', async ({page}) => {
        const horizontalSliderPage = new HorizontalSliderPage(page);

        // Validating main page elements
        await horizontalSliderPage.validatePage();

        // Asserting horizontal slider values
        await horizontalSliderPage.assertHorizontalSliderValues('0.5', '5', '1', '4.5', '1.5', '4', '2', '3.5', '2.5', '3');
    });

});
