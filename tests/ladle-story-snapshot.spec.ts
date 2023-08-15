import { test, expect } from "@playwright/test";
// we can't create tests asynchronously, thus using the sync-fetch lib
import { fetchLadleMeta, URL } from "./ladle-helpers";

const ladleMeta = fetchLadleMeta(URL);

// iterate through stories
ladleMeta.stories.forEach((story) => {
  if (story.meta.testWithSnapshot !== true) {
    return;
  }

  // create a test for each story
  test(`${story.key} - compare snapshots`, async ({ page }) => {
    // navigate to the story
    await page.goto(`${URL}/?story=${story.key}&mode=preview`);
    // stories are code-splitted, wait for them to be loaded
    await page.waitForSelector("[data-storyloaded]");
    // take a screenshot and compare it with the baseline
    await expect(page).toHaveScreenshot(`${story.key}.png`);
  });
});
