# @pixeloven-tooling/test

> Pixel Oven tooling test

See our website [PixelOven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @pixeloven-tooling/test
```

or using yarn:

```sh
yarn add --dev @pixeloven-tooling/test
```

## Usage
> Note this package was originally created to encapsulate common dependencies and scripts used during the development of PixelOven. For a full public CLI experience please see our website [pixeloven](https://www.pixeloven.com/).

This simple package wraps jest, sinon and a few other dependencies used throughout our workflow.

Example of usage in `package.json`
```json
{
  "devDependencies": {
    "@pixeloven-tooling/test": "6.2.0"
  },
  "scripts": {
    "test": "pixeloven-test --color --coverage",
    "test:ci": "pixeloven-test --ci --coverage",
    "test:watch": "pixeloven-test --watch"
  }
}
```