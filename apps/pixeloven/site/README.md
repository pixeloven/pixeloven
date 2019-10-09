# PixelOven Example
This library is meant to show case advanced React/JavaScript development for highly scalable applications.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Design Patterns](#design-patterns)
- [Referencing Source Files](referencing-source-files)
- [References](#references)
- [Deployment](#deployment)
- [Server Configuration](#server-configuration)

## Features

 - Zero-setup. After running `yarn install` things will setup for you :wink:
 - Tests, coverage and interactive watch mode using **[Jest](http://facebook.github.io/jest/)**
 - **[Prettier](https://github.com/prettier/prettier)**, **[TSLint](https://palantir.github.io/tslint/)** and **[StyleLint](https://github.com/stylelint/stylelint)** for code formatting and consistency
 - **[Husky](https://github.com/typicode/husky)** (git hooks) for automatic linting on pre-commit.

## Requirements
This package has the following requirements for development. Keep in mind that the versions provided are a recommendation and it is possible to work with other versions though not recommended.
- Node >= v8
- Yarn >= 1.9.2

## Getting Started

Please consider reviewing our [contribution guide](./contribution.md) for details on how to get started. Any information regarding development, testing and/or integration can be found there.

## Directory Structure
```
root
├── .cache
├── .circleci
├── dist
├── coverage
├── node_modules
├── public
├── src
│   ├── client
│   │   └── serviceWorkers
│   ├── server
│   │   ├── controllers
│   │   ├── middleware
│   │   └── views
│   ├── shared
│   │   ├── components
│   │   │   ├── atoms
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   ├── pages
│   │   │   └── templates
│   │   ├── store
│   │   ├── styles
│   │   └── utils
```
The structure of this application should be considered living. As new requirements are needed this structure should be able to adapt to change. With that said there was a fair attempt to plan for the future. Below is a quick break down of the above structure.
* `.cache` this is a transient directory used to cache package information.
* `.circleci` configuration for CI build process.
* `dist` this is a transient directory. It should not be relied on for adding any permanent files. All production files can be found here.
* `coverage` this is a transient directory. It should not be relied on for adding any permanent files. All test coverage files can be found here.
* `node_modules` I would hope this is understood ;) but this is also a transient directory used to store our applications dependencies.
* `public` all static files that can be served to the public during development.
* `src` alright the fun part! Contains all the source files used to build our application.

### Source files
Our source files require a bit more in depth discussion. Our source files are meant to be built in an isomorphic style. Isomorphic or Universal JavaScript is meant to reduce the amount of repeated code and context switching but often comes at the cost of complexity. We introduced a simple file structure to help us reduce thrashing when working in this context.
* `src/client` is the entry point for our build process for all client side code paths.
* `src/server` is the entry point for our build process for all server side code paths.
* `src/shared` contains all source that is universal to the two code paths.

Further down into our `shared/components` directory structure we have adopted Atomic Design philosophies for creating react components. Please reference [react-atomic-design](https://github.com/danilowoz/react-atomic-design) for more details.

## Design Patterns
When creating any new components we should follow the below pattern. In this example we will assume that we are creating a small `atomic` component. However, it should be noted that these same patterns should apply regardless of scope.

First we must decide where our component should live. 
```
...
components
└── atoms
```
Once this decision has been made we will want to created our component directory. In this directory we should define all our independent pieces such that the name of the component comes first followed by what it is used for.
```
...
Example
├── Example.scss
├── Example.stories.tsx
├── Example.test.tsx
├── Example.tsx
├── index.ts
└── README.md
```

### File extensions
It should be noted that we use both `.ts` and `.tsx`. The general rule is any file that has ***JSX*** should use the `.tsx` extension. Everything else should be `.ts`. The `.js` and `.jsx` extensions are not supported as this is a pure TypeScript environment.

### File designations
Beyond just the above extensions we have a few other designations. First we have `.stories.tsx` which allow us to render out components in isolation. Second we have `.test.tsx` which are part of our unit testing environment. Both of these designations are matched by pattern and should be present for **all** components.

#### Adding redux to a component
If this component needed to *connect* to [redux](https://redux.js.org/) then it might also have the following file(s).
```
Example.connect.ts
```
The reason for this separation is primarily for testability but it also allows us to use a component in multiple contexts (with or without redux).

#### Other files
Our components may also contain other important files. For instance this framework supports the use of localized stylesheets with `Avatar.scss`. It is also highly recommended that all *stories* be accompanied by a `README.md` file to help with development.

And finally we have our `index.ts`. This file should simply export our component for consumption in the general application.
```javascript
/**
 * Register components here
 */
export { default as Example } from "./Example";

// We may also export the connected version if present
export { default as ExampleConnected } from "./Example.connect";
```

## Referencing Source Files
To make referencing source files easier we have set up three simple aliases.

* `@client` which points to `src/client/*`
* `@server` which points to `src/server/*`
* `@shared` which points to `src/shared/*`

Example usage would be as follows:
```javascript
import { Avatar } from "@shared/components/atoms/Avatar";
```
Alternatively we can also create an `index.ts` file in the atoms directory and export all of our **atoms** allowing us to reference multiple at once.
```javascript
import { Avatar, Button, Logo } from "@shared/components/atoms";
```

## References
1) https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
2) https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
3) https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
4) https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87
