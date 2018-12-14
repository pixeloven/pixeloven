#!/usr/bin/env node
import { exit, spawnComplete, spawnNode } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import path from "path";

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) =>
    index === "build" || index === "serve";

/**
 * Setup variables and execute
 */
const main = (argv: string[]) => {
    const scriptArgs = argv.slice(2);
    const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
    const scriptName =
        scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];
    if (scriptIndex === -1) {
        logger.error(`Unknown script ${scriptName}.`);
        exit(1);
    } else {
        const nodeArgs =
            scriptIndex > 0 ? scriptArgs.slice(0, scriptIndex) : [];
        const nodeScript = path.resolve(__dirname, `${scriptName}.js`);
        const result = spawnNode(nodeScript, nodeArgs);
        spawnComplete(result);
    }
};

export default main;
