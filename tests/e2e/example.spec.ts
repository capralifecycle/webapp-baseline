import { expect, test } from "@playwright/test";

test.describe("start page", () => {
  test("should look similar as last time", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot({
      mask: [page.getByTestId("version-info")],
    });
  });
});
