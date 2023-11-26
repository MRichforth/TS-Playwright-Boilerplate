import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";
import {defaultTimeouts} from "./index";

export type TFinishElementStates = "attached" | "detached" | "visible" | "hidden"

export class DynamicLoadingPage extends BasePage {

    readonly page: Page;
    readonly examplePageDescriptionElement: Locator;
    readonly startButtonElement: Locator;
    readonly progressBarElement: Locator;
    readonly finishElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.examplePageDescriptionElement = this.page.locator('//div[@class="example"]/h4');
        this.startButtonElement = this.page.locator('//div[@id="start"]/button');
        this.progressBarElement = this.page.locator('//div[@id="loading"]');
        this.finishElement = this.page.locator('//div[@id="finish"]');
    }

    @step('Clicking on dynamic example link')
    async clickOnDynamicExampleLink(example: '1' | '2') {
        const dynamicExampleLink = this.page.locator(`//a[@href="/dynamic_loading/${example}"]`);
        await dynamicExampleLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Validating "Example" page elements')
    async validateExamplePage() {
        await this.validatePage({exclude: 'description'})
        await expect(this.examplePageDescriptionElement).toBeVisible();
        await expect(this.startButtonElement).toBeVisible();
    }

    @step('Clicking on "Start" button')
    async clickOnStartButton() {
        await this.startButtonElement.click();
    }

    @step('Clicking on "Remove" button')
    async waitUntilProgressBarDisappeared() {
        await this.progressBarElement.waitFor({state: "visible", timeout: defaultTimeouts.extra});
        await this.progressBarElement.waitFor({state: "hidden", timeout: defaultTimeouts.extra});
    }

    @step('Asserting state of "Finish" element')
    async assertStateOfFinishElement(state: TFinishElementStates) {
        await this.finishElement.waitFor({state: state});
        if (state === 'attached' || state === 'visible') {
            const finishElementText = await this.finishElement.textContent();
            expect(finishElementText).toContain('Hello World!');
        }
    }

}