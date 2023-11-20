import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    outputDir: './artifacts',
    testDir: './specs',
    fullyParallel: !!process.env.CI,
    reportSlowTests: null,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [
        ['line'],
        ['allure-playwright',
            {
                detail: false,
                outputFolder: './artifacts/allure-results'
            }
        ]
    ],
    use: {
        baseURL: 'https://the-internet.herokuapp.com',
        headless: !!process.env.CI,
        viewport: process.env.CI ? {height: 1080, width: 1920} : null,
        trace: process.env.CI ? 'retry-with-trace' : 'off',
        screenshot: process.env.CI ? 'only-on-failure' : 'off',
        video: process.env.CI ? 'retry-with-video' : 'off',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chromium'],
                launchOptions: {
                    args: ['--start-maximized']
                }
            }
        },
    ],
});
