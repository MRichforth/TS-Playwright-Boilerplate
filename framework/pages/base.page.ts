import {expect, Locator, Page} from "@playwright/test";
import {TMainSections} from "./index";
import {step} from "../helpers/allure.helper";
import * as fs from "fs";
import {constants} from "fs";

export type TLoadStateTypes = "load" | "domcontentloaded" | "networkidle";

export class BasePage {

    readonly page: Page;
    readonly titleElement: Locator;
    readonly descriptionElement: Locator;
    readonly formLinkElement: Locator;
    readonly footerTitleElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleElement = this.page.locator('//div/h3 | //h1[@class="heading"]').first();
        this.descriptionElement = this.page.locator('(//div[@class="example"]/h3/following-sibling::p)[1] | //div[@id="content"]//h2');
        this.formLinkElement = this.page.locator('//img[contains(@src, "fork")]');
        this.footerTitleElement = this.page.locator('//div[contains(@id, "footer")]//hr/following-sibling::div');
    }

    @step('Opening page')
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

    @step('Validating page')
    async validatePage(options?: { exclude: 'title' | 'description' }) {
        await expect(this.page).toHaveTitle('The Internet');

        await expect(this.formLinkElement).toBeVisible();
        await expect(this.footerTitleElement).toBeVisible();
        if (options) {
            switch (options.exclude) {
                case 'title':
                    await expect(this.descriptionElement).toBeVisible();
                    break;
                case "description":
                    await expect(this.titleElement).toBeVisible();
                    break;
            }
        } else {
            await expect(this.titleElement).toBeVisible();
            await expect(this.descriptionElement).toBeVisible();
        }
    }

    @step('Clicking on section by name')
    async clickOnSectionByName(sectionName: TMainSections, state: TLoadStateTypes = "networkidle") {
        await this.page.locator(`//a[contains(., "${sectionName}")]`).first().click();
        await this.page.waitForLoadState(state);
    }

    @step('Dragging first element on place of second element')
    async dragTo(firstLocator: Locator, secondLocator: Locator) {
        await firstLocator.dragTo(secondLocator);
    }

    @step('Waiting specific time')
    async waitSpecificTime(timeout: number) {
        await (async () => new Promise((res) => setTimeout(res, timeout)))();
    }

    @step('Scrolling page down')
    async scrollPage(deltaX: number, deltaY: number, timeout?: number) {
        if (timeout) {
            await this.waitSpecificTime(timeout);
        }
        await this.page.mouse.wheel(deltaX, deltaY);
    }

    @step('Asserting if file exists by provided path')
    async assertIfFileExists(path: string) {
        fs.access(path, constants.F_OK, (err: Error | null) => {
            console.log(`${path} ${err ? 'does not exist' : 'exists'}`);
            expect(err).toBeNull();
        });
    }

    @step('Downloading file by locator')
    async downloadFileByLocator(downloadLink: Locator, path: string) {
        const downloadPromise = this.page.waitForEvent('download');

        await downloadLink.waitFor({state: 'visible'});
        await downloadLink.click();

        const download = await downloadPromise;
        const downloadPath = path + download.suggestedFilename();
        await download.saveAs(downloadPath);

        await this.assertIfFileExists(downloadPath);
    }

    @step('Waiting until page loaded')
    async waitUntilPageLoaded(state: TLoadStateTypes) {
        await this.page.waitForLoadState(state);
    }

    @step('Reloading page')
    async reloadPage(waitUntil: TLoadStateTypes = 'networkidle') {
        await this.page.reload({waitUntil: waitUntil});
    }

    @step('Opening provided link in a new browser tab')
    async openLinkInNewTab(link: Locator) {
        const pageContext = this.page.context();
        const pagePromise = pageContext.waitForEvent('page');

        await link.waitFor({state: 'visible'});
        await link.click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState('networkidle');

        return newPage;
    }

    @step('Switching to the browser tab')
    async switchToTab(tabIndex: number) {
        const pages = this.page.context().pages();

        if (tabIndex >= 0 && tabIndex < pages.length) {
            await pages[tabIndex].bringToFront();
        } else {
            throw new Error(`Invalid tab index: "${tabIndex}"`);
        }

    }

}