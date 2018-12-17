#!/usr/bin/env node
import { exit, spawnComplete, spawnNode } from "@pixeloven/core";
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
    switch (scriptName) {
        case "build":
        case "build:story": {
            const config = path.resolve(__dirname, "./configs");
            const output = path.resolve(process.cwd(), "./dist/public/docs");
            const cmd = path.resolve(
                process.cwd(),
                "../../node_modules/.bin/build-storybook",
            );
            const result = spawnNode(cmd, ["-c", config, "-o", output]);
            spawnComplete(result);
            break;
        }
        case "serve":
        case "serve:story": {
            const config = path.resolve(__dirname, "./configs");
            const cmd = path.resolve(
                process.cwd(),
                "../../node_modules/.bin/start-storybook",
            );
            const result = spawnNode(cmd, [
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
