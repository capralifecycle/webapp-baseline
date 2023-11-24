import { test, expect } from '@playwright/test';

test.describe("start page", () =>{
  test("should look similar as last time", async({page, context}) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot({
      mask: [page.getByTestId("version-info")]
    });
  });
})

