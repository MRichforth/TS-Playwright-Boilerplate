import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TTableUserTypes = {
    'Last Name': string,
    'First Name': string,
    'Email': string,
    'Due': string,
    'Web Site': string
}[];

export class SortableDataTablesPage extends BasePage {

    readonly page: Page;
    // Example 1
    readonly firstTableLastNameElement: Locator;
    readonly firstTableFirstNameElement: Locator;
    readonly firstTableEmailElement: Locator;
    readonly firstTableDueElement: Locator;
    readonly firstTableWebSiteElement: Locator;
    // Example 2
    readonly secondTableLastNameElement: Locator;
    readonly secondTableFirstNameElement: Locator;
    readonly secondTableEmailElement: Locator;
    readonly secondTableDueElement: Locator;
    readonly secondTableWebSiteElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Example 1
        this.firstTableLastNameElement = this.page.locator('//table[@id="table1"]//tr/td[1]');
        this.firstTableFirstNameElement = this.page.locator('//table[@id="table1"]//tr/td[2]');
        this.firstTableEmailElement = this.page.locator('//table[@id="table1"]//tr/td[3]');
        this.firstTableDueElement = this.page.locator('//table[@id="table1"]//tr/td[4]');
        this.firstTableWebSiteElement = this.page.locator('//table[@id="table1"]//tr/td[5]');
        // Example 2
        this.secondTableLastNameElement = this.page.locator('//table[@id="table2"]//td[@class="last-name"]');
        this.secondTableFirstNameElement = this.page.locator('//table[@id="table2"]//td[@class="first-name"]');
        this.secondTableEmailElement = this.page.locator('//table[@id="table2"]//td[@class="email"]');
        this.secondTableDueElement = this.page.locator('//table[@id="table2"]//td[@class="dues"]');
        this.secondTableWebSiteElement = this.page.locator('//table[@id="table2"]//td[@class="web-site"]');
    }


    @step('Asserting that last names are visible in table')
    async assertTableLastNames(userData: TTableUserTypes, table: '1' | '2') {
        // Last Name
        const lastNameLocators = table === '1' ? await this.firstTableLastNameElement.all() : await this.secondTableLastNameElement.all();
        const lastNameUsersArray = await Promise.all(lastNameLocators.map(async (lastNameLocator) => {
            await lastNameLocator.waitFor({state: 'visible'});
            return await lastNameLocator.textContent();
        }));

        userData.forEach((user) => {
            expect(lastNameUsersArray).toContain(user['Last Name']);
            console.log(`"${user['Last Name']}" is visible!`);
        });
    }

    @step('Asserting that first names are visible in table')
    async assertTableFirstNames(userData: TTableUserTypes, table: '1' | '2') {
        // First Name
        const firstNameLocators = table === '1' ? await this.firstTableFirstNameElement.all() : await this.secondTableFirstNameElement.all();
        const firstNameUsersArray = await Promise.all(firstNameLocators.map(async (firstNameLocator) => {
            await firstNameLocator.waitFor({state: 'visible'});
            return await firstNameLocator.textContent();
        }));

        userData.forEach((user) => {
            expect(firstNameUsersArray).toContain(user['First Name']);
            console.log(`"${user['First Name']}" is visible!`);
        });
    }

    @step('Asserting that emails are visible in table')
    async assertTableEmails(userData: TTableUserTypes, table: '1' | '2') {
        // Email
        const emailLocators = table === '1' ? await this.firstTableEmailElement.all() : await this.secondTableEmailElement.all();
        const emailsArray = await Promise.all(emailLocators.map(async (emailLocator) => {
            await emailLocator.waitFor({state: 'visible'});
            return emailLocator.textContent();
        }));

        userData.forEach((user) => {
            expect(emailsArray).toContain(user['Email']);
            console.log(`"${user['Email']}" is visible!`);
        });
    }

    @step('Asserting that dues are visible in table')
    async assertTableDues(userData: TTableUserTypes, table: '1' | '2') {
        // Due
        const dueLocators = table === '1' ? await this.firstTableDueElement.all() : await this.secondTableDueElement.all();
        const duesArray = await Promise.all(dueLocators.map(async (dueLocator) => {
            await dueLocator.waitFor({state: 'visible'});
            return dueLocator.textContent();
        }));

        userData.forEach((user) => {
            expect(duesArray).toContain(user['Due']);
            console.log(`"${user['Due']}" is visible!`);
        });
    }

    @step('Asserting that websites are visible in table')
    async assertTableWebSites(userData: TTableUserTypes, table: '1' | '2') {
        // Web Site
        const webSiteLocators = table === '1' ? await this.firstTableWebSiteElement.all() : await this.secondTableWebSiteElement.all();
        const webSitesArray = await Promise.all(webSiteLocators.map(async (webSiteLocator) => {
            await webSiteLocator.waitFor({state: 'visible'});
            return webSiteLocator.textContent();
        }));

        userData.forEach((user) => {
            expect(webSitesArray).toContain(user['Web Site']);
            console.log(`"${user['Web Site']}" is visible!`);
        });
    }

    @step('Asserting that actions are visible in table')
    async assertTableActions(userData: TTableUserTypes, table: '1' | '2') {
        for (const user of userData) {
            // Edit
            const editButtonLocator = this.page.locator(`//table[@id="table${table}"]//td[text()="${user['Web Site']}"]/following-sibling::td//a[@href="#edit"]`);
            await expect(editButtonLocator).toBeVisible();
            console.log(`[${user['First Name']} ${user['Last Name']}] "Edit" button is visible!`);

            // Delete
            const deleteButtonLocator = this.page.locator(`//table[@id="table${table}"]//td[text()="${user['Web Site']}"]/following-sibling::td//a[@href="#delete"]`);
            await expect(deleteButtonLocator).toBeVisible();
            console.log(`[${user['First Name']} ${user['Last Name']}] "Delete" button is visible!`);
        }
    }

    @step('Asserting table sorting')
    async assertTableSorting(columns: string[], table: '1' | '2', type: 'ASC' | 'DESC') {
        for (const column of columns) {
            // Asserting visibility of column header
            const sortingButton = this.page.locator(`//table[@id="table${table}"]//span[contains(text(), "${column}")]`);
            await sortingButton.waitFor({state: 'visible'});

            // Clicking on header according to sorting type
            if (type === 'DESC') {
                await sortingButton.click({clickCount: 2});
            } else {
                await sortingButton.click();
            }

            // Getting column actual values according to column
            const columnValuesArray = await this.getTableColumnValues(column, table);

            // Sorting column values according to sorting type and creating expected values
            const sortedColumnValuesArray = [...columnValuesArray].sort((a: string, b: string) => {
                if (a.includes("$")) {
                    return type === 'ASC' ? parseFloat(a.slice(1)) - parseFloat(b.slice(1)) : parseFloat(b.slice(1)) - parseFloat(a.slice(1));
                } else {
                    return type === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
                }
            });

            // Asserting sorting
            expect(columnValuesArray).toEqual(sortedColumnValuesArray);
        }
    }

    @step('Getting table column values')
    async getTableColumnValues(column: string, table: '1' | '2'): Promise<string[]> {
        switch (column) {
            case 'Last Name':
                return table === '1' ? await this.firstTableLastNameElement.allTextContents() : await this.secondTableLastNameElement.allTextContents();
            case 'First Name':
                return table === '1' ? await this.firstTableFirstNameElement.allTextContents() : await this.secondTableFirstNameElement.allTextContents();
            case 'Email':
                return table === '1' ? await this.firstTableEmailElement.allTextContents() : await this.secondTableEmailElement.allTextContents();
            case 'Due':
                return table === '1' ? await this.firstTableDueElement.allTextContents() : await this.secondTableDueElement.allTextContents();
            case 'Web Site':
                return table === '1' ? await this.firstTableWebSiteElement.allTextContents() : await this.secondTableWebSiteElement.allTextContents();
            default:
                return [];
        }
    }

}