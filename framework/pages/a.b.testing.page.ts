import {Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export class ABTestingPage extends BasePage {

    readonly page: Page;
    readonly descriptionText: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.descriptionText = 'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn from different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).';
    }

    @step('Validating A/B page title')
    async validateABTitle() {
        const abTestingTitle = await this.titleElement.textContent();
        switch (abTestingTitle) {
            case 'A/B Test Control':
                console.log('"A" variant is selected successfully!');
                break;
            case 'A/B Test Variation 1':
                console.log('"B" variant is selected successfully!');
                break;
            case 'No A/B Test':
                console.log('No A/B selection detected! Docker image issue detected!');
                break;
            default:
                throw new Error(`Unexpected AB title is displayed: "${abTestingTitle}"!`);
        }
    }

}