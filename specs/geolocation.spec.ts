import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {GeolocationPage} from "../framework/pages/geolocation.page";

test.describe('Available Examples - Geolocation', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Geolocation');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Geolocation');
        await allure.suite('Geolocation scenarios');
        await allure.description("Check 'Geolocation' page functionality");
        await allure.tags('geolocation', 'ui');
    });

    test('Geolocation', async ({page}) => {
        const geolocationPage = new GeolocationPage(page);

        // Validating main page elements
        await geolocationPage.validatePage();

        // Clicking on "Where am I?" button
        await geolocationPage.clickOnGeolocationButton();

        // Asserting geolocation values
        await geolocationPage.assertLatitudeValue('41.889938');
        await geolocationPage.assertLongitudeValue('12.492507');
    });

});
