# PixelOven Framework
This project is a `mono-repo` designed to contain several packages that in combination make up the ***PixelOven Framework***. Below are instructions on how to contribute to this project as well as directions on how to integrate each individual package into existing projects. 

[![Build Status](https://dev.azure.com/pixeloven/PixelOven/_apis/build/status/pixeloven.pixeloven?branchName=master)](https://dev.azure.com/pixeloven/PixelOven/_build/latest?definitionId=1&branchName=master)
[![Coverage Status](https://codecov.io/gh/pixeloven/pixeloven/branch/master/graph/badge.svg)](https://codecov.io/gh/pixeloven/pixeloven)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/briangebel)

## Table of Contents

- [Statement](#statement)
- [Getting Started](#getting-started)
- [Contribution](#contribution)
- [Integration](#integration)
- [Features](#features)
- [Improvements](#improvements)
- [Our Commitment](#our-commitment)

## Statement

This project was born from a small collective effort within ***GoFundMe*** with the purpose to abstract common configuration and infrastructure used in the creation of *isomorphic* React applications.

***PixelOven*** is a development CLI that gets inspiration form amazing work done by the [create-react-app project](https://github.com/facebook/create-react-app) and other similar projects. Our goal is to build a highly extensible CLI that focuses on testability, type safety and a plugin/addon first approach.

For this project to see continued success we need your help. **Join us and start coding!** :heart:

## Getting Started
Please review the documents below and if you have questions seek us out  on Slack [#pixeloven](https://pixelovenworkspace.slack.com/messages/CJ3B566Q2).

## Contribution

> ***TBD*** Link to template directory with instructions for creating new template.

Please consider reviewing our [contribution guide](./docs/contribution.md) for details about what **PixelOven** is and how to contribute to it's development.

## Integration

> ***TBD*** Link to each package here.

We also have a [series of guides](./docs/guides/index.md) to help you get started with using PixelOven in your projects.

## Features

> ***TBD*** Add feature summary plus below might be inaccurate

## Our Commitment
We are committed to providing a safe place for everyone. Please review our [code of conduct guidelines](./docs/code-of-conduct.md) to help us with our commitment. Thank you!

## Improvements
Below are just some of the up coming ideas for improvements.
* Review this [starter](https://github.com/bitjson/typescript-starter) and [this one](https://github.com/alexjoverm/typescript-library-starter) for trending ideas.
* Should look into [tslint-immutable](https://www.npmjs.com/package/tslint-immutable)
* Add better typings for all packages but especially `docs`
* Update package readmes
* Integrate TypeDocs with story book and for this repo
* Clean up deps across all packages
* Improve [Offline](https://github.com/NekR/offline-plugin/issues/64) Support of dynamic urls
* Create generator for new package
* Create generator for new starter based on demo app.
* Docker/CI support for open browser. (don't)
* Load env for storybook too.
* handle precommit for each package https://github.com/sudo-suhas/lint-staged-multi-pkg
* https://github.com/atlassian/lerna-semantic-release
* https://code.visualstudio.com/docs/remote/containers

## Planned v6 Release
* Cleanup deps and move functions into core & add tests
* Finish documentation
* Create generator for init and make compatible with npx finish --help
* Add help to CLI and documentation

## After v6 Release
* Finish Custom commit CLI addon with linting and features to help aid mono repos
* Finish github deploy CLI addon
* Move away from React helmet and use https://www.npmjs.com/package/react-helmet-async - Also break out deps a bit better
* Unify all logging and make json logging a thing
* Remove react-dev-utils
* Reach 90-100% test coverage
* node-mocks-http replace with supertest
* Break middleware up into smaller packages
* Finish webpack for libraries setup and continue to break config in parts
* Audi deps and remove warnings.
* No longer need pixeloven app site. 
* Restructure and fix example(s) into smaller parts. Create shared packages and narrow each example to a specific focus
* Updatee testing libraries to include Cypress abstractions
* Should we switch over to eslint now that tslint will eventually be deprecated
* create custom tslint / eslint extension
* consolidate lerna's conventional-changelog-angular with the one here????

## Planned v7 Release
* Add static site generation support
* Add support for PWA
* Deprecate babel polyfill 
* Abstract out build in js scripts.
* Automate release publishing and come up with better process for release
* Fork Jarvis modify for our needs.
    + Create more robust console section
    + BundleAnalyzerPlugin display tab with custom styles
    + Reduce connection section to be more condensed 


## After v7 Release
* PixelOven site with coverage, storybook, etc all hosted with a unified theme.
* Create a unified configuration (perhaps an addon?) for the CLI
* Create a env addon for the CLI for those who wish to pull .env from a file (based on @env)
