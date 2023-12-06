import {expect, FrameLocator, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";
import {TNestedFrameTypes} from "./frames.page";

export class NestedFramesPage extends BasePage {

    readonly page: Page;
    // Nested Frames
    readonly nestedFramesButtonElement: Locator;
    readonly parentTopFrame: FrameLocator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Nested Frames
        this.nestedFramesButtonElement = this.page.locator('//a[contains(@href, "nested")]');
        this.parentTopFrame = this.page.frameLocator("//frame[@name='frame-top']");
    }

    // Nested Frames page

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

}