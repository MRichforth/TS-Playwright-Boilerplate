import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class ChallengingDomPage extends BasePage {

    readonly page: Page;
    readonly tableItems: {
        Lorem: string,
        Ipsum: string,
        Dolor: string,
        Sit: string,
        Amet: string,
        Diceret: string,
        Action: string[]
    };
    readonly basicButton: Locator;
    readonly alertButton: Locator;
    readonly successButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.tableItems = {
            Lorem: 'Iuvaret',
            Ipsum: 'Apeirian',
            Dolor: 'Adipisci',
            Sit: 'Definiebas',
            Amet: 'Consequuntur0',
            Diceret: 'Phaedrum',
            Action: ['edit', 'delete']
        };
        this.basicButton = this.page.locator('//a[@class="button"]');
        this.alertButton = this.page.locator('//a[@class="button alert"]');
        this.successButton = this.page.locator('//a[@class="button success"]');
    }

    @step('Validating table column titles')
    async validateColumnTitles() {
        for (const columnTitle of Object.keys(this.tableItems)) {
            const columnTitleLocator = this.page.locator(`//th[contains(., "${columnTitle}")]`);
            console.log(`Checking visibility of '${columnTitle}' column title`);
            await expect(columnTitleLocator).toBeVisible();
        }
    }

    @step('Validating table items')
    async validateColumnItems(column: 'Lorem' | 'Ipsum' | 'Dolor' | 'Sit' | 'Amet' | 'Diceret') {
        const columnItems = await this.page.locator(`//td[contains(., "${this.tableItems[column]}")]`).all();
        for (const item of columnItems) {
            console.log(`Checking visibility of '${columnItems.indexOf(item) + 1}' element in '${column}' column`);
            await expect(item).toBeVisible();
        }
    }

    @step('Validating action column items')
    async validateActionColumnItems() {
        for (const actionSubColumns of this.tableItems['Action']) {
            const actionSubColumnsLocators = await this.page.locator(`//td[contains(., "${actionSubColumns}")]`).all();
            for (const actionSubColumItems of actionSubColumnsLocators) {
                console.log(`Checking visibility of '${actionSubColumnsLocators.indexOf(actionSubColumItems) + 1}' element in '${actionSubColumns}' sub column`);
                await expect(actionSubColumItems).toBeVisible();
            }

        }
    }

    @step('Clicking on basic button')
    async clickOnBasicButton() {
        await this.basicButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Clicking on alert button')
    async clickOnAlertButton() {
        await this.alertButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    @step('Clicking on success button')
    async clickOnSuccessButton() {
        await this.successButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}