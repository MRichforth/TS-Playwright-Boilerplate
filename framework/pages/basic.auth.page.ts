import {Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class BasicAuthPage extends BasePage {

    readonly page: Page;
    readonly descriptionText: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.descriptionText = 'Congratulations! You must have the proper credentials.';
    }

}