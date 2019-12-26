---
id: cli
title: CLI Core
---

PixelOven's core CLI provides some basic out of the box commands for creating managing your project. The usages below assuming execution with yarn but npm and other package managers should work just as well.

## Compile
Compile is a simple wrapper for standard JavaScript/TypeScript compilation. It currently acts as proxy for the TypeScript compiler.

### TypeScript
|Argument|Description|
|---|---|
|`ts`| A proxy for the TypeScript compiler with a few opinionated defaults for easier setup. |
|`tsx`| An alias for `ts`. Implemented to help differentiate JSX based projects.|

#### Options
For reference on all the available options please review the [official documentation](https://www.typescriptlang.org/docs/home.html) for TypeScript. 

> It is important to note that currently this feature expects a **tsconfig.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **tsconfig.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
    "compilerOptions": {
        "rootDir": "./src",
        "declarationDir": "./dist/types",
        "outDir": "./dist/lib",
    }
}
```

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven compile ts
```
TypeScript options can be passed through the CLI but it is highly recommended that this behavior be managed with in a **tsconfig.json** file.

## Copy
Copy is a utility that helps copy static assets from src directories into a distribution directory. This can be useful for when developing component libraries that depend on static components throughout the development life cycle.

### Assets
|Argument|Description|
|---|---|
|`ico`| Copies `.ico` files |
|`scss`| Copies `.scss` files |
|`svg`| Copies `.svg` files  |
|`assets`| Functions as an alias for combing all of the above cmds. |

Each of these cmds follows the current path down copy files into `./dist/lib` while maintaining the src pathing. This is done to ensure compatibility with compiled TypeScript into JavaScript. That way references are maintained relative to the compiled source.

#### Usage
>Note the current form of this cmd is limited on purpose. Tooling already exists for glob based copying and so this utility is meant more as a convenience.

Using this cmd is as simple as:
```bash
yarn run pixeloven copy assets
```
A common pattern where this might be used is as a post command hook after a compailation step.
```json
"scripts": {
    "compile": "pixeloven compile ts",
    "postcompile": "pixeloven copy assets"
}
```

## Delete

Delete is another utility API that is meant to aid in deleting common paths during the development cycle.  

### Common directories
|Argument|Description|
|---|---|
|`coverage`| Deletes the `./coverage` relative to the root the cmds execution. |
|`dist`| Deletes the `./dist` relative to the root the cmds execution. |
|`docs`| Deletes the `./docs` relative to the root the cmds execution. |
|`stats`| Deletes the `./stats` relative to the root the cmds execution. |
|`stories`| Deletes the `./stories` relative to the root the cmds execution. |

#### Usage
>Similar to the Copy cmd this is purposefully very limited in scope. The directories were chosen in part from our own opinions on best practices as well as limitations of the current API. 

Using this cmd is as simple as:
```bash
yarn run pixeloven delete dist
```
A common pattern where this might be used is as a post command hook after a compilation step.
```json
"scripts": {
    "compile": "pixeloven compile ts",
    "precompile": "pixeloven delete dist"
}
```

## Document
> NOTICE: This feature will be removed from the core cli and become an addon in a future update.

Document is a wrapper for type doc and is therefore dependent on TypeScript. As such it follows a similar pattern as our own [Compile](#compile) cmd.

### TypeScript
|Argument|Description|
|---|---|
|`ts`| A proxy for the TypeDoc API with a few opinionated defaults for easier setup. |
|`tsx`| An alias for `ts`. Implemented to help differentiate JSX based projects.|

#### Options
For reference on all the available options please review the [official documentation](https://typedoc.org/) for TypeDoc. 

> It is important to note that currently this feature expects both a **tsconfig.json** and **typedoc.json** file to be present at the root of the package for TypeDoc to run.

#### Usage
First be sure to create a **tsconfig.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
    "compilerOptions": {
        "rootDir": "./src",
        "declarationDir": "./dist/types",
        "outDir": "./dist/lib",
    }
}
```
Second make sure to have a configuration file for typedoc like seen below.
```json
{
    "name": "@project/name",
    "target": "es5",
    "out": "docs",
    "exclude": "*.{test}.{ts}",
    "externalPattern": "**/node_modules/**",
    "excludeExternals": true,
    "includeDeclarations": true
}
```
Finally we can run the cmd like so:
```bash
yarn run pixeloven document ts ./src
```

## Lint
The Lint API provides a proxy for TsLint as well as StyleLint for handling linting for SCSS, CSS, JavaScript and TypeScript.

### Styles
|Argument|Description|
|---|---|
|`css`| An alias for `scss`. Implemented to help differentiate CSS from SCSS.|
|`scss`| A proxy for the StyleLint linter with a few opinionated defaults for easier setup. |

#### Options
For reference on all the available options please review the [official documentation](https://stylelint.io/) for StyleLint. 

> It is important to note that currently this feature expects a **stylelint.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **stylelint.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
    "extends": "stylelint-config-recommended-scss"
}

```
PixelOven by default provides [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss) as a dependency and highly recommends using this as a starting point for all SCSS based projects.

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven lint scss
```
We can also target specific files.
```
yarn run pixeloven lint scss ./src/index.scss
```
StyleLint options can be passed through the CLI but it is highly recommended that this behavior be managed with in a **stylelint.json** file.

### TypeScript
|Argument|Description|
|---|---|
|`ts`| A proxy for the TSLint linter with a few opinionated defaults for easier setup. |
|`tsx`| An alias for `ts`. Implemented to help differentiate JSX based projects.|

#### Options
For reference on all the available options please review the [official documentation](https://palantir.github.io/tslint/) for TSLint. 

> It is important to note that currently this feature expects a **tslint.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **tslint.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:latest",
    "tslint-config-prettier",
    "tslint-eslint-rules"
  ]
}
```
PixelOven by default provides [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier) for compatibility between TSLint and Prettier as well as [tslint-eslint-rules](https://github.com/buzinas/tslint-eslint-rules) to match rules against ESLint.

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven lint ts
```
We can also target specific files.
```
yarn run pixeloven lint ts ./src/index.ts
```
TSLint options can be passed through the CLI but it is highly recommended that this behavior be managed with in a **tslint.json** file.

## Pretty
> NOTICE: Future versions will no longer wrap over a linters --fix functionality but instead focus on extending prettier alone. Leaving the auto fix functions of linters to the Lint API.

The Pretty API provides a proxy for TsLint, StyleLint and Prettier. Utilizing each linters own auto-fixing features along side prettier to help maintain code compliance. 

For reference on all the available options please review the [official documentation](https://prettier.io/) for Prettier. 

### Styles
|Argument|Description|
|---|---|
|`css`| An alias for `scss`. Implemented to help differentiate CSS from SCSS.|
|`scss`| A proxy for the StyleLint linter with a few opinionated defaults for easier setup. |

#### Options
For reference on all the available options please review the [official documentation](https://stylelint.io/) for StyleLint. 

> It is important to note that currently this feature expects a **stylelint.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **stylelint.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
    "extends": "stylelint-config-recommended-scss"
}

```
PixelOven by default provides [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss) as a dependency and highly recommends using this as a starting point for all SCSS based projects.

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven pretty scss
```
We can also target specific files.
```
yarn run pixeloven pretty ts ./src/index.scss
```
StyleLint options can be passed through the CLI but it is highly recommended that this behavior be managed with in a **stylelint.json** file.

### TypeScript
|Argument|Description|
|---|---|
|`ts`| A proxy for the TSLint linter with a few opinionated defaults for easier setup. |
|`tsx`| An alias for `ts`. Implemented to help differentiate JSX based projects.|

#### Options
For reference on all the available options please review the [official documentation](https://palantir.github.io/tslint/) for TSLint. 

> It is important to note that currently this feature expects a **tslint.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **tslint.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:latest",
    "tslint-config-prettier",
    "tslint-eslint-rules"
  ]
}
```
PixelOven by default provides [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier) for compatibility between TSLint and Prettier as well as [tslint-eslint-rules](https://github.com/buzinas/tslint-eslint-rules) to match rules against ESLint.

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven pretty ts
```
We can also target specific files.
```
yarn run pixeloven pretty ts ./src/index.ts
```
TSLint options can be passed through the CLI but it is highly recommended that this behavior be managed with in a **tslint.json** file.


## Test
> NOTICE: This feature will be removed from the core cli and become an addon in a future update.

Test is a simple wrapper for testing JavaScript applications. It currently acts as proxy for the Jest compiler and comes with a dependecies to make it more compatible with TypeScript.

### Jest

For reference on all the available configurations please review the [official documentation](https://jestjs.io/) for Jest. 

> It is important to note that currently this feature expects a **jest.json** file to be present at the root of the package to configure the compiler.

#### Usage
First be sure to create a **jest.json** file at the root of the project or in other words adjacent to the **package.json**.
```json
{
    "bail": true,
    "collectCoverageFrom": [
        "!<rootDir>/**/*.stories.{js,jsx,ts,tsx}",
        "!<rootDir>/**/*.test.{js,jsx,ts,tsx}",
        "<rootDir>/**/*.{js,jsx,ts,tsx}"
    ],
    "coverageDirectory": "<rootDir>/../coverage",
    "coverageThreshold": {
        "global": {
            "branches": 0,
            "functions": 0,
            "lines": 0,
            "statements": 0
        }
    },
    "moduleFileExtensions": [
        "js",
        "json",
        "jsx",
        "ts",
        "tsx"
    ],
    "preset": "ts-jest",
    "rootDir": "./src",
    "testEnvironment": "node",
    "testMatch": [
        "<rootDir>/**/*.test.(j|t)s?(x)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
    ],
    "verbose": true
  }
```

Once this has been confirmed all we have to do is run the following.
```bash
yarn run pixeloven test watch
```
or perhaps as part of a CI workflow:
```bash
yarn run pixeloven test --ci --coverage
```
Jest has an extensive CLI and so it is recommended to review their documentation for all the available options. Proper configuration through **jest.json** is also highly recommended.
