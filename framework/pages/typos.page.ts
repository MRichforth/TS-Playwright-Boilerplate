import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class TyposPage extends BasePage {

    readonly page: Page;
    readonly typoTextElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.typoTextElement = this.page.locator('//div[@class="example"]/p').last();
    }

    @step('Asserting type visibility ')
    async assertTypoVisibility() {
        await this.typoTextElement.waitFor({state: 'visible'});

        const textValue = await this.typoTextElement.textContent();
        const typoWordValue = textValue?.split('.')[0].split('you ')[1];

        if (typoWordValue?.includes(",")) {
            console.log(`Type in word "won't" is displayed! Actual word is: '${typoWordValue}'`);
        } else {
            console.log(`Type in word "won't" isn't displayed! Actual word is: '${typoWordValue}'`);
        }
    }

}