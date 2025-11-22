import { Page as PlaywrightPage, TestInfo } from "@playwright/test";
import { BasePage } from "./base.page";

export class PlanPage extends BasePage {
  constructor(page: PlaywrightPage, testInfo: TestInfo) {
    super(page, testInfo);
  }

  // Expose the underlying Playwright Page object
  getPage(): PlaywrightPage {
    return this.basePage;
  }
}
