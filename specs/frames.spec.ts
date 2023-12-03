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

    test('Form Authentication - Nested Frames', async ({page}) => {
        const framesPage = new FramesPage(page);

        // Validating main page elements
        await framesPage.validatePage({exclude: 'description'});

        // Clicking on "Nested Frames" button
        await framesPage.clickOnNestedFramesButton();

        // Validating nested frames
        await framesPage.validateNestedFrame('LEFT');
        await framesPage.validateNestedFrame('MIDDLE');
        await framesPage.validateNestedFrame('RIGHT');
        await framesPage.validateNestedFrame('BOTTOM');
    });

    test('Form Authentication - iFrame', async ({page}) => {
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
