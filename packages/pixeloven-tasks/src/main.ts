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

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(x => x === "build" || x === "serve");
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

/**
 * Spawn process to execute script
 */
const execute = (scriptName: string) => {
    const absolutePath = path.resolve(
        fs.realpathSync(__dirname),
        `${scriptName}.js`,
    );
    const calling = nodeArgs
        .concat(absolutePath)
        .concat(args.slice(scriptIndex + 1));
    return spawn.sync("node", calling, {
        stdio: "inherit",
    });
};

const checkSignals = (result: SpawnSyncReturns<Buffer>) => {
    if (result.signal) {
        if (result.signal === "SIGKILL") {
            console.log(
                "The build failed because the process exited too early. " +
                    "This probably means the system ran out of memory or someone called " +
                    "`kill -9` on the process.",
            );
        } else if (result.signal === "SIGTERM") {
            console.log(
                "The build failed because the process exited too early. " +
                    "Someone might have called `kill` or `killall`, or the system could " +
                    "be shutting down.",
            );
        }
        process.exit(1);
    }
};

switch (script) {
    case "build":
    case "serve": {
        const result = execute(script);
        checkSignals(result);
        process.exit(result.status);
        break;
    }
    default:
        console.log(`Unknown script ${script}.`);
        break;
}
