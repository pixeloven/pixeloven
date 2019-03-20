# @pixeloven/tasks

> Pixel Oven tasks

See our website [pixeloven-tasks](https://github.com/pixeloven/pixeloven) for more information or the [issues](https://github.com/pixeloven/pixeloven) associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @pixeloven/tasks
```

or using yarn:

```sh
yarn add --dev @pixeloven/tasks
```

## Usage
> Note this package was originally created to encapsulate common dependecies and scripts used during the development of PixelOven. For a full public CLI experience please see [@pixeloven/cli](https://www.npmjs.com/package/@pixeloven/cli).

When making a libraries similar to the ones seen in [PixelOven](https://github.com/pixeloven/pixeloven) we can use this simple wrapper for common tasks like linting, compiling and testing. 

Example of usage in `package.json`
```json
  "scripts": {
    "prepublishOnly": "yarn lint && yarn test && yarn compile",
    "clean": "pixeloven-tasks clean",
    "compile": "pixeloven-tasks compile:ts",
    "precompile": "pixeloven-tasks compile:clean",
    "document": "pixeloven-tasks document:ts src",
    "predocument": "pixeloven-tasks document:clean",
    "lint": "yarn lint:ts",
    "lint:ts": "pixeloven-tasks lint:ts src/**/*.{ts,tsx}",
    "pretest": "pixeloven-tasks test:clean",
    "pretty": "pixeloven-tasks pretty src/**/*.{ts,tsx}",
    "pretty:ts": "pixeloven-tasks pretty:ts src/**/*.{ts,tsx}",
    "test": "pixeloven-tasks test --color --coverage",
    "test:watch": "pixeloven-tasks test:watch"
  }
```