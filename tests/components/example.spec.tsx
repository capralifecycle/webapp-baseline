import { test, expect } from "@playwright/experimental-ct-react";
import WelcomeMessage from "../../src/components/WelcomeMessage/WelcomeMessage";
import { BrowserRouter } from "react-router-dom";

test.describe("WelcomeMessage", () => {
  test("should look similar as last time", async (body) => {
    const component = await body.mount(
      // <Link> crashes if not inside a <BrowserRouter>
      <BrowserRouter>
        <WelcomeMessage
          appName="Webapp-baseline"
          appBuildTime="2023-11-24"
          commitHash="random-commit-hash"
        />
      </BrowserRouter>,
    );

    await expect(component).toContainText("Webapp-baseline");
    await expect(component).toHaveScreenshot();
  });
});
