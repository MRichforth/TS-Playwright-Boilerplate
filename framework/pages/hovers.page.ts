import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class HoversPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Asserting card info details by index')
    async assertInfoCardDetailsByIndex(index: '1' | '2' | '3') {
        // Hovering over info card
        const infoCardLocator = this.page.locator(`(//div[@class="figure"])[${index}]`);
        await infoCardLocator.waitFor({state: 'visible'});
        await infoCardLocator.hover();

        // Asserting info card name
        const infoCardNameLocator = infoCardLocator.locator('//div[@class="figcaption"]/h5');
        await infoCardNameLocator.waitFor({state: 'visible'});
        const infoCardNameValue = await infoCardNameLocator.textContent();
        expect(infoCardNameValue).toContain(`user${index}`);

        // Asserting visibility of profile link
        const infoCardLinkLocator = infoCardLocator.locator('//div[@class="figcaption"]/a');
        await expect(infoCardLinkLocator).toBeVisible();
    }

}