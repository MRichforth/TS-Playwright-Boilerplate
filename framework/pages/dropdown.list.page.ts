import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TDropdownValues = 'Option 1' | 'Option 2';

export class DropdownListPage extends BasePage {

    readonly page: Page;
    readonly dropdownSelector: string;
    readonly selectedOption: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.dropdownSelector = '//select[@id="dropdown"]';
        this.selectedOption = this.page.locator('//option[@selected]');
    }

    @step('Selecting dropdown option by name')
    async selectOptionByValue(optionValue: TDropdownValues) {
        await this.page.selectOption(this.dropdownSelector, optionValue);
    }

    @step('Getting name of selected option')
    async getSelectedOptionText() {
        return await this.selectedOption.textContent();
    }
}