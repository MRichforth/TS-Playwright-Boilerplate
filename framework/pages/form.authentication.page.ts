import {expect, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export class FormAuthenticationPage extends BasePage {

    readonly page: Page;
    readonly titleElement: Locator;
    readonly descriptionElement: Locator;
    readonly usernameInputElement: Locator;
    readonly passwordInputElement: Locator;
    readonly loginButtonElement: Locator;
    readonly notificationMessageElement: Locator;
    readonly logoutButtonElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.titleElement = this.page.locator('//div[@id="content"]//h2');
        this.descriptionElement = this.page.locator('//h4[@class="subheader"]');
        this.usernameInputElement = this.page.locator('//input[@id="username"]');
        this.passwordInputElement = this.page.locator('//input[@id="password"]');
        this.loginButtonElement = this.page.locator('//button[@type="submit"]');
        this.notificationMessageElement = this.page.locator('//div[@id="flash"]');
        this.logoutButtonElement = this.page.locator('//a[contains(@href, "logout")]');
    }

    @step('Filling "Username" field')
    async fillUsernameField(value: string) {
        await this.usernameInputElement.waitFor({state: 'visible'});
        await this.usernameInputElement.fill(value);
    }

    @step('Filling "Password" field')
    async fillPasswordField(value: string) {
        await this.passwordInputElement.waitFor({state: 'visible'});
        await this.passwordInputElement.fill(value);
    }

    @step('Clicking on "Login" button')
    async clickOnLoginButton() {
        await this.loginButtonElement.waitFor({state: 'visible'});
        await this.loginButtonElement.click();
        await this.page.waitForLoadState('networkidle');
    }

    // Successful page

    @step('Checking visibility of notification bar')
    async checkVisibilityOfNotificationBar() {
        await expect(this.notificationMessageElement).toBeVisible();
    }

    @step('Asserting text of notification message')
    async checkNotificationText(expectedText: string) {
        const notificationMessage = await this.notificationMessageElement.textContent();
        expect(notificationMessage).toContain(expectedText);
    }

    @step('Clicking on "Logout" button')
    async clickOnLogoutButton() {
        await this.logoutButtonElement.waitFor({state: 'visible'});
        await this.logoutButtonElement.click();
        await this.page.waitForLoadState('networkidle');
    }

}