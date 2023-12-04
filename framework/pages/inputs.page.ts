import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class InputsPage extends BasePage {

    readonly page: Page;
    readonly numberInputElement: Locator;
    readonly numberInputTitleElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.numberInputElement = this.page.locator('//input[@type="number"]');
        this.numberInputTitleElement = this.page.locator('//div[@class="example"]/p');
    }

    @step('Asserting input title')
    async assertInputTitle(title: string) {
        await this.numberInputTitleElement.waitFor({state: 'visible'});
        const numberInputTitle = await this.numberInputTitleElement.textContent();
        expect(numberInputTitle).toEqual(title);
    }

    @step('Filling number input')
    async fillNumberInput(value: string) {
        await this.numberInputElement.waitFor({state: 'visible'});
        await this.numberInputElement.fill(value);
    }

    @step('Asserting number input value')
    async assertNumberInputValue(value: string) {
        await this.numberInputElement.waitFor({state: 'visible'});
        const numberInputValue = await this.numberInputElement.inputValue()
        expect(numberInputValue).toEqual(value);
    }

}