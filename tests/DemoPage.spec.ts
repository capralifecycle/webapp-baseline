import { expect } from "@playwright/test";
import { test } from "./ladle-helpers";

test("DemoPage", async ({ getStory }) => {
  const { page, name } = await getStory(["Demo page", "Default story"]);
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await expect(page.getByText("Count is currently")).toHaveText(
    "Count is currently 8.",
  );
});
