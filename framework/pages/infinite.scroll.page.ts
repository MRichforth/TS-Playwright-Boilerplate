import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class InfiniteScrollPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Asserting visibility of footer link in view port')
    async assertVisibilityOfFooterLink() {
        await expect(this.footerTitleElement).not.toBeInViewport({timeout: 1000});
        await this.scrollPage(0, 5000, 1000);
        await expect(this.footerTitleElement).toBeInViewport();
    }

}