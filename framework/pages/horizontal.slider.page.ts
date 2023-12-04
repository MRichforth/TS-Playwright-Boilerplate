import {expect, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export class HorizontalSliderPage extends BasePage {

    readonly page: Page;
    readonly descriptionElement: Locator;
    readonly horizontalSliderElement: Locator;
    readonly horizontalSliderValue: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.descriptionElement = this.page.locator('//h4[@class="subheader"]');
        this.horizontalSliderElement = this.page.locator('//input[@type="range"]');
        this.horizontalSliderValue = this.page.locator('//span[@id="range"]');
    }

    @step('Asserting horizontal slider values')
    async assertHorizontalSliderValues(...args: string[]) {
        await this.horizontalSliderElement.waitFor({state: 'visible'});
        await this.horizontalSliderValue.waitFor({state: 'visible'});
        for (const value of args) {
            console.log(`Selecting "${value}" horizontal slider value`)
            await this.horizontalSliderElement.click({position: {x: 1, y: 1}});

            let horizontalSlideValue = await this.horizontalSliderValue.textContent();
            let count = 0;
            while (horizontalSlideValue !== value && count <= 10) {
                await this.page.keyboard.press('ArrowRight');
                horizontalSlideValue = await this.horizontalSliderValue.textContent();
                console.log(`Actual Horizontal slider value: "${horizontalSlideValue}" | Expected value: "${value}" | Attempt: "${count}"`)
                count++;
            }

            expect(horizontalSlideValue).toEqual(value);
        }
    }

}