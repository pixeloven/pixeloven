import { env, Environment } from "@pixeloven/core";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Initialize env vars
 */
env.load();

/**
 * Set test environment
 */
const environment: Environment = "test";
env.define("BABEL_ENV", environment);
env.define("NODE_ENV", environment);
