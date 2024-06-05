import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 1,
  workers: 8,
  outputDir: ".test/spec/output",
  snapshotPathTemplate:
    ".test/spec/snaps/{projectName}/{testFilePath}/{arg}{ext}",
  reporter: [
    [
      "html",
      {
        outputFolder: ".test/spec/results",
        open: "never",
      },
    ],
    isCI ? ["github"] : ["line"],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "on",
    video: "retry-with-video",
  },
  expect: {
    timeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: "bun run build && bun run start",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
    {
      command: "docker-compose up",
      url: "http://localhost:6969/azure/authorize",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
    {
      command: "bun run mocks",
      url: "http://localhost:3100/fia-arbeidsgiver/sporreundersokelse/vert/asdf/virksomhetsnavn",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
  ],
});
