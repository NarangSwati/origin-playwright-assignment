import {
  Page as PlaywrightPage,
  TestInfo as PlaywrightTestInfo,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export class BasePage {
  protected basePage: PlaywrightPage;
  protected testInfo: PlaywrightTestInfo;

  constructor(page: PlaywrightPage, testInformation: PlaywrightTestInfo) {
    this.basePage = page;
    this.testInfo = testInformation;
  }

  async goto(path = "/") {
    await this.basePage.goto(path);
  }

  async waitForLoaded() {
    await this.basePage.waitForLoadState("domcontentloaded");
  }

  async a11yAnalysis(pagename:string) {
    const accessibilityScanResults = await new AxeBuilder({
      page: this.basePage,
    }).analyze();
    const issues = accessibilityScanResults.violations.length;
    console.log(`ally found ${issues} issues on ${pagename}`);
    await this.testInfo.attach(`accessibility-scan-results- ${pagename}`, {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: `application/json`,
    });
  }
}
