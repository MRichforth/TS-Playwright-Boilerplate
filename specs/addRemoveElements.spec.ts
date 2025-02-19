import {expect, test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {AddRemoveElementsPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/add.remove.elements.page";

test.describe('Available Examples - Add/Remove Elements', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Add/Remove Elements');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Add/Remove Elements');
        await allure.suite('Add/Remove Elements scenarios');
        await allure.description("Check 'Add/Remove Elements' page functionality");
        await allure.tags('a/b', 'ui');
    });

    test('Add/Remove Elements', async ({page}) => {
        const addRemoveElementsPage = new AddRemoveElementsPage(page);

        // Validating main page elements
        await addRemoveElementsPage.validatePage({exclude: 'description'});

        // Clicking on "Add Elements" button
        await addRemoveElementsPage.clickOnAddElementButton();

        // Getting number of "Delete" buttons
        let deleteButtonCount = await addRemoveElementsPage.getDeleteButtonQuantity()

        // Asserting "Delete" buttons quantity
        expect(deleteButtonCount).toEqual(1);

        // Clicking on "Delete Elements" button
        await addRemoveElementsPage.clickOnDeleteElementButton();

        // Getting number of "Delete" buttons
        deleteButtonCount = await addRemoveElementsPage.getDeleteButtonQuantity()

        // Asserting "Delete" buttons quantity
        expect(deleteButtonCount).toEqual(0);
    });

});
