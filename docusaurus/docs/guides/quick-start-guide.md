# Quick Start Guide
Below are instructions for getting started on development with PixelOven and our local environment. Included are some docker abstractions to help reduce env based issues.

## Table of Contents

- [Legend](#legend)
- [Required setup](#getting-started)
- [Setting up local env](#setting-up-local-env)
- [Docker services setup](#docker-services-setup)

## Legend
The following values are used frequently through our guides. Below are some specifications for what these terms and their alternative forms represent.

| Term | Description |
| --- | ----------- |
| `local` | This term represents you local machine.
| `docker` | Used to represent the docker setup with in this project. 

## Required setup
Of course the first step should be to clone this project :)
```
git clone git@github.com:pixeloven/pixeloven.git
```
Then, we want to make sure our setup is ready and has the latest tooling required to run PixelOven. Please run the following script.
```
./scripts/setup.sh requirements docker
```
This script will check to make sure node is installed and at the correct version. Update or install any package management tooling that is required and attempt to pull down docker images for development.

## Setting up local env
> Note the following steps assume all cmds are run within `pixeloven`. 

We should install dependencies locally, compile our packages, build applications/examples and sym-link everything together. Luckily we have a single cmd that can do all of this. :)
```
yarn all:bootstrap
```
> Note that our docker containers have their own independent node_modules which is installed automatically when you spin them up. For local development that is not the case. You will need to make sure to periodically install new deps.

### Commands
Run the following in the root directory to get a list of available cmds.
```
yarn run
```
These shortcuts are defined to make development easier. Run the same command inside of the individual application and package directories to see their specific cmds. Beyond that it is recommended review (lerna documentation)[https://github.com/lerna/lerna].

## Docker setup
> Note the following steps assume all cmds are run within `pixeloven`. This is also WIP and will be updated as needed.

First, let's pull our images locally. 
```
docker-compose pull
```
Next we can spin up our local docker env.
```
docker-compose up
```
Currently only the example app is setup and forwards to localhost. 