import { defineConfig, devices } from "@playwright/test";

/**
 * CI-specific Playwright configuration with simplified setup
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 2, // Reduced for CI stability
  timeout: 30000, // Shorter timeout for CI
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
    ["github"],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  expect: {
    timeout: 10000, // Shorter for CI
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Disable other browsers in CI for faster runs
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
  ],

  webServer: [
    {
      command: "pnpm build && pnpm start",
      url: "http://localhost:3000",
      reuseExistingServer: false,
      stderr: "pipe",
      stdout: "ignore",
      timeout: 120000,
    },
    {
      command: "pnpm mocks",
      url: "http://localhost:3100/fia-arbeidsgiver/sporreundersokelse/vert/asdf/virksomhetsnavn",
      reuseExistingServer: false,
      stderr: "pipe",
      stdout: "ignore",
      timeout: 60000,
    },
  ],
});
