import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class NotificationMessagesPage extends BasePage {

    readonly page: Page;
    readonly newMessageTriggerButtonElement: Locator;
    readonly notificationMessageElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.newMessageTriggerButtonElement = this.page.locator('//a[contains(@href, "notification")]');
        this.notificationMessageElement = this.page.locator('//div[@id="flash"]');
    }

    @step('Validating button visibility')
    async assertNotificationMessageVisibility(messageType: 'successful' | 'unsuccesful') {
        await this.notificationMessageElement.waitFor({state: 'visible'});
        await this.newMessageTriggerButtonElement.waitFor({state: 'visible'});

        /**
         * Due to the fact that the expected message may not appear after one click on the trigger button,
         * we need to click on it until the expected text appears or the limit of clicks runs out
         */

        let notificationMassage = await this.notificationMessageElement.textContent();
        let count = 0;
        while (!notificationMassage?.includes(messageType) && count <= 10) {
            await this.newMessageTriggerButtonElement.click();
            notificationMassage = await this.notificationMessageElement.textContent();
            count++
        }

        expect(notificationMassage).toContain(messageType);
    }

}