import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class DynamicControlsPage extends BasePage {

    readonly page: Page;
    readonly titleElement: Locator;
    readonly descriptionElement: Locator;
    readonly progressBarElement: Locator;
    // Checkbox
    readonly checkboxElement: Locator;
    readonly removeButtonElement: Locator;
    readonly addButtonElement: Locator;
    // Input
    readonly inputElement: Locator;
    readonly enableButtonElement: Locator;
    readonly disableButtonElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.titleElement = this.page.locator('//h4[not(@class="subheader")]');
        this.descriptionElement = this.page.locator('//h4/following-sibling::p');
        // Checkbox
        this.checkboxElement = this.page.locator(`//text()[contains(., 'A checkbox')]/preceding-sibling::input[1]`);
        this.removeButtonElement = this.page.locator(`//button[contains(@onclick, "Checkbox")]`);
        this.addButtonElement = this.page.locator(`//button[contains(@onclick, "Checkbox")]`);
        // Input
        this.inputElement = this.page.locator('//form[@id="input-example"]/input');
        this.enableButtonElement = this.page.locator('//button[contains(@onclick, "Input")]');
        this.disableButtonElement = this.page.locator('//button[contains(@onclick, "Input")]');
        // Common
        this.progressBarElement = this.page.locator(`//div[@id="loading"]`).first();
    }

    // // // // // // // // // // // // // // // Checkbox // // // // // // // // // // // // // // // // // // // // //

    @step('Validating "Dynamic Control" page')
    async validateDynamicControlPage() {
        await expect(this.page).toHaveTitle('The Internet');
        await expect(this.titleElement).toBeVisible();
        await expect(this.descriptionElement).toBeVisible();
        await expect(this.formLinkElement).toBeVisible();
        await expect(this.footerTitleElement).toBeVisible();
    }

    @step('Verifying checkbox presence')
    async assertCheckboxVisibility(state: boolean) {
        if (state) {
            await expect(this.checkboxElement).toBeVisible();
        } else {
            await expect(this.checkboxElement).not.toBeVisible();
        }
    }

    @step('Ticking checkbox by name')
    async tickCheckbox(checked: boolean) {
        await this.checkboxElement.setChecked(checked);
    }

    @step('Clicking on "Remove" button')
    async clickOnRemoveButton() {
        await this.removeButtonElement.click();
    }

    @step('Clicking on "Add" button')
    async clickOnAddButton() {
        await this.addButtonElement.click();
    }

    // // // // // // // // // // // // // // // Input // // // // // // // // // // // // // // // // // // // // //

    @step('Verifying checkbox presence')
    async assertInputState(state: 'enabled' | 'disabled') {
        switch (state) {
            case "enabled":
                await expect(this.inputElement).toBeEnabled();
                break;
            case "disabled":
                await expect(this.inputElement).toBeDisabled();
                break;
        }
    }

    @step('Clicking on "Enable" button')
    async clickOnEnableButton() {
        await this.enableButtonElement.click();
    }

    @step('Clicking on "Disable" button')
    async clickOnDisableButton() {
        await this.enableButtonElement.click();
    }

    // // // // // // // // // // // // // // // Common // // // // // // // // // // // // // // // // // // // // //

    @step('Clicking on "Remove" button')
    async waitUntilProgressBarDisappeared() {
        await this.progressBarElement.waitFor({state: "visible", timeout: 5000});
        await this.progressBarElement.waitFor({state: "hidden", timeout: 5000});
    }

    @step('Verifying success message presence by text')
    async assertSuccessMessageByText(text: string) {
        const successMessageLocator = this.page.locator(`//p[contains(text(), "${text}")]`);
        await expect(successMessageLocator).toBeVisible();
    }

}