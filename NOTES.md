# Notes
Simply a list of ideas I throw down when I can't sleep

## Planned v6 Release
* Onboarding
    * Finish documentation for working with and contributing to PO
    * Robust --help sections
    * Create generator for init and make compatible with npx (npx pixeloven init my-app) like create react app does.
    * Finish App and package generators
* Clean up examples
    * abstract what I need from ssr example and gut the rest
    * fix dep issues and warnings
    * finish dockerizing them
* Express server
    * make dynamic middleware more attractive outside of our context
    * create a common package for core deps and basic server setup
    * clean up webpack middleware and see what can be merged, forked and moved into this section
    * improve dev server so it can go under this section instead of the other way around


## After v6 Release
* Workflow
    * Pre-commit stuff on examples and apps
    * Integration test system to verify CLI under a number of different conditions
        * Root of mono repo
        * Nested in each package of a mono repo
        * Standard repo
        * Plus all the options one can have
    * Reach 90-100% unit test coverage
    * Create custom tslint / eslint extension to match our specifications (new repo might be best for this one)
    * Consolidate lerna's conventional-changelog-angular with the one here????
* Document 
    * hardcoded opinions like .dist and .src
* General Improvements
    * Generalize the router to not need redux
    * Generalize or move react core components
    * Unify internal logging and remove/extend glueguns print to match
    * Generalize toolbox for CLI and clean up existing functions
    * Remove react-dev-utils
    * Replace node-mocks-http with supertest (reduce mocking)
* New CLI Addons
    * Break out typedoc feature
    * Break out the test feature (specifically jest)
    * Create new commit CLI to support commit linting along side husky and lint-stage
    * Finish github deploy CLI addon
* Testing libraries
    * create common packages for some of our most common deps
    * create section for cypress and consider something for CLI Addon
* Webpack
    * Finish webpack for libraries 
    * Continue to break config in parts for reusability

## Planned v7 Release
* Express server
    * create custom ok render for health check
    * configurable renderer (prod)
    * configurable error handler (prod)
    * custom dev error handler like created react apps
* Fork Jarvis modify for our needs.
    + Create more robust console section
    + BundleAnalyzerPlugin display tab with custom styles
    + Reduce connection section to be more condensed 
* Automate release publishing and come up with better process for release

## After v7 Release
* Add support for PWA
* Add static site generation support
* Create a env addon for the CLI for those who wish to pull .env from a file (based on @env)

## Planned v8 Release
* PixelOven theme for storybook, coverage and workflow
* Create a unified configuration

## Resources
* https://code.visualstudio.com/docs/remote/containers-advanced#_developing-inside-a-container-on-a-remote-docker-host
* https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
* https://github.com/microsoft/vscode-docker
* https://code.visualstudio.com/docs/remote/containers
* https://github.com/Microsoft/vscode-remote-try-node
* Review this [starter](https://github.com/bitjson/typescript-starter) and [this one](https://github.com/alexjoverm/typescript-library-starter) for trending ideas.
