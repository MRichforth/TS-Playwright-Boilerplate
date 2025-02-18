import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {TEntryModalContentType} from "../framework/pages/entry.ad.page";
import {ExitIntentPage} from "../framework/pages/exit.intent.page";

test.describe('Available Examples - Exit Intent', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Exit Intent');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Exit Intent');
        await allure.suite('Exit Intent scenarios');
        await allure.description("Check 'Exit Intent' page functionality");
        await allure.tags('ad', 'ui');
    });

    test('Exit Intent', async ({page}) => {
        const exitIntentPage = new ExitIntentPage(page);

        // Validating main page elements
        await exitIntentPage.validatePage();

        // Moving mouse outside of 'html' element to trigger ad modal
        await exitIntentPage.moveMouseOutsideOfViewport();

        // Waiting until entry ad is displayed
        await exitIntentPage.waitForEntryModalState('visible');

        // Validating entry ad content
        const entryModalContent: TEntryModalContentType = {
            title: "This is a modal window",
            body: "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something).",
            footer: "Close"
        };
        await exitIntentPage.validateEntryModal(entryModalContent);

        // Closing entry ad by clicking on "Close" button
        await exitIntentPage.closeEntryAdModal();

        // Waiting until entry ad is disappeared
        await exitIntentPage.waitForEntryModalState('hidden');

    });

});
