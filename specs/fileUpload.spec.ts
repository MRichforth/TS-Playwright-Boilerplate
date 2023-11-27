import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {FileUploadPage} from "../framework/pages/file.upload.page";

test.describe('Available Examples - File Upload', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('File Upload');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('File Upload');
        await allure.suite('File Upload scenarios');
        await allure.description("Check 'File Upload' page functionality");
        await allure.tags('upload', 'ui');
    });

    test('File Upload', async ({page}) => {
        const fileUploadPage = new FileUploadPage(page);

        // Validating main page elements
        await fileUploadPage.validatePage();

        await fileUploadPage.uploadFileByPath('first', `${process.env.PWD}/framework/test.png`)

        await fileUploadPage.checkInputValue('first', 'test.png');

        // Second input functionality cannot be implemented due to internal server error!

        await fileUploadPage.uploadFileByPath('third', `${process.env.PWD}/framework/test.png`)

        await fileUploadPage.checkInputValue('third', 'test.png');
    });

});
