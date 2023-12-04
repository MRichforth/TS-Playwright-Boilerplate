import {expect, FrameLocator, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export type TNestedFrameTypes = 'LEFT' | 'MIDDLE' | 'RIGHT' | 'BOTTOM';

export class FramesPage extends BasePage {

    readonly page: Page;
    // Nested Frames
    readonly nestedFramesButtonElement: Locator;
    readonly parentTopFrame: FrameLocator;
    // iFrame
    readonly iFrameButtonElement: Locator;
    readonly iFrameElement: FrameLocator;
    readonly inputElement: Locator;
    readonly inputTextElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Nested Frames
        this.nestedFramesButtonElement = this.page.locator('//a[contains(@href, "nested")]');
        this.parentTopFrame = this.page.frameLocator("//frame[@name='frame-top']");
        // iFrame
        this.iFrameButtonElement = this.page.locator('//a[contains(@href, "iframe")]');
        this.iFrameElement = this.page.frameLocator('//iframe');
        this.inputElement = this.iFrameElement.locator('//body');
        this.inputTextElement = this.iFrameElement.locator('//body/p');
    }

    // Nested Frames page

    @step('Clicking on "Nested Frames" button')
    async clickOnNestedFramesButton() {
        await this.nestedFramesButtonElement.waitFor({state: 'visible'});
        await this.nestedFramesButtonElement.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Validating nested frame')
    async validateNestedFrame(frame: TNestedFrameTypes) {
        // Defining main frame according to child frame type
        let mainParentFrame: FrameLocator;
        switch (frame) {
            case "BOTTOM":
                mainParentFrame = this.page.frameLocator(`//frame[contains(@name, "${frame.toLowerCase()}")]`);
                break;
            default:
                mainParentFrame = this.parentTopFrame.frameLocator(`//frame[contains(@name, "${frame.toLowerCase()}")]`);
                break;
        }

        // Validating visibility of child frame
        const childTopFrameBody = mainParentFrame.locator('//body');
        await expect(childTopFrameBody).toBeVisible();

        // Validating text of child frame
        const childTopFrameBodyText = await childTopFrameBody.textContent();
        expect(childTopFrameBodyText).toContain(frame);
    }

    // iFrame page

    @step('Clicking on "iFrame" button')
    async clickOnIFrameButton() {
        await this.iFrameButtonElement.waitFor({state: 'visible'});
        await this.iFrameButtonElement.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Filling text input')
    async fillTextInput(text: string) {
        await this.inputElement.waitFor({state: 'visible'});
        await this.inputElement.fill(text);
    }

    @step('Asserting iFrame input value')
    async assertIFrameInputValue(expectedValue: string) {
        await this.inputTextElement.waitFor({state: 'visible'});
        const actualValue = await this.inputTextElement.textContent();
        expect(actualValue).toEqual(expectedValue);
    }

}