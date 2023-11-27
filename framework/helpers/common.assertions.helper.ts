import {expect, Page} from "@playwright/test";
import {step} from "./allure.helper";

export class CommonAssertionsHelper {

    @step('Asserting page url')
    static async assertUrl(page: Page, expectedURL: RegExp | string) {
        await expect(page).toHaveURL(expectedURL);
    }

}