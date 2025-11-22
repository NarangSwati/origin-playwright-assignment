import { BasePage } from "./base.page";
import { PlanPage } from "./plan.page";
import { Page as PlaywrightPage, TestInfo } from "@playwright/test";

export class OriginEnergyPricingPage extends BasePage {
  private addressInput = this.basePage.getByRole("combobox", {
    name: "Your address",
  });
  private listbox = this.basePage.getByRole("listbox");
  private plans = this.basePage.getByRole("table");
  private electricityCheckBox = this.basePage.getByRole("checkbox", {
    name: "Electricity",
  });
  private gasCheckBox = this.basePage.getByRole("checkbox", {
    name: "Natural gas",
  });

  constructor(page: PlaywrightPage, testInfo: TestInfo) {
    super(page, testInfo);
  }

  public getAddressInput() {
    return this.addressInput;
  }

  public getPlanLink(planName: string) {
    return this.basePage.getByRole("link", { name: planName }).first();
  }

  public getCellWithCategory(category: string) {
    return this.plans.locator(category);
  }

  async open(url: string): Promise<void> {
    await this.goto(url);
    await this.waitForLoaded();
  }

  async enterAddress(address: string): Promise<void> {
    await this.addressInput.click;
    await this.addressInput.fill(address);
    this.listbox.getByRole("option", { name: address }).click();
    await this.plans.waitFor({ state: "visible" });
  }

  async selectElectricityCheckbox(check: boolean): Promise<void> {
    if (check) {
      if (!(await this.electricityCheckBox.isChecked())) {
        await this.electricityCheckBox.check();
      }
    } else {
      if (await this.electricityCheckBox.isChecked()) {
        await this.electricityCheckBox.uncheck();
      }
    }
  }

  async selectGasCheckbox(check: boolean): Promise<void> {
    if (check) {
      if (!(await this.gasCheckBox.isChecked())) {
        await this.gasCheckBox.check();
      }
    } else {
      if (await this.gasCheckBox.isChecked()) {
        await this.gasCheckBox.uncheck();
      }
    }
  }

  async selectPlan(planName: string): Promise<PlanPage> {
    const [newPage] = await Promise.all([
      this.basePage.waitForEvent("popup"),
      this.getPlanLink(planName).click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return new PlanPage(newPage, this.testInfo);
  }
}
