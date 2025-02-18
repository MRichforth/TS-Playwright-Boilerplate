import {test} from '@playwright/test';
import * as allure from "allure-js-commons";
import {BasePage} from "../framework/pages/base.page";
import {FileDownloadPage} from "../framework/pages/file.download.page";

test.describe('Available Examples - File Download', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('File Download');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('File Download');
        await allure.suite('File Download scenarios');
        await allure.description("Check 'File Download' page functionality");
        await allure.tags('download', 'ui');
    });

    test('File Download', async ({page}) => {
        const fileDownloadPage = new FileDownloadPage(page);

        // Validating main page elements
        await fileDownloadPage.validatePage({exclude: 'description'});

        // Getting download link element by index
        const downloadLink = await fileDownloadPage.getDownloadLinkByIndex('1');

        // Downloading file by locator
        await fileDownloadPage.downloadFileByLocator(downloadLink, `${process.env.PWD}/artifacts/`);
    });

});
