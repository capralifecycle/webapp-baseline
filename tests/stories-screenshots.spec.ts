import { expect } from "@playwright/test";
import { test } from "./ladle-helpers";

function screenshotTest(levels: string[]) {
  const testTitle = `Story Screenshot (${levels.join(" > ")})`;

  test(testTitle, async ({ getStory }) => {
    const story = getStory(levels);
    await story.goto();
    await expect(story.page).toHaveScreenshot(`${story.name}.png`);
  });
}

screenshotTest(["Button", "Danger"]);
screenshotTest(["Button", "Default"]);
screenshotTest(["Button", "Success"]);
