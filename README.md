# 🚀 Launch.js - Simple client/entry entry plugin

[![Build Status](https://travis-ci.org/launchjs/app.svg?branch=master)](https://travis-ci.org/launchjs/entry) ![npm](https://img.shields.io/npm/dt/@launch/entry.svg?style=flat-square) ![license](https://img.shields.io/github/license/launchjs/entry.svg?style=flat-square)

Plugin for [Launch.js](https://github.com/launchjs/app) to add a client/server entrypoint.

Useful for scenarios where other plugins don't set an entrypoint.

## Usage

```ts
import App from "@launch/app";
import EntryPlugin from "@launch/entry";

void new App()
  .plugin(
    new EntryPlugin()
      .client("path/to/clientEntry.tsx")
      .server("path/to/serverEntry.tsx")
  )
  .launch()
```

## License

MIT