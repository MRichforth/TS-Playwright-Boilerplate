import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class CheckboxesPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Ticking checkbox by name')
    async tickCheckboxByName(name: string, checked: boolean) {
        const checkboxLocator = this.page.locator(`//text()[contains(., '${name}')]/preceding-sibling::input[1]`);
        await expect(checkboxLocator).toBeVisible();
        await checkboxLocator.setChecked(checked);
    }

}