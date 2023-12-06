import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {NotificationMessagesPage} from "../framework/pages/notification.messages.page";

test.describe('Available Examples - Notification Messages', () => {

    let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Notification Messages');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Notification Messages');
        await allure.suite('Notification Messages scenarios');
        await allure.description("Check 'Notification Messages' page functionality");
        await allure.tags('notification', 'ui');
    });

    test('Notification Messages', async ({page}) => {
        const notificationMessagesPage = new NotificationMessagesPage(page);

        // Validating main page elements
        await notificationMessagesPage.validatePage();

        // Asserting visibility if "Action successful" message
        await notificationMessagesPage.assertNotificationMessageVisibility('successful');

        // Asserting visibility if "Action unsuccessful" message
        await notificationMessagesPage.assertNotificationMessageVisibility('unsuccesful');

    });

});
