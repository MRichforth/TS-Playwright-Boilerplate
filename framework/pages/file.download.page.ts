import {Locator, Page} from "@playwright/test";
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

    @step('Downloading file by locator')
    async downloadFileByLocator(element: Locator, path: string) {
        const downloadPromise = this.page.waitForEvent('download');
        await element.click();
        const download = await downloadPromise;
        await download.saveAs(path + download.suggestedFilename());
    }

}