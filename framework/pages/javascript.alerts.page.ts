import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TDialogTypes = 'Alert' | 'Confirm' | 'Prompt';

export class JavaScriptAlertsPage extends BasePage {

    readonly page: Page;
    readonly resultTextElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.resultTextElement = this.page.locator('//p[@id="result"]');
    }

    @step('Asserting and handling "Alert" dialog box')
    async handleAlertDialog() {
        this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('alert');

            // Verify message of alert
            expect(dialog.message()).toContain('I am a JS Alert');

            // Click on alert ok button
            await dialog.accept();
        });
    }

    @step('Asserting and handling "Confirm" dialog box')
    async handleConfirmDialog(action: 'accept' | 'decline') {
        this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');

            // verify message of alert
            expect(dialog.message()).toContain('I am a JS Confirm');

            //click on alert ok or cancel button
            switch (action) {
                case "accept":
                    await dialog.accept();
                    break;
                case "decline":
                    await dialog.dismiss();
                    break;
            }

        });
    }

    @step('Asserting and handling "Prompt" dialog box')
    async handlePromptDialog(promptValue: string) {
        this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('prompt');

            // verify message of alert
            expect(dialog.message()).toContain('I am a JS prompt');

            //click on alert ok button
            await dialog.accept(promptValue);
        });
    }

    @step('Clicking on JS dialog button')
    async clickOnDialogButton(buttonType: TDialogTypes) {
        const jsDialogButtonLocator = this.page.locator(`//button[contains(@onclick, "${buttonType}")]`);
        await jsDialogButtonLocator.waitFor({state: 'visible'});
        await jsDialogButtonLocator.click();
    }

    @step('Asserting dialog result message')
    async assertDialogResult(resultType: TDialogTypes | 'Cancel', promptMessage?: string) {
        await this.resultTextElement.waitFor({state: 'visible'});
        const resultTextValue = await this.resultTextElement.textContent();
        switch (resultType) {
            case "Alert":
                expect(resultTextValue).toEqual('You successfuly clicked an alert');
                break;
            case "Confirm":
                expect(resultTextValue).toEqual('You clicked: Ok');
                break;
            case "Prompt":
                expect(resultTextValue).toEqual(`You entered: ${promptMessage}`);
                break;
            case "Cancel":
                expect(resultTextValue).toEqual(`You clicked: Cancel`);
                break;
        }
    }

}