---
id: working-with-libraries
title: Working with libraries
---

This document is general advice for creating new components and utilities.

## Table of Contents

- [Community definitions](#community-definitions)
- [Declaration files](#declaration-files)
- [Un-typed Libraries](#referencing-source-files)
- [Turning off type-checking](#turning-off-type-checking)

## Community definitions
Generally the TypeScript community has or will define definitions for lots of scenarios. If you are using a package or library try to first look at [DefinitelyTyped](https://definitelytyped.org/).

If that fails you can also search NPM repository for `@types/*` where `*` is the package name. As a last resort before moving to the below options is to search google. :)

## Declaration files
Declaring definitions can be necessary for when a module is un-typed or when using an external API.

> Note this is the right way to import an un-typed module or file. However, it is a tedious process and so it is recommended to first search for types from the community (shown above) or if too cumbersome do what is show below in the next sub sections.

### Custom definitions
It is possible to write types for a third party package. In these cases it is recommended to follow TypeScripts own documentation on [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

### External APIs
In this example we are working with a specific API defined by an IE browser. We created a file `dom.ie.d.ts` and placed the below contents.

```javascript
interface Element {
    msMatchesSelector(selectors: string): boolean;
}
```
For this example we can see why this is needed from this [stack overflow page](https://stackoverflow.com/questions/53040790/ts2339-property-msmatchesselector-does-not-exist-on-type-element?noredirect=1&lq=1).

## Un-typed libraries
For un-typed modules and libraries it is recommended that you attempt to come up with your own type definitions but if it is found to be too tedious or even impossible we have an option to move forward. Generally this is meant to help define custom types for an un-typed module. However, for quicker integration we often use this as a way to blanket accept a module without types.

> Note this practice should be discourage for most cases so please **Use sparingly**.

In your application locate or create a file `./src/modules.d.ts`. In this file you will want to declare a module like below.
```javascript
declare module "import-module-name";
```
Where `import-module-name` is the name used for importing the module into your source.
```javascript
import woot from "import-module-name"
```

## Turning off type-checking
Occasionally, you may need to disable type checking if you're using a feature
that is not supported by the current `@type/*` library. If that is case you can
use one of the following to disable type-checking:

> Note this practice should be discourage for most cases so please **Use sparingly**.

* `// @ts-ignore`: disables checking for the next line
* `// @ts-nocheck`: disables checking for the whole file

For information see TypeScripts documentation on [type checking](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
