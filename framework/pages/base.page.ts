import {expect, Locator, Page} from "@playwright/test";
import {TMainSections} from "./index";

export class BasePage {

    readonly page: Page;
    readonly titleElement: Locator;
    readonly descriptionElement: Locator;
    readonly formLinkElement: Locator;
    readonly footerTitleElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleElement = this.page.locator('//div[@class="example"]/h3 | //h1[@class="heading"]');
        this.descriptionElement = this.page.locator('(//div[@class="example"]/h3/following-sibling::p)[1] | //div[@id="content"]//h2');
        this.formLinkElement = this.page.locator('//img[contains(@src, "fork")]');
        this.footerTitleElement = this.page.locator('//div[contains(@id, "footer")]//hr/following-sibling::div');
    }

    async openPage(options: { page: "main" | string }) {
        switch (options.page) {
            case "main":
                await this.page.goto('/');
                break
            default:
                await this.page.goto(options.page);
                break
        }
        await this.page.waitForLoadState("networkidle");

    }

    async validatePage(options?: { exclude: 'title' | 'description' }) {
        await expect(this.formLinkElement).toBeVisible();
        await expect(this.footerTitleElement).toBeVisible();
        if (options) {
            if (options.exclude !== 'title') await expect(this.titleElement).toBeVisible();
            if (options.exclude !== 'description') await expect(this.descriptionElement).toBeVisible();
        } else {
            await expect(this.titleElement).toBeVisible();
            await expect(this.descriptionElement).toBeVisible();
        }
    }

    async clickOnSectionByName(sectionName: TMainSections) {
        await this.page.locator(`//a[contains(., "${sectionName}")]`).click();
        await this.page.waitForLoadState('networkidle');
    }

}