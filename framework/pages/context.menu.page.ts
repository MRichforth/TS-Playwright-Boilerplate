import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class ContextMenuPage extends BasePage {

    readonly page: Page;
    readonly contextMenuTriggerElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.contextMenuTriggerElement = this.page.locator('//div[@id="hot-spot"]');
    }

    @step('Asserting and handling dialog box')
    async handleDialogBox() {
        this.page.on('dialog', async dialog => {

            // Verify type of dialog
            expect(dialog.type()).toContain('alert');

            // verify message of alert
            expect(dialog.message()).toContain('You selected a context menu');

            //click on alert ok button
            await dialog.accept();
        });
    }


    @step('Right-click on "Context menu" element')
    async rightClickOnContextMenu() {
        await expect(this.contextMenuTriggerElement).toBeVisible();
        await this.contextMenuTriggerElement.click({button: 'right'});
    }

}