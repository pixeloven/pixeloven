# Notes
Simply a list of ideas I throw down when I can't sleep

## Planned v6 Release
* Onboarding
    * Finish getting started and API documentation
    * Create generator for init and make compatible with npx (npx pixeloven init my-app) like create react app does.
    * Finish App and package generators
* Clean up examples
    * abstract what I need from ssr example and gut the rest
    * finish dockerizing them

## After v6 Release
* Storybook
    * storybook-addon-options is deprecated and will stop working soon
* Workflow
    * Update base tooling to allow prettier to have full integration like the main CLI.
    * Remove commit-citizen from PO (maybe from pixeloven/ssr as well)
    * Pre-commit stuff on examples and apps
    * Integration test system to verify CLI under a number of different conditions
        * Root of mono repo
        * Nested in each package of a mono repo
        * Standard repo
        * Mount each package in isolation to test for issues
        * Plus all the options one can have
    * Reach 90-100% unit test coverage
    * Create custom tslint / eslint extension to match our specifications (new repo might be best for this one)
        * "tslint:latest",
        * "tslint-config-prettier",
        * "tslint-eslint-rules",
        * "tslint-react",
        * "tslint-react-hooks"
    * Generators
        * create generator for library
        * crete generator for addon
        * Partial generators for existing projects???
    * Consolidate lerna's conventional-changelog-angular with the one here????
* Document
    * Finish advanced guides and contribution docs
    * hardcoded opinions like .dist and .src
    * version the site so we can start on v7
    * create a basic library so I can reuse components between them
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
        * namespace our config better and integrate with @commitlint
    * Finish github deploy CLI addon
* Testing libraries
    * create common packages for some of our most common deps
    * create section for cypress and consider something for CLI Addon
* Express server
    * make dynamic middleware more attractive outside of our context
    * create a common package for core deps and basic server setup
    * clean up webpack middleware and see what can be merged, forked and moved into this section
    * improve dev server so it can go under this section instead of the other way around
* Webpack
    * Finish webpack for libraries 
    * Continue to break config in parts for reusability
        * break babel and ts into separate packages (create babel only addon)

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
* Workflow
    * Automate test, build and release
    * Integrate with github packages (docker, npm, etc)
    * Keep NPM for legacy

## After v7 Release
* Add support for PWA
* Add static site generation support
* Add MDX support
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


## PR Lerna
Make this configurable https://github.com/ductiletoaster/lerna/blob/master/commands/publish/index.js#L249
    - ignore completely
    - or reject changes if publish fails... something
Update this retry logic
    - It appears https://github.com/ductiletoaster/lerna/blob/master/commands/publish/index.js#L708 uses publish and fails if it rejects the promise. Goal is to rewirte this functionality and include bulk publish support like this portion of code.
    - First make retry more configurable 
        - retryAttempts: number
        - retryTimeout: number
        - If publishing ten packages don't exit on the first failure. Attempt retry, track failures and log via output but continue. The final attempt can exit with a status code but we should still always attempt to publish all packages.
            - I deal scenario here is that that we work off a queue. FIFO where retries are thrown at the end of the queue and not attempted until other packages have had there turn.
    - https://github.com/ductiletoaster/lerna/blob/master/utils/npm-publish/npm-publish.js#L70

    - Might need to go as far as here
        - https://github.com/evocateur/libnpmpublish
        - 