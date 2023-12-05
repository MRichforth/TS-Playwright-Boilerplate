import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {step} from "../helpers/allure.helper";

export type TConsoleErrorData = {
    name: string,
    message: string,
    stack: string
}

export class JavaScriptOnloadEventErrorPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    @step('Asserting that page contains expected console error')
    async assertPageConsoleError(expectedErrorMsg: TConsoleErrorData) {
        this.page.on("pageerror", (err) => {
            console.log(`\nError name: "${err.name}"\nError message: "${err.message}"\nError stack: "${err.stack}"\n`)

            expect(err.name).toEqual(expectedErrorMsg.name);
            expect(err.message).toEqual(expectedErrorMsg.message);
            expect(err.stack).toContain(expectedErrorMsg.stack);
        })
    }

}