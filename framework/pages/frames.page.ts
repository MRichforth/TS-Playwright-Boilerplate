import {expect, FrameLocator, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export type TNestedFrameTypes = 'LEFT' | 'MIDDLE' | 'RIGHT' | 'BOTTOM';

export class FramesPage extends BasePage {

    readonly page: Page;
    // iFrame page
    readonly iFrameButtonElement: Locator;
    readonly iFrameElement: FrameLocator;
    readonly inputElement: Locator;
    readonly inputTextElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // iFrame page
        this.iFrameButtonElement = this.page.locator('//a[contains(@href, "iframe")]');
        this.iFrameElement = this.page.frameLocator('//iframe');
        this.inputElement = this.iFrameElement.locator('//body');
        this.inputTextElement = this.iFrameElement.locator('//body/p');
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