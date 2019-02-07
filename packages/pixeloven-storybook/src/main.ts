#!/usr/bin/env node
import { exit, spawnComplete, spawnBin } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import path from "path";

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) =>
    index === "build" ||
    index === "build:story" ||
    index === "serve" ||
    index === "serve:story";

/**
 * Setup variables and execute
 *
 * @todo Check for yarn before attempting to execute
 * @todo Show usage for scripts if not in index
 * @todo Allow for custom port/host in .env
 */
const main = (argv: string[]) => {
    const scriptArgs = argv.slice(2);
    const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
    const scriptName =
        scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];

    if (scriptIndex === -1) {
        logger.error(`Unknown usage ${scriptName}.`);
        exit(1);
    }

    // TODO output dir should be configurable
    // TODO this is broken in remote libraries :(
    switch (scriptName) {
        case "build":
        case "build:story": {
            const config = path.resolve(__dirname, "./configs");
            const result = spawnBin("build-storybook", [
                "-c",
                config,
                "-o",
                "./dist/public/docs",
            ]);
            spawnComplete(result);
            break;
        }
        case "serve":
        case "serve:story": {
            const config = path.resolve(__dirname, "./configs");
            const result = spawnBin("start-storybook", [
                "--quiet",
                "--ci",
                "-s",
                "./public",
                "-p",
                "9001",
                "-c",
                config,
            ]);
            spawnComplete(result);
            break;
        }
    }
};

export default main;
