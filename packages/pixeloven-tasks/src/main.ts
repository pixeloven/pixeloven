#!/usr/bin/env node
import { SpawnSyncReturns } from "child_process";
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
 * Check signal returned by execution and close process
 * @param result
 */
const complete = (result: SpawnSyncReturns<Buffer>) => {
    if (result.signal) {
        if (result.signal === "SIGKILL") {
            console.error(
                "Process exited too early. " +
                    "This probably means the system ran out of memory or someone called " +
                    "`kill -9` on the process."
            );
        } else if (result.signal === "SIGTERM") {
            console.error(
                "Process exited too early. " +
                    "Someone might have called `kill` or `killall`, or the system could " +
                    "be shutting down."
            );
        }
        process.exit(1);
    } else {
        process.exit(result.status);
    }
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
        complete(result);
        break;
    }
    default:
        console.log(`Unknown script ${scriptName}.`);
        break;
}
