# Notes
Simply a list of ideas I throw down when I can't sleep

* Clean up examples
    * Generators should get the current versions automatically some how
    * Update examples right before versioning
    * automate versioning when merging to master
    * abstract what I need from ssr example and gut the rest
    * finish dockerizing them
    * Revisit the peer vs dep situation for the main cli
    * create deprecated section so I can link back to main site for all the old packages
    * Document how to extend PO
    * Document how to contribute
* Workflow
    * Automate test, build and release
    * Integrate with github packages (docker, npm, etc)
    * Pre-commit stuff on examples and apps
    * Integration test system to verify CLI under a number of different conditions
        * Root of mono repo
        * Nested in each package of a mono repo
        * Standard repo
        * Mount each package in isolation to test for issues
        * Plus all the options one can have
    * Reach 90-100% unit test coverage
    * Generators
        * create generator for library
        * create generator for addon
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


## Before v7 Release
* updated docs
* updated ssr example and generator

## After v7 Release
* eslint addon
* Create a env addon for the CLI for those who wish to pull .env from a file (based on @env)
* Add support for PWA
* Add static site generation support
* Add MDX support

## Planned v8 Release
* PixelOven theme for storybook, coverage and workflow

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
