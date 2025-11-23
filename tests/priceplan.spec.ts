import { test, expect, Request } from "@playwright/test";
import { OriginEnergyPricingPage } from "../pages/origin.energy.pricing.page";
import { config } from "../utils/config";
import { testdata } from "../fixtures/testdata";
import { PlanPage } from "../pages/plan.page";

test.describe("Origin Pricing Plan", () => {
  let PlanPage: PlanPage;
  let OriginEnergyPricingpage: OriginEnergyPricingPage;

  test.beforeEach(async ({ page }, testInfo) => {
    await test.step("User navigates to Origin Pricing Plan page", async () => {
      OriginEnergyPricingpage = new OriginEnergyPricingPage(page, testInfo);
      await OriginEnergyPricingpage.open(config.BASE_URL);
    });

    await test.step("Verify Address Input box is visible", async () => {
      await expect(OriginEnergyPricingpage.getAddressInput()).toBeVisible();
    });
  });

  test.afterEach(async ({}) => {});

  test("Verify search for both elecricity and gas plan for the address provided and verify referral handover", async ({}) => {
    test.info().annotations.push({
      type: "TestData",
      description:
        "Address:" +
        testdata.testcase1.address +
        " Plan:" +
        testdata.testcase1.plan,
    });
    await test.step("User enters address", async () => {
      await OriginEnergyPricingpage.enterAddress(testdata.testcase1.address);
    });

    await test.step("User selects gas and electricity checkbox", async () => {
      await OriginEnergyPricingpage.selectElectricityCheckbox(true);
      await OriginEnergyPricingpage.selectGasCheckbox(true);
    });

    await test.step("Verify both Gas and Electricity plans are visible", async () => {
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Natural gas")',
        ),
      ).not.toHaveCount(0);
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Electricity")',
        ),
      ).not.toHaveCount(0);
    });

    await test.step("Verify that the required plan is visible", async () => {
      await expect(
        OriginEnergyPricingpage.getPlanLink(testdata.testcase1.plan),
      ).toBeVisible();
    });

    await test.step("Verify that the href attribute has correct external domain and source is Origin Energy for the required plan", async () => {
      await expect(
        OriginEnergyPricingpage.getPlanLink(testdata.testcase1.plan),
      ).toHaveAttribute(
        "href",
        /^https:\/\/www\.energymadeeasy\.gov\.au\/.*utm_source=Origin\+Energy.*$/,
      );
    });

    await test.step("User selects the plan, intercepts request to verify domain and opens in new tab", async () => {
      const { planPage, request } = await OriginEnergyPricingpage.selectPlan(
        testdata.testcase1.plan,
      );
      PlanPage = planPage;
      await expect(request.url()).toMatch(/energymadeeasy\.gov\.au/);
      await expect(
        OriginEnergyPricingpage.getPlanLink(testdata.testcase1.plan),
      ).toHaveAttribute("target", "_blank");
    });

    await test.step("Verify the url on the new tab has correct external domain and source is Origin Energy and is same as href of the link", async () => {
      await expect(PlanPage.getPage()).toHaveURL(
        /^https:\/\/www\.energymadeeasy\.gov\.au\/.*utm_source=Origin\+Energy.*$/,
      );
      await expect(
        OriginEnergyPricingpage.getPlanLink(testdata.testcase1.plan),
      ).toHaveAttribute("href", PlanPage.getPage().url());
    });

    await test.step("Verify that the correct plan reference is displayed on the new tab", async () => {
      await expect(
        PlanPage.getPage().getByRole("heading", {
          name: testdata.testcase1.plan,
        }),
      ).toBeVisible();
    });

    await test.step("Verify the correct logo is displayed", async () => {
      await expect(
        PlanPage.getPage().locator(
          'img[src="https://www.energymadeeasy.gov.au/static/organisations/logos/068a3484995b2d5a09c0708a68051c14.png"]',
        ),
      ).toBeVisible();
    });
  });

  test("Verify search for only elecricity plan for the address provided", async ({}) => {
    test.info().annotations.push({
      type: "TestData",
      description: "Address:" + testdata.testcase2.address + " Plan:",
    });
    await test.step("User enters address", async () => {
      await OriginEnergyPricingpage.enterAddress(testdata.testcase2.address);
    });

    await test.step("User selects only electricity checkbox", async () => {
      await OriginEnergyPricingpage.selectElectricityCheckbox(true);
      await OriginEnergyPricingpage.selectGasCheckbox(false);
    });

    await test.step("Verify only Electricity plans are visible", async () => {
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Natural gas")',
        ),
      ).toHaveCount(0);
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Electricity")',
        ),
      ).not.toHaveCount(0);
    });
  });

  test("Verify search for only gas plan for the address provided", async ({}) => {
    test.info().annotations.push({
      type: "TestData",
      description: "Address:" + testdata.testcase3.address + " Plan:",
    });
    await test.step("User enters address", async () => {
      await OriginEnergyPricingpage.enterAddress(testdata.testcase3.address);
    });

    await test.step("User selects only gas checkbox", async () => {
      await OriginEnergyPricingpage.selectElectricityCheckbox(false);
      await OriginEnergyPricingpage.selectGasCheckbox(true);
    });

    await test.step("Verify only gas plans are visible", async () => {
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Natural gas")',
        ),
      ).not.toHaveCount(0);
      await expect(
        OriginEnergyPricingpage.getCellWithCategory(
          'td:has-text("Electricity")',
        ),
      ).toHaveCount(0);
    });
  });
});
