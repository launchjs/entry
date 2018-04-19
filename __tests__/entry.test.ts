// 🚀 Launch.js - Entry plugin test

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import App, { Config, ILaunchConfig } from "@launch/app";

/* Local */
import EntryPlugin from "../src/entry";

// ----------------------------------------------------------------------------

// Types
type ConfigLoader = (app: App) => Config;

const clientWebpack: ConfigLoader = require("@launch/app/dist/src/webpack/client").default;
const serverWebpack: ConfigLoader = require("@launch/app/dist/src/webpack/server").default;

function getBaseConfig(app: App): ILaunchConfig {
  return {
    client: clientWebpack(app),
    server: serverWebpack(app),
  };
}

describe("src/entry.ts", () => {
  test("should set client/server entries", () => {
    const app = new App().production(false);
    const baseConfig = getBaseConfig(app);

    // Expected entries
    const clientEntry = "__helpers__/fakeClientEntry.ts";
    const serverEntry = "__helpers__/fakeServerEntry.ts";

    const entryPlugin = new EntryPlugin()
      .client(clientEntry)
      .server(serverEntry);

    const config = entryPlugin.initLaunchJs(baseConfig, app);

    expect(config.client.config.entry!).toMatch(clientEntry);
    expect(config.server.config.entry!).toMatch(serverEntry);
  });
});
