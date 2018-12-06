#!/usr/bin/env node
import { exit, spawnComplete, spawnYarn } from "@pixeloven/core";

export const errorHandler = (err: Error) => {
    throw err;
};

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) =>
    index === "generate"

/**
 * Setup execution
 * @todo use unified logger
 */
const main = (argv: string[]) => {
    const scriptArgs = argv.slice(2);
    const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
    const scriptName = scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];
    if(scriptIndex === -1) {
        console.log(`Unknown usage ${scriptName}.`);
        exit(1);
    } else {
        const scriptResult = spawnYarn("plop");
        spawnComplete(scriptResult);
    }
}

export default main;