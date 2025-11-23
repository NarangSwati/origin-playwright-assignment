import { test } from "@playwright/test";
import { OriginEnergyPricingPage } from "../pages/origin.energy.pricing.page";
import { config } from "../utils/config";

test.describe("Origin Pricing Page accessibility test", () => {
  let OriginEnergyPricingpage: OriginEnergyPricingPage;

  test.beforeEach(async ({ page }, testInfo) => {
    await test.step("User navigates to Origin Pricing Plan page", async () => {
      OriginEnergyPricingpage = new OriginEnergyPricingPage(page, testInfo);
      await OriginEnergyPricingpage.open(config.BASE_URL);
    });
  });

  test("Verify accessibility", async ({}) => {
    await test.step("for OriginEnergyPricingpage", async () => {
      await OriginEnergyPricingpage.a11yAnalysis("OriginEnergyPricingpage");
    });
  });
});
