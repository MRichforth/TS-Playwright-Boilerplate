import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {FramesPage} from "../framework/pages/frames.page";

test.describe('Available Examples - Frames', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Frames');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Frames');
        await allure.suite('Frames scenarios');
        await allure.description("Check 'Frames' page functionality");
        await allure.tags('frames', 'ui');
    });

    /**
     * Due to the fact that "Nested Frames" button of the "Frames" section leads to a separate "Nested Frames" section,
     * the test for this functionality has been moved to a separate spec file
     */

    // TODO: Currently, an error is displayed on UI "TinyMCE is in read-only mode because you have no more editor loads available this month."
    test.fixme('Form Authentication - iFrame', async ({page}) => {
        const framesPage = new FramesPage(page);

        // Validating main page elements
        await framesPage.validatePage({exclude: 'description'});

        // Clicking in "iFrame" button
        await framesPage.clickOnIFrameButton();

        // Filling iFrame input with test message
        const message = 'Test message for iframe input';
        await framesPage.fillTextInput(message);

        // Asserting iFrame text value
        await framesPage.assertIFrameInputValue(message);
    });

});
