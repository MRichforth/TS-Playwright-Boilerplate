import {Page} from "@playwright/test";
import {FileDownloadPage} from "./file.download.page";

export class SecureFileDownloadPage extends FileDownloadPage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

}