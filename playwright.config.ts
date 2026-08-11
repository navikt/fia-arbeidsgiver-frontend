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

// Deltakersidene som også skal testes på mobil.
const deltakerTests = [/deltaker\//, /deltakerFixture\.spec\.ts/];

// Baseline-skjermbilder lagres per arkitektur, siden amd64 og arm64 rendrer med
// subpiksel-forskjeller. E2E_ARCH settes av docker-compose.e2e.yaml (amd64 som
// standard, arm64 via `./scripts/e2e.sh --arm`).
const arch = process.env.E2E_ARCH ?? "amd64";

// Når appen allerede er bygget (f.eks. i CI der `.next` deles som artefakt fra
// build-jobben), settes E2E_SKIP_BUILD slik at webServer bare starter appen i
// stedet for å bygge den på nytt.
const skipBuild = !!process.env.E2E_SKIP_BUILD;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 2,
  workers,
  timeout: 45000,
  outputDir: ".test/spec/output",
  snapshotPathTemplate: `tests/__snapshots__/${arch}/{projectName}/{testFilePath}/{arg}{ext}`,
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
    /* Alle sider testes på desktop i alle nettlesere. */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    /* Deltakersider testes også på mobil. Vertssidene vises aldri på mobil. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: deltakerTests,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: skipBuild ? "pnpm start" : "pnpm build && pnpm start",
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
