import { test as base } from "@playwright/test";
import StoryPage from "./story-page";

export const URL = "http://localhost:61000";

const test = base.extend<{
  getStory: (levels: string[]) => StoryPage;
}>({
  getStory: async ({ page }, use) => {
    await use((levels: string[]) => new StoryPage(URL, levels, page));
  },
});

export default test;
