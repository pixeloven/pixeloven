#!/usr/bin/env node
import { errorHandler } from "@pixeloven/core";
import main from "./main";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", errorHandler);

/**
 * Execute CLI
 */
main(process.argv);
