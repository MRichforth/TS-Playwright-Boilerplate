import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {DynamicLoadingPage} from "../framework/pages/dynamic.loading.page";

test.describe('Available Examples - Dynamic Loading', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Dynamic Loading');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Dynamic Loading');
        await allure.suite('Dynamic Loading scenarios');
        await allure.description("Check 'Dynamic Loading' page functionality");
        await allure.tags('dynamic', 'ui');
    });

    test('Dynamic Loading - Example 1', async ({page}) => {
        const dynamicLoadingPage = new DynamicLoadingPage(page);

        // Validating main page elements
        await dynamicLoadingPage.validatePage();

        // Selecting first example page
        await dynamicLoadingPage.clickOnDynamicExampleLink('1');

        // Validating first example page elements
        await dynamicLoadingPage.validateExamplePage();

        // Asserting that "Finish" element is attached to the page but not visible
        await dynamicLoadingPage.assertStateOfFinishElement('attached');

        // Clicking on "Start" button
        await dynamicLoadingPage.clickOnStartButton();

        // Waiting until progress bar disappear
        await dynamicLoadingPage.waitUntilProgressBarDisappeared();

        // Asserting that "Finish" element is displayed
        await dynamicLoadingPage.assertStateOfFinishElement('visible');
    });

    test('Dynamic Loading - Example 2', async ({page}) => {
        const dynamicLoadingPage = new DynamicLoadingPage(page);

        // Validating main page elements
        await dynamicLoadingPage.validatePage();

        // Selecting first example page
        await dynamicLoadingPage.clickOnDynamicExampleLink('2');

        // Validating first example page elements
        await dynamicLoadingPage.validateExamplePage();

        // Asserting that "Finish" element is detached to the page and isn't visible
        await dynamicLoadingPage.assertStateOfFinishElement('detached');

        // Clicking on "Start" button
        await dynamicLoadingPage.clickOnStartButton();

        // Waiting until progress bar disappear
        await dynamicLoadingPage.waitUntilProgressBarDisappeared();

        // Asserting that "Finish" element is displayed
        await dynamicLoadingPage.assertStateOfFinishElement('visible');
    });

});
