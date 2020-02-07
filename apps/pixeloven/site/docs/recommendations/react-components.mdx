---
id: react-components
title: React Components
---

This document is general advice for creating and working with new components.

## Table of Contents

- [Referencing source files](#referencing-source-files)
- [Supporting files](#supporting-files)
- [Connecting a component to state](#connecting-a-component-to-state)

## Referencing source files
To make referencing source files easier we have set up three simple aliases when working inside an app.

* `@client` which points to `src/client/*`
* `@server` which points to `src/server/*`
* `@shared` which points to `src/shared/*`

Example usage would be as follows:
```javascript
import { Logo } from "@shared/components/atoms/Logo";
```
Alternatively we can also create an `index.ts` file in the atoms directory and export all of our **atoms** allowing us to reference multiple at once.
```javascript
import { Logo } from "@shared/components/atoms";
```

## Supporting files
Our components may also contain other important files. For instance this framework supports the use of localized stylesheets with `Logo.scss`. It is also highly recommended that all *stories* be accompanied by a `README.md` file to help with development.

And finally we have our `index.ts`. This file should simply export our component for consumption in the general application.
```javascript
/**
 * Register components here
 */
export { default as Logo } from "./Logo";

// We may also export the connected version if present
export { default as LogoConnected } from "./Logo.connect";
```

## Connecting a component to state
If this component needs to *connect* to [redux](https://redux.js.org/) state then it will need the following file(s).
```
Logo.connect.ts
```
Here's a simple example of what this file might look like.
```javascript
const makeMapStateToProps = () => {
    const mapStateToProps = (state: State, ownProps: OwnProps) => ({

    });
    return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {

});

const LogoConnect = connect(
    makeMapStateToProps,
    mapDispatchToProps,
)(Logo);

export default LogoConnect;
```
The reason for this separation is primarily for testability but it also allows us to use a component in multiple contexts (with or without redux). The only reference to a connected component should be with in our [route config](./src/shared/routes.ts)
