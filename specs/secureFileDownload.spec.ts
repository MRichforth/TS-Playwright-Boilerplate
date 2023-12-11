import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {SecureFileDownloadPage} from "../framework/pages/secure.file.download.page";
import {CommonHelper} from "../framework/helpers/common.helper";

test.describe('Available Examples - Secure File Download', () => {

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Secure File Download');
        await allure.suite('Secure File Download scenarios');
        await allure.description("Check 'Secure File Download' page functionality");
        await allure.tags('download', 'ui');
    });

    test('Secure File Download', async ({browser}) => {
        // Setting HTTP authentication for page
        const page = await CommonHelper.setHttpAuth(browser, {username: 'admin', password: 'admin'});

        // Navigating to required page
        const basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Secure File Download');

        const secureFileDownloadPage = new SecureFileDownloadPage(page);

        // Validating main page elements
        await secureFileDownloadPage.validatePage({exclude: 'description'});

        // Getting download link element by index
        const downloadLink = await secureFileDownloadPage.getDownloadLinkByIndex('1');

        // Downloading file by locator
        await secureFileDownloadPage.downloadFileByLocator(downloadLink, `${process.env.PWD}/artifacts/`);
    });

});
