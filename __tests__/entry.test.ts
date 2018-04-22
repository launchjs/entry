// 🚀 Launch.js - Entry plugin test

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import * as path from "path";

/* NPM */
import App, { Config, ILaunchConfig } from "@launch/app";
import * as getPort from "get-port";

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

async function newApp() {
  const app = new App()
    .silent()
    .production(false)
    .port(await getPort());

  return app;
}

describe("src/entry.ts", () => {
  test("should set client/server entries", async () => {
    const app = await newApp();
    const baseConfig = getBaseConfig(app);

    // Expected entries
    const clientEntry = "./__helpers__/fakeClientEntry.ts";
    const serverEntry = "./__helpers__/fakeServerEntry.ts";

    const entryPlugin = new EntryPlugin()
      .client(require.resolve(clientEntry))
      .server(require.resolve(serverEntry));

    const config = entryPlugin.initLaunchJs(baseConfig, app);

    console.log(config.client.config.entry!);

    expect(config.client.config.entry!).toMatchObject([path.resolve(__dirname, clientEntry)]);
    expect(config.server.config.entry!).toMatchObject([path.resolve(__dirname, serverEntry)]);
  });

  test("should work as a Launch.js plugin", async () => {
    const app = await newApp();

    // Expected entries
    const clientEntry = "./__helpers__/fakeClientEntry.ts";
    const serverEntry = "./__helpers__/fakeServerEntry.ts";

    const entryPlugin = new EntryPlugin()
      .client(require.resolve(clientEntry))
      .server(require.resolve(serverEntry));

    app.plugin(entryPlugin);

    const server = await app.build();

    server.close();
  });
});
