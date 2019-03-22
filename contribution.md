# Contribution

Below are instructions for contributing to this project.

## Table of Contents

- [Quick Guide](#quick-guide)
- [Detailed Instructions](#detailed-instructions)
- [Pull Requests](#pull-requests)

## Quick Guide

These steps will guide you through contributing to this project:

- Fork repository
- Ensure Node >= `8.0.0` and yarn >= `1.0.0`
- Ensure [lerna](https://www.npmjs.com/package/lerna) and [yarn](https://yarnpkg.com/docs/install/) are installed
- Clone repository and install dependencies

## Detailed Instructions

This project uses `circleci` as our CI tool. It is highly recommended that you run our tooling locally while developing.

Please review their [documentation](https://circleci.com/docs/2.0/local-cli/) on running jobs locally for more information.

### Required Setup

> Note please ensure system has these minimum requirements or greater.
Check "engine" requirements:
```bash
$ node -v
$ v8.0.0
```
Please follow these official instructions to install yarn for your specific system: https://yarnpkg.com/docs/install/.
```bash
$ yarn -v
$ 1.0.0
```

### Recommended approach

> Note it is recommended to install lerna globally for this project.
```bash
$ npm install --global lerna
```

```bash
$ git clone https://github.com/YOUR-USERNAME/pixeloven
$ lerna bootstrap
```

### Optional approach

> Note this approach is not supported and may result in unexpected behavior
```bash
$ git clone https://github.com/YOUR-USERNAME/pixeloven
$ yarn install
$ yarn lerna bootstrap
```

## Testing

Before you can run unit or integration tests (or manually run packages in the example directories) you'll need to compile all packages in the project root. Once compiled you can limit future compilations within each package directory with the same command.

```bash
yarn compile
```

To run all tests

```bash
yarn test
```

To run only package tests

```bash
yarn test-packages
```

To run only example tests

```bash
yarn test-examples
```

To run only one specific package (and speed up development) you can scope them

```bash
lerna run test --scope "@pixeloven/generators"
```

To manually test integration you can use either of the example projects, but first you must symlink the packages from the project root.

```bash
yarn linker
```

From here you can run any of the `pixeloven` commands within the example projects. If you make any package changes you'll need to recompile from the package directory and relink from the main project root. To make things easier we suggest keeping three terminal tabs open, one of the main project root, one of the package root you're editing, and one of the example project root.

## Pull Requests

Keep in mind that this project is a mono-repo design. If you encounter any issue when running scripts it is recommended to run `yarn clean` at the root of this project and re run the setup above.

Make both your branches and commits descriptive. Ensure "lerna" commands such as `lerna run build` and `lerna run test` work properly before submitting a pull request.

Finally send a [GitHub Pull Request](https://github.com/pixeloven/pixeloven/compare?expand=1) with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).
