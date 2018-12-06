#!/usr/bin/env node
import { spawnComplete, spawnYarn } from "@pixeloven/core";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Simply execute plop
 */
const scriptResult = spawnYarn("plop");
spawnComplete(scriptResult);
