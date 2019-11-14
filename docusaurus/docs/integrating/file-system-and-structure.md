# File System and Structure
General overview of PixelOven's file structure and recommended application structure for projects using our CLI.

## Table of Contents

- [File extensions](#file-extensions)
- [File designations](#file-designations)
- [File structure](#file-structure)
- [Application file structure](#application-file-structure)
- [Atomic design structure](#atomic-design-structure)
- [Component structure](#component-structure)

## File structure
The structure of this application should be considered living. As new requirements are needed this structure should be able to adapt to change. With that said there was a fair attempt to plan for the future. Below is a quick break down of this structure.
```
./
├── .github/
├── apps/
│   ├── examples/
│   └── pixeloven/
├── docker/
├── docs/
├── node_modules/
├── packages/
│   ├── examples/
│   ├── pixeloven/
│   ├── pixeloven-core/
│   ├── pixeloven-express/
│   ├── pixeloven-react/
│   ├── pixeloven-storybook/
│   └── pixeloven-webpack/
└── scripts/
...
```

### PixelOven Root structure
|Directory|Description|
|---|---|
|`.github`|GitHub configuration|
|`apps`|Workspace for all applications including examples.|
|`docker`|Docker setup files for custom images|
|`docs`|General documentation for PixelOven and recommended best practices for using our CLI|
|`node_modules`|I would hope this is understood ;) but this is also a transient directory used to store our general dependencies.|
|`packages`|Workspace for all packages including examples.|
|`scripts`|Scripts used to help onboarding as well as our build process.|

### PixelOven App structure
|Directory|Description|
|---|---|
|`examples`|Workspace for example applications to help with onboarding and testing.|
|`pixeloven`|Workspace for PixelOven sites and apps.|

### PixelOven Package structure
|Directory|Description|
|---|---|
|`examples`|Workspace for example packages to help with onboarding, testing and abstracting common example logic.|
|`pixeloven`|Workspace for core CLI implementation.|
|`pixeloven-core`|Workspace for core logic common to any project|
|`pixeloven-express`|Workspace express abstractions to help support server based applications including our own dev server.|
|`pixeloven-react`|Workspace react abstractions for common react development|
|`pixeloven-storybook`|Workspace for storybook CLI logic|
|`pixeloven-webpack`|Workspace for webpack CLI logic|

### File extensions
It should be noted that we use both `.ts` and `.tsx`. The general rule is any file that has ***JSX*** should use the `.tsx` extension. Everything else should be `.ts`. The `.js` and `.jsx` extensions are not supported as this is a pure TypeScript environment.

### File designations
Beyond just the above extensions we have a few other designations. First we have `.stories.tsx` which allow us to render out components in isolation. Second we have `.test.tsx` which are part of our unit testing environment. Both of these designations are matched by pattern and should be present for **all** components.

## Application files structure
This section is both documentation for our own application structure and recommended structure for derivative apps.
```
apps/pixeloven/site/
├── coverage/
├── dist/
├── node_modules/
├── src/
│   ├── client/
│   ├── server/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── views/
│   ├── shared
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   ├── pages/
│   │   │   ├── partials/
│   │   │   └── templates/
└── stats/
...
```
Starting with each application you will find the following structure.

|Directory|Description|
|---|---|
|`coverage`|This is a transient directory. It should not be relied on for adding any permanent files. All test coverage files can be found here.|
|`dist`|This is a transient directory. It should not be relied on for adding any permanent files. All production files can be found here.|
|`node_modules`|I would hope this is understood ;) but this is also a transient directory used to store our applications dependencies.|
|`src`|Alright the fun part! Contains all the source files used to build our application.|
|`stats`|Webpack bundle analysis stats|

### Source files and aliases
Our source files require a bit more in depth discussion. Our source files are meant to be built in an isomorphic style. Isomorphic or Universal JavaScript is meant to reduce the amount of repeated code and context switching but often comes at the cost of complexity. We introduced a simple file structure to help us reduce thrashing when working in this context.

|Directory|Description|
|---|---|
|`src/client`|This is the entry point for our build process for all client side code paths.|
|`src/server`|This is the entry point for our build process for all server side code paths.|
|`src/shared`|Contains all source that is universal to the two code paths.|

### Atomic design structure
Further down into our `src/shared/components` directory structure we have adopted Atomic Design philosophies for creating and managing react components. Please reference [react-atomic-design](https://github.com/danilowoz/react-atomic-design) for details on what Atomic Design is and how it is applied to react. 

> Note it is worth mentioning that we use our own customized setup but generally all the same patterns still apply.

For reference when we refer to `un-connected` or `connected` we are referring to a components to the relationship application state (redux).

#### Un-connected elements
These comments are blind to application state but all may contain logic or internal state mechanisms. As a general rule the further up the atomic structure you go the more complex both logic and state may become.

* `atoms` The smallest based elements used as building blocks for everything else. These often are very self contained units are almost purely stateless.
* `molecules` Often made up of a small collection of atoms. They generally follow a similar rule as atoms but at a slightly larger scale.
* `organisms` Like molecules to atoms these elements are made up of a collection of both. They often will contain some internal logic or state.

#### Connected elements
Though these elements are generally connected to an application state it is not a requirement. Anyone of these may rely on purely component state or even be completely static.

* `pages` Pages are made up of a collection of our atomic elements they are almost always connected to state and are highly specific.
* `partials` Partials are some what in between the two other components of this class. They are some what self contained sections that may are may not be reusable but are not application entry points. Usually a Page may consist of a few of these in the case of a modal or a popup.
* `templates` Similar to pages these elements are made up of atomic elements and are also often connected to state. However, where they differ is in them not being very specific but instead striving for a generic stance.

## Component structure
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
Logo
├── Logo.scss
├── Logo.stories.tsx
├── Logo.test.tsx
├── Logo.tsx
├── index.ts
└── README.md
```
