import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {
    LargeAndDeepDomPage,
    TNoSiblingsData,
    TSiblingData,
    TTableData
} from "../framework/pages/large.and.deep.dom.page";

test.describe('Available Examples - Large & Deep DOM', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Large & Deep DOM');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Large & Deep DOM');
        await allure.suite('Large & Deep DOM scenarios');
        await allure.description("Check 'Large & Deep DOM' page functionality");
        await allure.tags('dom', 'ui');
    });

    test('Large & Deep DOM', async ({page}) => {
        const largeAndDeepDomPage = new LargeAndDeepDomPage(page);

        // Validating main page elements
        await largeAndDeepDomPage.validatePage();

        // Asserting "No Siblings" DOM example
        const noSiblingExampleData: TNoSiblingsData = {
            title: 'No Siblings',
            item: 'No siblings'
        };
        await largeAndDeepDomPage.assertNoSiblingsExample(noSiblingExampleData);

        // Asserting "Siblings" DOM example
        const siblingExampleData: TSiblingData = {
            title: 'Siblings',
            items: await largeAndDeepDomPage.generateSiblingExpectedResult(1, 50, 3)
        }
        await largeAndDeepDomPage.assertSiblingsExample(siblingExampleData);

        // Asserting "Table" DOM example
        const tableExampleData: TTableData = {
            title: 'Table',
            items: await largeAndDeepDomPage.generateTableExpectedResult(50, 50)
        }
        await largeAndDeepDomPage.assertTableExample(tableExampleData);
    });

});
