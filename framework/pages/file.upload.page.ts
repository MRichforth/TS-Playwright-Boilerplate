import {expect, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export type TInputTypes = 'first' | 'second' | 'third'

export class FileUploadPage extends BasePage {

    readonly page: Page;
    readonly firstInputElement: Locator;
    readonly thirdInputElement: Locator;
    readonly thirdInputValueElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.firstInputElement = this.page.locator('//input[@id="file-upload"]');
        this.thirdInputElement = this.page.locator('//div[@id="drag-drop-upload"]');
        this.thirdInputValueElement = this.page.locator('//div//div[@class="dz-filename"]/span').first();
    }

    @step('Uploading file to page')
    async uploadFileByPath(inputType: TInputTypes, path: string) {
        switch (inputType) {
            case "first": {
                await this.firstInputElement.setInputFiles(path);
                break;
            }
            case "second": {
                console.log('Second input functionality cannot be implemented due to internal server error!')
                break;
            }
            case "third": {
                const fileChooserPromise = this.page.waitForEvent('filechooser');
                await this.thirdInputElement.click();
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(path);
                break;
            }
        }

    }

    @step('Verifying that file is uploaded to input')
    async checkInputValue(inputType: TInputTypes, fileName: string) {
        switch (inputType) {
            case "first": {
                const firstInputValue = await this.firstInputElement.inputValue();
                expect(firstInputValue).toContain(fileName);
                break;
            }
            case "second": {
                console.log('Second input functionality cannot be implemented due to internal server error!')
                break;
            }
            case "third": {
                const thirdInputValue = await this.thirdInputValueElement.textContent();
                expect(thirdInputValue).toContain(fileName);
            }

        }

    }
}