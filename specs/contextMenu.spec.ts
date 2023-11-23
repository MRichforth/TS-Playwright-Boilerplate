import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {ContextMenuPage} from "../framework/pages/context.menu.page";

test.describe('Available Examples - Context Menu', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Context Menu');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Context Menu');
        await allure.suite('Context Menu scenarios');
        await allure.description("Check 'Context Menu' page functionality");
        await allure.tags('context', 'ui');
    });

    test('Context Menu', async ({page}) => {
        const contextMenuPage = new ContextMenuPage(page);

        // Validating main page elements
        await contextMenuPage.validatePage({exclude: 'description'});

        // Creating listener for dialog box
        await contextMenuPage.handleDialogBox();

        // Right-clicking on dialog trigger button
        await contextMenuPage.rightClickOnContextMenu();
    });

});
