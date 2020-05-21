# Notes
Simply a list of ideas I throw down when I can't sleep

## Planned v6 Release
* Onboarding
    * Finish getting started and API documentation
    * Finish App and package generators
* Clean up examples
    * abstract what I need from ssr example and gut the rest
    * finish dockerizing them
    * Revisit the peer vs dep situation for the main cli
    * Remove warnings
```
warning @pixeloven/cli > @pixeloven-tooling/linter > tslint-react@4.2.0: TSLint has been deprecated in favor of ESLint. Please see https://github.com/palantir/tslint-react/issues/210 for more information.
warning @pixeloven/cli > @pixeloven-tooling/test > jest-haste-map > fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
warning @pixeloven/cli > @pixeloven-tooling/test > jest-config > jest-environment-jsdom > jsdom > left-pad@1.3.0: use String.prototype.padStart()
warning @pixeloven/cli > @pixeloven-tooling/test > jest-config > jest-environment-jsdom > jsdom > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning @pixeloven/cli > @pixeloven-tooling/test > jest-haste-map > micromatch > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
warning @pixeloven/cli > @pixeloven-tooling/test > jest-haste-map > micromatch > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
warning @pixeloven/cli > @pixeloven-tooling/linter > stylelint > postcss-markdown > remark > unified > @types/vfile > @types/vfile-message@2.0.0: This is a stub types definition. vfile-message provides its own type definitions, so you do not need this installed.
warning @pixeloven/cli-addon-storybook > @pixeloven-storybook/common > @storybook/react > react-dev-utils > fork-ts-checker-webpack-plugin > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
warning @pixeloven/cli-addon-storybook > @pixeloven-storybook/common > @storybook/react > react-dev-utils > fork-ts-checker-webpack-plugin > chokidar > fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
warning @pixeloven/cli-addon-storybook > @pixeloven-storybook/config > webpack > watchpack > watchpack-chokidar2 > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
warning @pixeloven/cli-addon-storybook > @pixeloven-storybook/common > @storybook/addon-actions > @storybook/components > popper.js@1.16.1: You can find the new Popper v2 at @popperjs/core, this package is dedicated to the legacy v1
warning @pixeloven/cli-addon-storybook > @pixeloven-storybook/common > @storybook/addon-actions > @storybook/components > react-popper-tooltip > react-popper > popper.js@1.16.1: You can find the new Popper v2 at @popperjs/core, this package is dedicated to the legacy v1
warning @pixeloven/cli-addon-webpack > @pixeloven-webpack/compiler > @pixeloven-webpack/config > react-dev-utils > fork-ts-checker-webpack-plugin > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
warning lerna > @lerna/bootstrap > @lerna/run-lifecycle > npm-lifecycle > node-gyp > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning lerna > @lerna/bootstrap > @lerna/symlink-binary > @lerna/create-symlink > @zkochan/cmd-shim > mkdirp-promise@5.0.1: This package is broken and no longer maintained. 'mkdirp' itself supports promises now, please switch to that.
```
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
