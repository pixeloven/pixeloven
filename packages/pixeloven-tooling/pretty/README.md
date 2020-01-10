# @pixeloven-tooling/pretty

> Pixel Oven tooling pretty

See our website [PixelOven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @pixeloven-tooling/pretty
```

or using yarn:

```sh
yarn add --dev @pixeloven-tooling/pretty
```

## Usage
> Note this package was originally created to encapsulate common dependencies and scripts used during the development of PixelOven. For a full public CLI experience please see our website [pixeloven](https://www.pixeloven.com/).

This simple package wraps prettier for use throughout our workflow. We often use this package side by side with lint-staged to help improve our code quality.

Example of usage in `package.json`
```json
{
  "devDependencies": {
    "@pixeloven-tooling/pretty": "6.0.0",
    "lint-staged": "9.5.0"
  },
  "scripts": {
    "pretty": "yarn pretty:ts && yarn pretty:scss",
    "pretty:ts": "pixeloven-pretty ts src/**/*.{ts,tsx}",
    "pretty:scss": "pixeloven-pretty scss src/**/*.{scss}"
  },
  "lint-staged": {
    "src/**/*.{scss}": [
      "pixeloven-pretty scss",
      "git add"
    ],
    "src/**/*.{ts,tsx}": [
      "pixeloven-pretty ts",
      "git add"
    ]
  }
}
```