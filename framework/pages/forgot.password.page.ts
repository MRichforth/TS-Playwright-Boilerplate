import {Locator, Page} from "@playwright/test";
import {EntryAdPage} from "./entry.ad.page";
import {step} from "../helpers/allure.helper";

export class ForgotPasswordPage extends EntryAdPage {

    readonly page: Page;
    readonly passwordInputElement: Locator;
    readonly submitButtonElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.passwordInputElement = this.page.locator('//input[@id="email"]');
        this.submitButtonElement = this.page.locator('//button[@id="form_submit"]');
    }

    @step('Filling password input field')
    async fillPasswordInput(value: string) {
        await this.submitButtonElement.waitFor({state: 'visible'});
        await this.passwordInputElement.fill(value);
    }

    @step('Clicking on "Submit" button')
    async clickOnSubmitButton() {
        await this.submitButtonElement.waitFor({state: 'visible'});
        await this.submitButtonElement.click();
    }

}