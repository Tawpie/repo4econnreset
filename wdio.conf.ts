import path from "path";
import { hooks } from "./src/support/hooks";

/**
 *
 * A generic conf file, capabilities defined in other conf files that
 * will include this one
 *
 * Copyright 2022 2Morrow, Inc. All rights reserved
 */

export const config = {
  runner: "local",
  specs: [
    "./src/features/IFeelLucky.feature",
    // "./src/features/checkTitle.feature",
    // "./src/features/**/*.feature",
  ],
  maxInstances: 6,
  capabilities: [
    {
      maxInstances: 6,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--disable-web-security",
          "--incognito",
          "--enable-logging",
          "--log-level=2",
        ],
      },
    },
  ],
  logLevel: "info",
  outputDir: path.join(__dirname, "/logs"),
  bail: 0,
  baseUrl: "http://google.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "cucumber",
  reporter: ["spec"],
  // port: 9515, // default for ChromeDriver
  path: "/",
  services: [
    "chromedriver",
    {
      chromeDriverArgs: ["--port=9515", "--url-base='/'"],
    },
  ],
  cucumberOpts: {
    backtrace: false,
    requireModule: [],
    failAmbiguousDefinitions: true,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    names: [],
    snippets: true,
    source: true,
    profile: [],
    require: [
      "./src/steps/given.ts",
      "./src/steps/then.ts",
      "./src/steps/when.ts",
    ],
    scenarioLevelReporter: false,
    order: "defined",
    snippetSyntax: undefined,
    strict: true,
    timeout: 90000,
  } as WebdriverIO.CucumberOpts,
  ...hooks,
};
