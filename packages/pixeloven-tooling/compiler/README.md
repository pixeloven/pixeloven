# @pixeloven-tooling/linter

> Pixel Oven tooling linter

See our website [pixeloven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @pixeloven-tooling/linter
```

or using yarn:

```sh
yarn add --dev @pixeloven-tooling/linter
```

## Usage
> Note this package was originally created to encapsulate common dependencies and scripts used during the development of PixelOven. For a full public CLI experience please see our website [pixeloven](https://www.pixeloven.com/).

This simple package wraps tslint and stylelint and a few other dependencies used throughout our workflow. We are often use this package side by side with lint-staged to help improve our code quality.

Example of usage in `package.json`
```json
{
  "devDependencies": {
    "@pixeloven-tooling/linter": "6.0.0",
    "lint-staged": "9.5.0"
  },
  "scripts": {
    "lint": "yarn lint:ts && yarn lint:scss",
    "lint:ts": "pixeloven-linter ts src/**/*.{ts,tsx}",
    "lint:scss": "pixeloven-linter scss src/**/*.{scss}"
  },
  "lint-staged": {
    "src/**/*.{scss}": [
      "pixeloven-linter scss",
      "git add"
    ],
    "src/**/*.{ts,tsx}": [
      "pixeloven-linter ts",
      "git add"
    ]
  }
}
```