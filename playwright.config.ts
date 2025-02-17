import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';
import {defaultTimeouts} from "./framework/pages";

dotenv.config();

export default defineConfig({
    expect: {timeout: defaultTimeouts.short},
    outputDir: './artifacts',
    testDir: './specs',
    fullyParallel: !!process.env.CI,
    reportSlowTests: null,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 1,
    snapshotDir: './framework/snapshots',
    reporter: [
        [process.env.CI ? 'github' : 'dot'],
        ['line'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['allure-playwright', { detail: false, resultsDir: 'allure-results'} ]
    ],
    use: {
        baseURL: process.env.ENV_URL ? process.env.ENV_URL: 'http://localhost-app:5000',
        headless: !!process.env.CI,
        viewport: process.env.CI ? {height: 1080, width: 1920} : null,
        trace: process.env.CI ? 'retry-with-trace' : 'on',
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
                },
                geolocation: {
                    longitude: 12.492507,
                    latitude: 41.889938
                },
                permissions: ['geolocation'],
            }
        },
    ],
});
