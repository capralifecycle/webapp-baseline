import { expect } from "@playwright/test";
import { test } from "./ladle-helpers";

// Function to automatically load a story and test it with screenshot path
function screenshotTest(levels: string[]) {
  // Create test title
  const testTitle = `Story Screenshot (${levels.join(" > ")})`;

  // run a playwright test with getStory fixture
  test(testTitle, async ({ getStory }) => {
    const { page, name } = await getStory(levels, { timeout: 500 });
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
    });
  });
}

test.describe("Screenshot match stories", () => {
  screenshotTest(["Button", "Danger"]);
  screenshotTest(["Button", "Default"]);
  screenshotTest(["Button", "Success"]);
});
