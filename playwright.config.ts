import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import fs from "fs";
import type { GitHubActionOptions } from "@estruyf/github-actions-reporter";

const envPath = `environment/.env.${process.env.NODE_ENV}`;
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} 

// Validate BASE_URL early
if (!process.env.BASE_URL) {
  throw new Error(
    "Missing BASE_URL environment variable. In CI provide it via workflow secret (e.g. QA_BASE_URL) or create environment/.env.<env> locally."
  );
}
try {
  // validate format
  // eslint-disable-next-line no-new
  new URL(process.env.BASE_URL);
} catch {
  throw new Error(`Invalid BASE_URL value: ${process.env.BASE_URL}`);
}

export default defineConfig({
  timeout: 60000,
  expect: {
    timeout: 60000, // Or a higher value
  },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 6 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["dot"],
    ["html"],
    [
      "@estruyf/github-actions-reporter",
      {
        title: "Price Plan Test Summary",
        useDetails: true,
        showError: true,
        showAnnotations: true,
        showArtifactsLink: true,
      } as GitHubActionOptions,
    ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
