import {Browser, BrowserContext} from "@playwright/test";
import {step} from "./allure.helper";

export class CommonHelper {

    @step('Setting HTTP authentication for browser')
    static async setHttpAuth(browser: Browser, credentials: { username: string, password: string }) {
        const context: BrowserContext = await browser.newContext({
            httpCredentials: {
                username: credentials.username,
                password: credentials.password,
            },
        });
        return await context.newPage();
    }

}