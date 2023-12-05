import {Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export class FileDownloadPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Getting download link by index')
    async getDownloadLinkByIndex(index: string) {
        return this.page.locator(`(//div[@class="example"]//a)[${index}]`);
    }

}