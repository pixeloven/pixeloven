# Integration
Instructions for implementing framework.

## Table of Contents

- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Design Patterns](#design-patterns)
- [Adding Environment Variables](#adding-environment-variables)

## Getting Started
First simply search for `@pixeloven` at [npm](https://www.npmjs.com/search?q=%40pixeloven%2F) and install the desired packages.

Using npm:

```sh
npm install --save @pixeloven/{name}
```

or using yarn:

```sh
yarn add @pixeloven/{name}
```

### Importing libraries
All ***transpiled*** packages from this project should follow the same pattern. Compiled library files will be output to `dist/lib` while all type declarations will be output to `dist/types`.

```javascript
import {something} from '@pixeloven/{name}'
```
Import the installed package and away you go!

## Directory Structure
To use all aspects of this framework it is recommended the following directory structure be followed.
```
project
├── .circleci
├── coverage
├── dist
├── node_modules
├── public
├── src
│   ├── client
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
│   │   └── styles
```
The structure of this application should be considered living. As new requirements are needed this structure should be able to adapt to change. With that said there was a fair attempt to plan for the future. Below is a quick break down of the above structure.
* `.circleci` configuration for CI build process.
* `coverage` this is a transient directory. It should not be relied on for adding any permanent files. All test coverage files can be found here.
* `dist` this is a transient directory. It should not be relied on for adding any permanent files. All production files can be found here.
* `node_modules` I would hope this is understood ;) but this is also a transient directory used to store our applications dependencies.
* `public` all static files that can be served to the public.
* `src` alright the fun part! Contains all the source files used to build our application.

### Source files
Our source files require a bit more in depth discussion. Our source files are meant to be built in an isomorphic style. Isomorphic or Universal JavaScript is meant to reduce the amount of repeated code and context switching but often comes at the cost of complexity. We introduced a simple file structure to help us reduce thrashing when working in this context.
* `src/client` is the entry point for our build process for all client side code paths.
* `src/server` is the entry point for our build process for all server side code paths.
* `src/shared` contains all source that is universal to the two code paths.

Further down into our `shared` directory structure we have adopted Atomic Design philosophies for creating react components. Please reference [react-atomic-design](https://github.com/danilowoz/react-atomic-design) for more details.

## Design Patterns
All our **components** follow a simple structure where all aspects of a component are contained within the *Component Directory*.

```text
Avatar
├── Avatar.scss
├── Avatar.stories.tsx
├── Avatar.test.tsx
├── Avatar.tsx
├── index.ts
└── README.md
```
This structure is not a requirement to use this project but it is highly recommended. 

## Adding Environment Variables
Simply create an `.env` file at the root of this project. Then copy the contents into the newly created file as shown below.
```text
PORT=8080
HOST=localhost
PROTOCOL=http
PUBLIC_URL=/
BUILD_PATH=dist
LOG_LEVEL=debug
``` 
If you plan to run the development server in docker or a virtual machine or perhaps in a CI environment then it is recommended that the following env be used.
```text
PORT=8080
HOST=0.0.0.0
PROTOCOL=http
PUBLIC_URL=/
BUILD_PATH=dist
LOG_LEVEL=debug
 
``` 
> Note the MACHINE variable only applies while running the development server.

The following `MACHINE`s are available.
* `ci` should be used if this environment is running inside a CI environment such as circleci.
* `docker` similar to the CI value notifies the system that the server is running in a docker/virtual machine.
* `host` this is the **default** value and implies that the server is running on the host machine.
* `virtual` simply another alias for `docker`.

Currently these 

The following `LOG_LEVEL`s are available.
* `trace`
* `debug`
* `info`
* `warn`
* `error`
* `silent`
Setting a log level means that all other levels below it will be visible in the console. Setting logLevel: 'silent' will hide all console output. The module leverages [`webpack-log`](https://github.com/webpack-contrib/webpack-log#readme) for logging management, and more information can be found on its page.
