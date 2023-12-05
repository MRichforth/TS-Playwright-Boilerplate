import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class KeyPressesPage extends BasePage {

    readonly page: Page;
    readonly resultTextElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.resultTextElement = this.page.locator('//p[@id="result"]');
    }

    @step('Asserting keys recognizing')
    async assertKeyRecognizing(valuesArray: string[]) {
        for (const key of valuesArray) {
            await this.page.keyboard.press(key, {delay: 100});

            await this.resultTextElement.waitFor({state: 'visible'});
            const resultText = await this.resultTextElement.textContent();
            if (!resultText) throw new Error('"resultText" variable is undefined!');
            const formattedResultString = resultText.toLowerCase().split(': ')[1].replace(/_/g, '');

            expect(formattedResultString).toEqual(key.toLowerCase());
        }
    }

}