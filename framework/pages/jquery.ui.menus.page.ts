import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class JQueryUIMenusPage extends BasePage {

    readonly page: Page;
    readonly descriptionElement: Locator;
    readonly enabledListItemElement: Locator;
    readonly downloadsListItemElement: Locator;
    readonly jQueryUIListItemElement: Locator;
    readonly menuButtonElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.descriptionElement = this.page.locator('//div[@class="description"]/p').first();
        this.enabledListItemElement = this.page.locator('//a[contains(text(), "Enabled")]');
        this.downloadsListItemElement = this.page.locator('//a[contains(text(), "Downloads")]');
        this.jQueryUIListItemElement = this.page.locator('//a[contains(text(), "Back")]');
        this.menuButtonElement = this.page.locator('//a[contains(text(), "Menu")]');
    }

    @step('Downloading file by specific type')
    async downloadFileByType(fileType: 'PDF' | 'CSV' | 'Excel') {
        await this.enabledListItemElement.waitFor({state: 'visible'});
        await this.enabledListItemElement.hover();

        await this.downloadsListItemElement.waitFor({state: 'visible'});
        await this.downloadsListItemElement.hover();

        const downloadButtonLocator = this.page.locator(`//a[contains(text(), "${fileType}")]`);
        await downloadButtonLocator.waitFor({state: 'visible'});

        await this.downloadFileByLocator(downloadButtonLocator, `${process.env.PWD}/artifacts/`);
    }

    @step('Clicking on "Back to JQuery UI" button')
    async clickOnJQueryUIButton() {
        await this.enabledListItemElement.waitFor({state: 'visible'});
        await this.enabledListItemElement.hover();

        await this.downloadsListItemElement.waitFor({state: 'visible'});
        await this.downloadsListItemElement.hover();

        await this.jQueryUIListItemElement.waitFor({state: 'visible'});
        await this.jQueryUIListItemElement.click();
    }

    @step('Clicking on "Menu" button')
    async clickOnMenuButton() {
        await this.menuButtonElement.waitFor({state: 'visible'});
        await this.menuButtonElement.click();
    }

}