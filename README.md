# 🚀 Launch.js - Simple client/server entry plugin

[![Build Status](https://travis-ci.org/launchjs/entry.svg?branch=master)](https://travis-ci.org/launchjs/entry) ![npm](https://img.shields.io/npm/dt/@launch/entry.svg?style=flat-square) ![license](https://img.shields.io/github/license/launchjs/entry.svg?style=flat-square)

Plugin for [Launch.js](https://github.com/launchjs/app) to add a client/server entrypoint.

Useful for scenarios where other plugins don't set an entrypoint.

## Usage

```ts
import App from "@launch/app";
import EntryPlugin from "@launch/entry";

void new App()
  .plugin(
    new EntryPlugin()
      .client(require.resolve("./path/to/clientEntry.tsx"))
      .server(require.resolve("./path/to/serverEntry.tsx"))
  )
  .launch()
```

## Methods

### `server(file: string)`

Set the absolute path to the server entrypoint.

### `client(file: string)`

Set the absolute path to the client entrypoint.

## Setting the file path

When passing a file string to either the `.server()` or `.client()` methods, give an *absolute* path. 

The simplest way to do this is to use `require.resolve()`, which will first resolve relative to the source file that calls the method, and will return the fully qualified path on disk.

## License

MIT