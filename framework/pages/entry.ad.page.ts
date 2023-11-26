import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TEntryModalContentType = {
    title: string,
    body: string,
    footer: string
}

export class EntryAdPage extends BasePage {

    readonly page: Page;
    readonly entryModalElement: Locator;
    readonly entryModalTitleElement: Locator;
    readonly entryModalBodyElement: Locator;
    readonly entryModalFooterElement: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.entryModalElement = this.page.locator('//div[@class="modal"]');
        this.entryModalTitleElement = this.page.locator('//div[@class="modal-title"]/h3');
        this.entryModalBodyElement = this.page.locator('//div[@class="modal-body"]/p');
        this.entryModalFooterElement = this.page.locator('//div[@class="modal-footer"]/p');
    }

    @step('Waiting until entry modal is displayed')
    async waitForEntryModalState(state: 'visible' | 'hidden') {
        await this.entryModalElement.waitFor({state: state});
    }

    @step('Validating entry modal')
    async validateEntryModal(modalContent: TEntryModalContentType) {
        // Validating entry modal title
        await expect(this.entryModalTitleElement).toBeVisible();
        const entryModalTitleText = await this.entryModalTitleElement.textContent();
        expect(entryModalTitleText).toContain(modalContent.title);

        // Validating entry modal title body
        await expect(this.entryModalBodyElement).toBeVisible();
        const entryModalBodyText = await this.entryModalBodyElement.textContent();
        expect(entryModalBodyText).toContain(modalContent.body);

        // Validating entry modal title body
        await expect(this.entryModalFooterElement).toBeVisible();
        const entryModalFooterText = await this.entryModalFooterElement.textContent();
        expect(entryModalFooterText).toContain(modalContent.footer);
    }

    @step('Closing entry ad modal')
    async closeEntryAdModal() {
        await this.entryModalFooterElement.click();
    }

}