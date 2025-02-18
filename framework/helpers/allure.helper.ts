/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */
import {test} from "@playwright/test";
import * as allure from "allure-js-commons";

export function step(name: string) {
    return function actualDecorator(originalMethod: any, _context: ClassMethodDecoratorContext) {
        async function replacementMethod(this: any, ...args: any[]): Promise<any> {
            let result = undefined;
            await test.step(name, async () => {
                if (args.length) {
                    args.forEach((arg) => {
                        allure.attachment('STEP ARGUMENT:', JSON.stringify(arg, null, 4), allure.ContentType.JSON);
                    });
                }
                result = originalMethod.call(this, ...args);
            });
            return result
        }

        return replacementMethod;
    }
}
