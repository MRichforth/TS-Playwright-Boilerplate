import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/base.page";
import {DynamicControlsPage} from "@mrichforth-boilerplates/ts-playwright-boilerplate-framework/dist/pages/dynamic.controls.page";

test.describe('Available Examples - Dynamic Controls', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Dynamic Controls');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Dynamic Controls');
        await allure.suite('Dynamic Controls scenarios');
        await allure.description("Check 'Dynamic Controls' page functionality");
        await allure.tags('dynamic', 'ui');
    });

    test('Dynamic Content - Remove/add', async ({page}) => {
        const dynamicControlsPage = new DynamicControlsPage(page);

        // Validating main page elements
        await dynamicControlsPage.validateDynamicControlPage();

        // Asserting "A" checkbox visibility
        await dynamicControlsPage.assertCheckboxVisibility(true);

        // Ticking on "A" checkbox to verify functionality
        await dynamicControlsPage.tickCheckbox(true);

        // Removing "A" checkbox and verifying absence
        await dynamicControlsPage.clickOnRemoveButton();
        await dynamicControlsPage.waitUntilProgressBarDisappeared();
        await dynamicControlsPage.assertCheckboxVisibility(false);
        await dynamicControlsPage.assertSuccessMessageByText("It's gone!");

        // Adding "A" checkbox and verifying presence
        await dynamicControlsPage.clickOnAddButton();
        await dynamicControlsPage.waitUntilProgressBarDisappeared();
        await dynamicControlsPage.assertCheckboxVisibility(true);
        await dynamicControlsPage.assertSuccessMessageByText("It's back!");
    });

    test('Dynamic Content - Enable/disable', async ({page}) => {
        const dynamicControlsPage = new DynamicControlsPage(page);

        // Validating main page elements
        await dynamicControlsPage.validateDynamicControlPage();

        // Asserting input default state
        await dynamicControlsPage.assertInputState('disabled');

        // Enabling input and verifying state
        await dynamicControlsPage.clickOnEnableButton();
        await dynamicControlsPage.waitUntilProgressBarDisappeared();
        await dynamicControlsPage.assertInputState('enabled');
        await dynamicControlsPage.assertSuccessMessageByText("It's enabled!");

        // Disabling input and verifying state
        await dynamicControlsPage.clickOnDisableButton();
        await dynamicControlsPage.waitUntilProgressBarDisappeared();
        await dynamicControlsPage.assertInputState('disabled');
        await dynamicControlsPage.assertSuccessMessageByText("It's disabled!");
    });

});
