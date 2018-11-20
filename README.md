# PixelOven Framework
This project is a `mono-repo` designed to contain several packages that in combination make up the ***PixelOven Framework***. Below are instructions on how to contribute to this project as well as directions on how to integrate each individual package into existing projects. 

[![CircleCI](https://circleci.com/gh/pixeloven/pixeloven.svg?style=svg)](https://circleci.com/gh/pixeloven/pixeloven)

## Table of Contents

- [Requirements](#requirements)
- [Integration](#integration)
- [Contribution](#contribution)
- [Features](#features)
- [Improvements](#improvements)
- [Our Commitment](#our-commitment)

## Requirements
This project has the following requirements for development. Keep in mind that the versions provided are a recommendation while other versions may be compatible they are untested.
- Node >= `8.0.0` 
- Yarn >= `1.0.0`

## Integration

> ***TBD*** Link to each package here.

For existing projects please review our [integration guide](./integration.md) for more details.

## Contribution

> ***TBD*** Link to template directory with instructions for creating new template.

This project was born from a small collective effort within ***GoFundMe*** with the purpose to abstract common configuration and infrastructure used in the creation of *isomorphic* React applications. However, for this project to be even more successful we need your help. **Join us and start coding!** :heart:

Please consider reviewing our [contribution guide](./contribution.md) for more details.

## Features

> ***TBD*** Add feature summary plus below might be inaccurate

### Git Hooks

There is already set a `precommit` hook for formatting your code with Prettier :nail_care:

By default, there are two disabled git hooks. They're set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not going to fail in [Travis](https://travis-ci.org) (or your CI server), since it's run locally before `git push`

This makes more sense in combination with [automatic releases](#automatic-releases).

## Improvements
Below are just some of the up coming ideas for improvements.
* Review this [starter](https://github.com/bitjson/typescript-starter) and [this one](https://github.com/alexjoverm/typescript-library-starter) for trending ideas.
* Should look into [tslint-immutable](https://www.npmjs.com/package/tslint-immutable)
* Break `env` and `logger` from `core`.
* Add better typings for all packages but especially `docs`
* Add better tests
* Update package readmes
* Integrate TypeDocs with story book and for this repo
* Clean up deps across all packages
* Improve [Offline](https://github.com/NekR/offline-plugin/issues/64) Support of dynamic urls
* Create generator for new package
* Create generator for new starter based on demo app.
* Docker/CI support for open browser. (don't)
* Load env for storybook too.
* -tasks should have peerDesp for express
* -tasks add winston for logging
* handle precommit for each package https://github.com/sudo-suhas/lint-staged-multi-pkg

## Our Commitment
We are committed to providing a safe place for everyone. Please review our [code of conduct guidelines](./code-of-conduct.md) to help us with our commitment. Thank you!