import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const isCI = !!process.env.CI;
// Kun ekte GitHub Actions setter GITHUB_ACTIONS. Den lokale Docker-kjøringen
// setter CI=1, men skal ikke bruke github-reporteren (som gir `::notice`-støy
// i loggen) – da bruker vi den lesbare "list"-reporteren.
const isGithubActions = !!process.env.GITHUB_ACTIONS;

// Antall workers styres av PLAYWRIGHT_WORKERS når den er satt (f.eks. i den
// lokale Docker-kjøringen via docker-compose.e2e.yaml). Da kan lokal kjøring
// bruke flere workers enn CI, selv om begge kjører i containeren med CI=1.
const workers = process.env.PLAYWRIGHT_WORKERS
  ? Number(process.env.PLAYWRIGHT_WORKERS)
  : isCI
    ? 2
    : 8;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 2,
  workers,
  timeout: 45000,
  outputDir: ".test/spec/output",
  snapshotPathTemplate:
    "tests/__snapshots__/{projectName}/{testFilePath}/{arg}{ext}",
  reporter: [
    [
      "html",
      {
        outputFolder: ".test/spec/results",
        open: "never",
      },
    ],
    isGithubActions ? ["github"] : ["list"],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "on",
    video: "retry-with-video",
  },
  expect: {
    timeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
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
      command: "pnpm build && pnpm start",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
    {
      command: "docker compose up",
      url: "http://localhost:2222",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
    {
      command: "pnpm mocks",
      url: "http://localhost:3100/fia-arbeidsgiver/sporreundersokelse/vert/asdf/virksomhetsnavn",
      reuseExistingServer: true,
      stderr: "pipe",
      stdout: "ignore",
    },
  ],
});
