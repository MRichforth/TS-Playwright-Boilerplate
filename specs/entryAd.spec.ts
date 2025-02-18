import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {EntryAdPage, TEntryModalContentType} from "../framework/pages/entry.ad.page";

test.describe('Available Examples - Entry Ad', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Entry Ad');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Entry Ad');
        await allure.suite('Entry Ad scenarios');
        await allure.description("Check 'Entry Ad' page functionality");
        await allure.tags('ad', 'ui');
    });

    test('Entry Ad', async ({page}) => {
        const entryAdPage = new EntryAdPage(page);

        // Waiting until entry ad is displayed
        await entryAdPage.waitForEntryModalState('visible');

        // Validating entry ad content
        const entryModalContent: TEntryModalContentType = {
            title: "This is a modal window",
            body: "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).",
            footer: "Close"
        };
        await entryAdPage.validateEntryModal(entryModalContent);

        // Closing entry ad by clicking on "Close" button
        await entryAdPage.closeEntryAdModal();

        // Waiting until entry ad is disappeared
        await entryAdPage.waitForEntryModalState('hidden');

        // Validating main page elements
        await entryAdPage.validatePage();
    });

});
