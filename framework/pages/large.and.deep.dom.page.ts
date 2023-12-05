import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TNoSiblingsData = {
    title: string,
    item: string
};
export type TSiblingData = {
    title: string,
    items: string[]
}
export type TTableData = {
    title: string
    items: string[]
}

export class LargeAndDeepDomPage extends BasePage {

    readonly page: Page;
    // No Siblings
    readonly noSiblingsTitleElement: Locator;
    readonly noSiblingsLocator: Locator;
    // Siblings
    readonly siblingsTitleElement: Locator;
    readonly siblingsLocators: Locator;
    // Table
    readonly tableTitleElement: Locator;
    readonly tableColumnLocators: Locator;
    readonly tableRowLocators: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // No Siblings
        this.noSiblingsTitleElement = this.page.locator('//div[@class="parent"]/preceding-sibling::h4');
        this.noSiblingsLocator = this.page.locator('//div[@id="no-siblings"]');
        // Siblings
        this.siblingsTitleElement = this.page.locator('//div[@class="parent"]/following-sibling::h4');
        this.siblingsLocators = this.page.locator('//div[contains(@id, "sibling-")]');
        // Table
        this.tableTitleElement = this.page.locator('//div[@class="parent"]/following-sibling::div//h4');
        this.tableColumnLocators = this.page.locator('//th[contains(@id, "header")]');
        this.tableRowLocators = this.page.locator('//tr[contains(@class, "row")]');
    }

    @step('Generating array of sibling expected results')
    async generateSiblingExpectedResult(from: number, to: number, decimalLimit: number) {
        const result = [];
        for (let i = from; i <= to; i++) {
            for (let j = 1; j <= decimalLimit; j++) {
                result.push(`${i}.${j}`);
            }
        }
        return result;
    }

    @step('Generating array of table expected results')
    async generateTableExpectedResult(x: number, y: number) {
        const result = [];
        for (let i = 1; i <= x; i++) {
            for (let j = 1; j <= y; j++) {
                result.push(`${i}.${j}`);
            }
        }
        return result;
    }

    @step('Asserting "No Siblings" example')
    async assertNoSiblingsExample(exampleData: TNoSiblingsData) {
        // Asserting title
        await this.noSiblingsTitleElement.waitFor({state: 'visible'});
        const noSiblingsTitle = await this.noSiblingsTitleElement.textContent();
        expect(noSiblingsTitle).toEqual(exampleData.title);

        // Asserting body
        await this.noSiblingsLocator.waitFor({state: 'visible'});
        const noSiblingsItemText = await this.noSiblingsLocator.textContent();
        expect(noSiblingsItemText).toEqual(exampleData.item);
    }

    @step('Asserting "Siblings" example')
    async assertSiblingsExample(exampleData: TSiblingData) {
        // Asserting title
        await this.siblingsTitleElement.waitFor({state: 'visible'});
        const siblingsTitle = await this.siblingsTitleElement.textContent();
        expect(siblingsTitle).toEqual(exampleData.title);

        // Asserting body (collecting array of actual values)
        const siblingsActualValues: string[] = [];
        const siblingLocators = await this.siblingsLocators.all();
        for (let i = 0; i < siblingLocators.length; i++) {
            const siblingValueLocator = siblingLocators[i];
            // At nesting level 32, "visible" argument stops working because of rendering problems, which makes it necessary to check if the element is attached to the DOM
            await siblingValueLocator.waitFor({state: 'attached'});
            let siblingValue = await siblingValueLocator.textContent();
            if (siblingValue === null) {
                console.log(`[INDEX: "${i}"] Actual sibling value is null!`)
                siblingValue = '';
            }
            siblingsActualValues.push(siblingValue);
        }

        // Each '1.1', '2.1', '3.1', etc. sibling element text contains full page text, so we need to split unnecessary text
        const formattedSiblingsActualValues = siblingsActualValues.map((item, i) => {
            const formattedActualValue = item.split('\n')[0];
            console.log(`[INDEX: "${i}"] Actual sibling value is "${formattedActualValue}"`)
            return formattedActualValue
        });

        // Asserting that each actual value is present in expected array of values
        for (const actualValue of formattedSiblingsActualValues) {
            expect(exampleData.items).toContain(actualValue);
        }
    }

    @step('Asserting "Table" example')
    async assertTableExample(exampleData: TTableData) {
        // Asserting title
        await this.tableTitleElement.waitFor({state: 'visible'});
        const tableTitle = await this.tableTitleElement.textContent();
        expect(tableTitle).toEqual(exampleData.title);

        // Asserting body (collecting array of actual values)
        const tableActualValues: string[] = [];
        const tableColumnLocators = await this.tableColumnLocators.all();
        const tableRowLocators = await this.tableRowLocators.all();
        for (let i = 1; i <= tableRowLocators.length; i++) {
            for (let j = 1; j <= tableColumnLocators.length; j++) {
                const cellValueLocator = this.page.locator(`//tr[@class="row-${i}"]/td[@class="column-${j}"]`);
                await cellValueLocator.waitFor({state: 'visible'});
                let cellValue = await cellValueLocator.textContent();
                if (cellValue === null) {
                    console.log(`[ROW: ${i} | COL: ${j}]: Actual table value is null!`);
                    cellValue = '';
                }
                console.log(`[ROW: ${i} | COL: ${j}]: Actual table value is "${cellValue}"`);
                tableActualValues.push(cellValue);
            }
        }

        // Asserting that each actual value is present in expected array of values
        for (const actualValue of tableActualValues) {
            expect(exampleData.items).toContain(actualValue);
        }
    }

}