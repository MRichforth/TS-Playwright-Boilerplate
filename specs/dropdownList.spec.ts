import {expect, test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {DropdownListPage} from "../framework/pages/dropdown.list.page";

test.describe('Available Examples - Dropdown List', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Dropdown');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Dropdown');
        await allure.suite('Dropdown scenarios');
        await allure.description("Check 'Dropdown' page functionality");
        await allure.tags('dropdown', 'ui');
    });

    test('Dropdown', async ({page}) => {
        const dropdownListPage = new DropdownListPage(page);

        // Validating main page elements
        await dropdownListPage.validatePage({exclude: 'description'});

        // Selecting first option in dropdown
        await dropdownListPage.selectOptionByValue("Option 1");

        // Getting selected option text
        let selectedOption = await dropdownListPage.getSelectedOptionText();

        // Asserting that selected option is displayed
        expect(selectedOption).toEqual('Option 1');

        // Selecting first option in dropdown
        await dropdownListPage.selectOptionByValue("Option 2");

        // Getting selected option text
        selectedOption = await dropdownListPage.getSelectedOptionText();

        // Asserting that selected option is displayed
        expect(selectedOption).toEqual('Option 2');
    });

});
