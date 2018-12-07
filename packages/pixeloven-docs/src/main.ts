#!/usr/bin/env node
import { spawnComplete, spawnYarn } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import fs from "fs";
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
 * Load config file
 * @description First see if a remote config path is available otherwise load the local one
 * @param file
 * @return string
 */
const loadConfigPath = (dir: string): string => {
    const remoteConfig = path.resolve(process.cwd(), dir);
    if (fs.existsSync(remoteConfig)) {
        return remoteConfig;
    }
    return path.resolve(__dirname, dir);
};

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
    const scriptName = scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];
    
    switch (scriptName) {
        case "build":
        case "build:story": {
            const config = loadConfigPath("./configs");
            const output = path.resolve(process.cwd(), "./dist/public/docs");
            const result = spawnYarn("build-storybook", ["-c", config, "-o", output]);
            spawnComplete(result);
            break;
        }
        case "serve":
        case "serve:story": {
            const config = loadConfigPath("./configs");
            const result = spawnYarn("start-storybook", [
                "--quiet",
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
        default:
            logger.error(`Unknown usage ${scriptName}.`);
            break;
    }
}

export default main;