import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {ShiftingContentPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/shifting.content.page";

// TODO: [18.02.25] This scenario is not included in the overall results due to specifics of cache uploading when working with docker-compose files
test.describe.fixme('Available Examples - Shifting Content', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Shifting Content');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Shifting Content');
        await allure.suite('Shifting Content scenarios');
        await allure.description("Check 'Shifting Content' page functionality");
        await allure.tags('shifting', 'ui');
    });

    test('Shifting Content - Example 1: Menu Element', async ({page}) => {
        const shiftingContentPage = new ShiftingContentPage(page);

        // Validating main page elements
        await shiftingContentPage.validatePage();

        // Clicking on first example link
        await shiftingContentPage.clickOnExampleButtonByIndex('1');

        // Validating main page elements after page reloading
        await shiftingContentPage.validatePage();

        // Clicking on button that shifts element for trigger of element position change
        await shiftingContentPage.clickOnShiftButton();

        // Asserting expected element position according to snapshot
        await shiftingContentPage.assertVisualComparison(shiftingContentPage.menuElement, 'menuElement.png');

    });

    test('Shifting Content - Example 2: An image', async ({page}) => {
        const shiftingContentPage = new ShiftingContentPage(page);

        // Validating main page elements
        await shiftingContentPage.validatePage();

        // Clicking on second example link
        await shiftingContentPage.clickOnExampleButtonByIndex('2');

        // Validating main page elements after page reloading
        await shiftingContentPage.validatePage();

        // Clicking on button that shifts element for trigger of element position change
        await shiftingContentPage.clickOnShiftButton();

        // Asserting expected element position according to snapshot
        await shiftingContentPage.assertVisualComparison(shiftingContentPage.imageElement, 'imageElement.png');
    });

    test('Shifting Content - Example 3: List', async ({page}) => {
        const shiftingContentPage = new ShiftingContentPage(page);

        // Validating main page elements
        await shiftingContentPage.validatePage();

        // Clicking on second example link
        await shiftingContentPage.clickOnExampleButtonByIndex('3');

        // Validating main page elements after page reloading
        await shiftingContentPage.validatePage();

        // Refreshing page to trigger text changing
        await shiftingContentPage.reloadPage();

        // Asserting expected element position according to snapshot
        await shiftingContentPage.assertVisualComparison(shiftingContentPage.listElement, 'listElement.png');
    });

});
