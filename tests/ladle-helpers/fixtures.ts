import { test as base, Page } from "@playwright/test";

export const URL = "http://localhost:61000";

interface StoryReturn {
  page: Page;
  url: string;
  name: string;
  levels: string[];
}

const test = base.extend<{
  getStory: (
    levels: string[],
    props?: { timeout?: number },
  ) => Promise<StoryReturn>;
}>({
  getStory: async ({ page }, use) => {
    await use(async (levels: string[], props = {}) => {
      // ladle name
      const name = levels
        .map((level) => level.replaceAll(" ", "-").toLowerCase())
        .join("--");

      // url of story component
      const url = `${URL}/?story=${name}&mode=preview`;

      // goto the page and wait
      await page.goto(url);
      await page.waitForSelector("[data-storyloaded]", {
        timeout: props.timeout,
      });

      return {
        url,
        page,
        name,
        levels,
      };
    });
  },
});

export default test;
