import { test, expect } from "@playwright/test";

test("DefaultStory test", async ({ page }) => {
  await page.goto(
    "http://localhost:61000/?mode=preview&story=demo-page--default-story",
  );
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await page.getByRole("button", { name: "Click me!" }).click();
  await expect(page.getByText("Count is currently")).toContainText(
    "Count is currently 12.",
  );
});
