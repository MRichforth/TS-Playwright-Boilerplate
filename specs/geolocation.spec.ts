import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {GeolocationPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/geolocation.page";

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

    // TODO: [18.02.25] It is required to investigate stability of this scenario in GH Actions
    test.fixme('Geolocation', async ({page}) => {
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
