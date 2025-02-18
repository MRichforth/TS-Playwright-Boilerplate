import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {DynamicContentPage, TStaticRowTypes} from "../framework/pages/dynamic.content.page";

test.describe('Available Examples - Dynamic Content', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Dynamic Content');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Dynamic Content');
        await allure.suite('Dynamic Content scenarios');
        await allure.description("Check 'Dynamic Content' page functionality");
        await allure.tags('dynamic', 'ui');
    });

    test('Dynamic Content - Dynamic', async ({page}) => {
        const dynamicContentPage = new DynamicContentPage(page);

        // Validating main page elements
        await dynamicContentPage.validatePage();

        // Validating dynamic rows content
        await dynamicContentPage.validateDynamicRowsContent();
    });

    // TODO: [28.02.25] This scenario found a bug, since being on a static page the second image should always contain the image “3.jpg”,
    //  but the scenario detects a different image in localhost application
    test.fixme('Dynamic Content - Static', async ({page}) => {
        const dynamicContentPage = new DynamicContentPage(page);

        // Validating main page elements
        await dynamicContentPage.validatePage();

        // Clicking on "Click Here" button
        await dynamicContentPage.clickOnStaticPageButton();

        // Asserting visibility of first row
        const firstRow: TStaticRowTypes = {
            imageSrc: '/img/avatars/Original-Facebook-Geek-Profile-Avatar-7.jpg',
            text: 'Accusantium eius ut architecto neque vel voluptatem vel nam eos minus ullam dolores voluptates enim sed voluptatem rerum qui sapiente nesciunt aspernatur et accusamus laboriosam culpa tenetur hic aut placeat error autem qui sunt.'
        };
        await dynamicContentPage.validateStaticRowContent(firstRow);

        // Asserting visibility of second row
        const secondRow: TStaticRowTypes = {
            imageSrc: '/img/avatars/Original-Facebook-Geek-Profile-Avatar-3.jpg',
            text: 'Omnis fugiat porro vero quas tempora quis eveniet ab officia cupiditate culpa repellat debitis itaque possimus odit dolorum et iste quibusdam quis dicta autem sint vel quo vel consequuntur dolorem nihil neque sunt aperiam blanditiis.'
        };
        await dynamicContentPage.validateStaticRowContent(secondRow);

        // Currently, the third row of the static page is not static, so it cannot be checked.
    });

});
