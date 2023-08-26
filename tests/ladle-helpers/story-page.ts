import { Page } from "@playwright/test";

export default class StoryPage {
  private readonly url: string;
  public readonly page: Page;
  public readonly name: string;
  public readonly levels: string[];

  constructor(baseUrl: string, levels: string[], page: Page) {
    this.name = levels
      .map((level) => level.replaceAll(" ", "-").toLowerCase())
      .join("--");

    this.url = `${baseUrl}/?story=${this.name}&mode=preview`;
    this.page = page;
    this.levels = levels;
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForSelector("[data-storyloaded]");
  }
}
