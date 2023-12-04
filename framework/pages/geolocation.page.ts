import {expect, Locator, Page} from "@playwright/test";
import {step} from "../helpers/allure.helper";
import {BasePage} from "./base.page";

export class GeolocationPage extends BasePage {

    readonly page: Page;
    readonly geolocationButtonElement: Locator;
    readonly latitudeElement: Locator;
    readonly longitudeElement: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.geolocationButtonElement = this.page.locator('//button[contains(@onclick, "Location")]');
        this.latitudeElement = this.page.locator('//div[@id="lat-value"]');
        this.longitudeElement = this.page.locator('//div[@id="long-value"]');
    }

    @step('Clicking on "Where am I?" button')
    async clickOnGeolocationButton() {
        await this.geolocationButtonElement.waitFor({state: "visible"});
        await this.geolocationButtonElement.click();
    }

    @step('Asserting latitude value')
    async assertLatitudeValue(value: string) {
        await this.latitudeElement.waitFor({state: 'visible'});
        const latitudeValue = await this.latitudeElement.textContent();
        expect(latitudeValue).toEqual(value);
    }

    @step('Asserting longitude value')
    async assertLongitudeValue(value: string) {
        await this.longitudeElement.waitFor({state: 'visible'});
        const latitudeValue = await this.longitudeElement.textContent();
        expect(latitudeValue).toEqual(value);
    }

}