// 🚀 Launch.js - Entry class

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import * as fs from "fs";

/* NPM */
import App, {
  ILaunchConfig,
  ILaunchPlugin,
} from "@launch/app";

// ----------------------------------------------------------------------------

// Types
export interface IEntryConfig {
  client?: string;
  server?: string;
}

// Cache config
const cache = new WeakMap<EntryPlugin, IEntryConfig>();

export default class EntryPlugin implements ILaunchPlugin {

  // --------------------------------------------------------------------------
  /* PUBLIC METHODS */
  // --------------------------------------------------------------------------

  /* CONSTRUCTOR */
  public constructor() {
    cache.set(this, {});
  }

  /* SETTERS */

  // Set client entry point
  public client(file: string): this {
    cache.get(this)!.client = file;

    return this;
  }

  // Set server entry point
  public server(file: string): this {
    cache.get(this)!.server = file;

    return this;
  }

  /* LAUNCH.JS */
  public initLaunchJs(config: ILaunchConfig, app: App) {
    const c = cache.get(this)!;

    /* SANITY CHECKS */
    const keys: Array<keyof IEntryConfig> = ["server", "client"];

    keys.forEach(key => {

      // Check entry has been set
      if (!c[key]) {
        app.error(`Entry plugin: Missing ${key} entry file`);
      }

      // Check that the file exists
      if (!fs.existsSync(c[key]!)) {
        app.error(`Entry plugin: File for ${key} entry doesn't exist`);
      }

      // All good - merge the config
      config[key].merge({
        entry: [c[key]!],
      });
    });

    return config;
  }
}
