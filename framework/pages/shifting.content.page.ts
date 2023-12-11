/* eslint @typescript-eslint/no-explicit-any: "off" */
import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class ShiftingContentPage extends BasePage {

    readonly page: Page;
    readonly menuElement: Locator;
    readonly imageElement: Locator;
    readonly listElement: Locator;
    readonly specificShiftLinkElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.menuElement = this.page.locator('//div[@id="content"]');
        this.imageElement = this.page.locator('//div[@class="example"]');
        this.listElement = this.page.locator('//div[@class="example"]//div[@class="row"]');
        this.specificShiftLinkElement = this.page.locator('//a[contains(@href, "100")]').first();
    }

    @step('Clicking on example link by index')
    async clickOnExampleButtonByIndex(index: '1' | '2' | '3') {
        const exampleLinkLocator = this.page.locator(`//a[contains(text(), "${index}")]`);
        await exampleLinkLocator.waitFor({state: 'visible'});
        await exampleLinkLocator.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Clicking on link that shifts element')
    async clickOnShiftButton() {
        await this.specificShiftLinkElement.waitFor({state: 'visible'});
        await this.specificShiftLinkElement.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Visual comparison of the element according to the expected snapshot')
    async assertVisualComparison(locator: Locator, snapshotName: string) {
        try {
            await expect(locator).toHaveScreenshot(snapshotName, {maxDiffPixelRatio: 0});
        } catch (error: any) {
            console.log(`An error raised during visual comparison!`);
            expect(error.message).toContain('Screenshot comparison failed');
        }
    }

}