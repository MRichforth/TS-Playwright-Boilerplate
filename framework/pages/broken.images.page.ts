import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class BrokenImagesPage extends BasePage {

    readonly page: Page;
    readonly imageElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.imageElement = this.page.locator('//div[@class="example"]/img');
    }

    @step('Getting images count')
    async getImagesCount() {
        return await this.imageElement.count();
    }

    @step('Getting images count')
    async validateImages() {
        const allImages = this.imageElement.all();
        for (const img of await allImages) {
            const imgSrc = await img.getAttribute('src');

            expect(imgSrc?.length).toBeGreaterThan(1);

            const res = await this.page.request.get('/' + imgSrc);
            const status = res.status();
            try {
                expect(status).toBe(200);
            } catch (e) {
                console.log(`Actual status is '${status}'! Error message: '${e}'`);
            }

        }
    }

}