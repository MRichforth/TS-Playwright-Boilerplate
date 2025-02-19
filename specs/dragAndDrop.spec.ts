import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {DragAndDropPage} from "@mrichforth/ts-playwright-boilerplate-framework/dist/pages/drag.and.drop.page";

test.describe('Available Examples - Drag and Drop', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Drag and Drop');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Drag and Drop');
        await allure.suite('Drag and Drop scenarios');
        await allure.description("Check 'Drag and Drop' page functionality");
        await allure.tags('drag and drop', 'ui');
    });

    test('Drag and Drop', async ({page}) => {
        const dragAndDropPage = new DragAndDropPage(page);

        // Validating main page elements
        await dragAndDropPage.validatePage({exclude: 'description'});

        // Asserting order of A and B blocks
        await dragAndDropPage.assertOrderOfBlocks('A', 'B');

        // Asserting order changing of A and B blocks
        await dragAndDropPage.dragTo(dragAndDropPage.aBoxElement, dragAndDropPage.bBoxElement);
        await dragAndDropPage.assertOrderOfBlocks('B', 'A');

        await dragAndDropPage.dragTo(dragAndDropPage.bBoxElement, dragAndDropPage.aBoxElement);
        await dragAndDropPage.assertOrderOfBlocks('A', 'B');
    });

});
