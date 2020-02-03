# Contribution
Below are instructions for contributing to this project.

## Table of Contents

- [Quick Guide](#quick-guide)
- [Getting Started](#getting-started)
- [Pull Requests](#pull-requests)

## Quick Guide

These steps will guide you through contributing to this project:

- Ensure Node >= `8.0.0` and yarn >= `1.0.0`
- Ensure [yarn](https://yarnpkg.com/docs/install/) is installed
- Clone repository and install dependencies

## Getting Started
This project uses `circleci` as our CI tool. It is highly recommended that you run our tooling locally while developing. Please review their [documentation](https://circleci.com/docs/2.0/local-cli/) on running jobs locally for more information.

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
Once confirmed requirements are met install dependencies.
```bash
$ yarn install
```

### Recommended development approach

> Note it is recommended to periodically re-install deps to ensure latest version during development.

When developing component(s) the recommended development workflow is as follows.
- Build component in isolation using StoryBook
- Write/Modify co-located unit tests for component(s).
- Integrate component into application
- Write/Modify integration tests that might utilize component(s).
- Finally spin up **docker** to verify application with back-end services.

#### Local docker development
> Note any docker cmds reference in this section are for local development only and are not connected to docker-services unless explicitly mentioned.

To start we can build our development environment.
```bash
$ docker-compose build
```
This simply builds us a container with everything we need for development. To improve performance all `node_modules` are installed in the container rather than relying on the host machines `node_modules`. This means that any time a package is installed it will be necessary to rebuild the container with the above cmd.

#### Component Development

> Note this step mostly only applies to UI elements.

First we should develop our components in isolation before integration. Services such as those that might be defined in `docker-compose.yml` other than `node-react` should **NOT** be used.
```bash
$ yarn start:story
```
Or alternatively we can use the local docker-compose setup.
```bash
$ docker-compose run node-react yarn start:story
```
This will start up our storybook environment. Once we feel our component is in a good place it is recommended to write out a few basic tests before moving into integration. 

#### Unit/Integration Testing
Once again we want to do this in isolation without any back-end services so `docker` services other than `node-react` should **NOT** be used.
```bash
$ yarn test:watch
```
Or alternatively we can use the local docker-compose setup.
```bash
$ docker-compose run node-react yarn test:watch
```
Our test runner `jest` allows us to watch our source for changes and only rerun those tests that have changed. Both of the above cmds can also run the entire suite at once by simply remove the `:watch` tag.

#### Component Integration
TBD

#### Back-service Integration
Writing tests and stories in isolation allows us to eliminate any possible interaction with vendor/third-party dependencies that could alter a tests outcome. Similarly, stories have no need for service integration since they should be pure visual units.

While developing back-end services it is recommended that we use our docker environment.
 ```bash
$ docker-compose up
```
The result of this will allow us to integrate our component(s) in a prod like environment.

## Pull Requests
Make both your branches and commits descriptive. Ensure "yarn" commands such as `yarn build` and `yarn test` work properly before submitting a pull request.
