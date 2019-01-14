import { errorHandler } from "@pixeloven/core";
import { env, Environment } from "@pixeloven/env";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", errorHandler);

/**
 * Initialize env vars
 */
env.load();

/**
 * Set test environment
 */
const environment: Environment = "production";
env.define("BABEL_ENV", environment);
env.define("NODE_ENV", environment);
