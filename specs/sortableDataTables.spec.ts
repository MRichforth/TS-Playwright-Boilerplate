import {test} from '@playwright/test';
import {allure} from "allure-playwright";
import {BasePage} from "../framework/pages/base.page";
import {SortableDataTablesPage, TTableUserTypes} from "../framework/pages/sortable.data.tables.page";

test.describe('Available Examples - Sortable Data Tables', () => {

    let basePage: BasePage;
    const tableUserData: TTableUserTypes = [{
        'Last Name': 'Bach',
        'First Name': 'Frank',
        'Email': 'fbach@yahoo.com',
        'Due': '$51.00',
        'Web Site': 'http://www.frank.com'
    }, {
        'Last Name': 'Conway',
        'First Name': 'Tim',
        'Email': 'tconway@earthlink.net',
        'Due': '$50.00',
        'Web Site': 'http://www.timconway.com'
    }, {
        'Last Name': 'Doe',
        'First Name': 'Jason',
        'Email': 'jdoe@hotmail.com',
        'Due': '$100.00',
        'Web Site': 'http://www.jdoe.com'
    }, {
        'Last Name': 'Smith',
        'First Name': 'John',
        'Email': 'jsmith@gmail.com',
        'Due': '$50.00',
        'Web Site': 'http://www.jsmith.com'
    }];
    const tableColumnKeys = Object.keys(tableUserData[0]);

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.openPage({page: "main"});
        await basePage.validatePage();
        await basePage.clickOnSectionByName('Sortable Data Tables');
    });

    test.afterEach(async () => {
        await allure.epic('The Internet');
        await allure.feature('Available Examples');
        await allure.story('Sortable Data Tables');
        await allure.suite('Sortable Data Tables scenarios');
        await allure.description("Check 'Sortable Data Tables' page functionality");
        await allure.tags('tables', 'ui');
    });

    test('Sortable Data Tables - Example 1', async ({page}) => {
        const sortableDataTablesPage = new SortableDataTablesPage(page);

        // Validating main page elements
        await sortableDataTablesPage.validatePage();

        // Asserting first table user data
        await sortableDataTablesPage.assertTableLastNames(tableUserData, '1');
        await sortableDataTablesPage.assertTableFirstNames(tableUserData, '1');
        await sortableDataTablesPage.assertTableEmails(tableUserData, '1');
        await sortableDataTablesPage.assertTableDues(tableUserData, '1');
        await sortableDataTablesPage.assertTableWebSites(tableUserData, '1');
        await sortableDataTablesPage.assertTableActions(tableUserData, '1');

        // Asserting second table columns sorting

        await sortableDataTablesPage.assertTableSorting(tableColumnKeys, '1', 'ASC');

        await sortableDataTablesPage.reloadPage();

        await sortableDataTablesPage.assertTableSorting(tableColumnKeys, '1', 'DESC');
    });

    test('Sortable Data Tables - Example 2', async ({page}) => {
        const sortableDataTablesPage = new SortableDataTablesPage(page);

        // Validating main page elements
        await sortableDataTablesPage.validatePage();

        // Asserting second table user data columns
        await sortableDataTablesPage.assertTableLastNames(tableUserData, '2');
        await sortableDataTablesPage.assertTableFirstNames(tableUserData, '2');
        await sortableDataTablesPage.assertTableEmails(tableUserData, '2');
        await sortableDataTablesPage.assertTableDues(tableUserData, '2');
        await sortableDataTablesPage.assertTableWebSites(tableUserData, '2');
        await sortableDataTablesPage.assertTableActions(tableUserData, '2');

        // Asserting second table columns sorting
        await sortableDataTablesPage.assertTableSorting(tableColumnKeys, '2', 'ASC');

        await sortableDataTablesPage.reloadPage();

        await sortableDataTablesPage.assertTableSorting(tableColumnKeys, '2', 'DESC');
    });

});
