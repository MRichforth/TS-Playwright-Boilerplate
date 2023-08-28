import {expect, test} from '@playwright/test';
import {allure} from "allure-playwright";

test.describe('TEST DESCRIBE', () => {

  test.afterEach(async() => {
    await allure.epic('EPIC');
    await allure.feature('FEATURE');
    await allure.story('STORY');
    await allure.suite('SUITE');
  });

  test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('The Internet');

  });

});
