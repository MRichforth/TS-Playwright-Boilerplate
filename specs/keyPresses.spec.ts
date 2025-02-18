import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {KeyPressesPage} from "../framework/pages/key.presses.page";

test.describe('Available Examples - Key Presses', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Key Presses');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Key Presses');
        await allure.suite('Key Presses scenarios');
        await allure.description("Check 'Key Presses' page functionality");
        await allure.tags('key', 'ui');
    });

    test('Key Presses', async ({page}) => {
        const keyPressesPage = new KeyPressesPage(page);

        // Validating main page elements
        await keyPressesPage.validatePage();

        // Asserting alphabet letters recognizing
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        await keyPressesPage.assertKeyRecognizing(alphabet);

        // Asserting numbers recognizing
        const numbers = '0123456789'.split('');
        await keyPressesPage.assertKeyRecognizing(numbers);

        // Asserting numbers recognizing
        const fKeys = Array.from({length: 12}, (_, index) => `F${index + 1}`);
        await keyPressesPage.assertKeyRecognizing(fKeys);

        // Asserting special keys
        const specialKeys = ['Backquote', 'Backslash', 'Backspace', 'Tab', 'Delete', 'Escape', 'End', 'Home', 'Insert', 'PageDown', 'PageUp', 'Shift', 'Control', 'Alt'];
        await keyPressesPage.assertKeyRecognizing(specialKeys);
    });

});
