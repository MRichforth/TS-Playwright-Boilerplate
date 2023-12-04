import {expect, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export type TFloatMenuItems = 'Home' | 'News' | 'Contact' | 'About'

export class FloatingMenuPage extends BasePage {

    readonly page: Page;
    readonly floatingMenuElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.floatingMenuElement = this.page.locator('//div[@id="menu"]');
    }

    @step('Clicking on float menu item')
    async clickOnFloatMenuItem(item: TFloatMenuItems) {
        const floatMenuItem = this.page.locator(`//div[@id="menu"]//a[text()="${item}"]`);
        await floatMenuItem.click();
    }

    @step('Scrolling page to the bottom')
    async scrollPageToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    @step('Checking visibility of paragraph by index')
    async checkVisibilityOfParagraph(position: 'first' | 'last') {
        let paragraphLocator: Locator;
        if (position === 'first') {
            paragraphLocator = this.page.locator(`//div[@class="row"]//p`).first();
        } else if (position === 'last') {
            paragraphLocator = this.page.locator(`//div[@class="row"]//p`).last();
        } else {
            throw new Error(`Unknown paragraph position: "${position}"!`);
        }
        await expect(paragraphLocator).toBeInViewport();
    }

    @step('Checking visibility of floating menu')
    async checkVisibilityOfFloatingMenu() {
        await expect(this.floatingMenuElement).toBeInViewport();
    }

}