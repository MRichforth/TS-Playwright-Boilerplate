import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {NestedFramesPage} from "../framework/pages/nested.frames.page";

test.describe('Available Examples - Nested Frames', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Nested Frames');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Nested Frames');
        await allure.suite('Nested Frames scenarios');
        await allure.description("Check 'Nested Frames' page functionality");
        await allure.tags('frames', 'ui');
    });

    test('Nested Frames', async ({page}) => {
        const nestedFramesPage = new NestedFramesPage(page);

        // Validating nested frames
        await nestedFramesPage.validateNestedFrame('LEFT');
        await nestedFramesPage.validateNestedFrame('MIDDLE');
        await nestedFramesPage.validateNestedFrame('RIGHT');
        await nestedFramesPage.validateNestedFrame('BOTTOM');
    });

});
