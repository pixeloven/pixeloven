#!/usr/bin/env node
import { spawnComplete } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) =>
    index === "build" || index === "serve";

/**
 * Spawn process to execute script
 */
const execute = (index: number, name: string, args: string[]) => {
    const nodeArgs = index > 0 ? args.slice(0, index) : [];
    const absolutePath = path.resolve(fs.realpathSync(__dirname), `${name}.js`);
    const calling = nodeArgs.concat(absolutePath).concat(args.slice(index + 1));
    return spawn.sync("node", calling, {
        stdio: "inherit",
    });
};

/**
 * Setup variables and execute
 */
const scriptArgs = process.argv.slice(2);
const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
const scriptName = scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];

switch (scriptName) {
    case "build":
    case "serve": {
        const result = execute(scriptIndex, scriptName, scriptArgs);
        spawnComplete(result);
        break;
    }
    default:
        logger.error(`Unknown script ${scriptName}.`);
        break;
}
