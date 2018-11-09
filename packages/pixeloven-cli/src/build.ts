/**
 * Bootstrap development env
 */
import "./bootstrap/production";

/**
 * Import dependencies
 */
import {
  env,
  handleError,
  logger,
  resolvePath,
  WebpackStatsHandler
} from "@pixeloven/core";
import chalk from "chalk";
import fs from "fs-extra";
import Promise from "promise";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import webpack, { Stats } from "webpack";
import webpackClientConfig from "./configs/webpack/client";
import webpackServerConfig from "./configs/webpack/server";

/**
 * Build Information
 */
type OpaqueFileSizes = [];

interface BuildInformation {
  stats: Stats;
  previousFileSizes: OpaqueFileSizes;
  warnings: string[];
}

/**
 * Get FileSizeReporter functions
 */
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild
} = FileSizeReporter;

/**
 * Setup constants for bundle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Setup build pathing
 */
const PRIVATE_BUILD_PATH = resolvePath(
  env.config("BUILD_PATH", "build"),
  false
);
const PUBLIC_BUILD_PATH = `${PRIVATE_BUILD_PATH}/public`;

/**
 * Setup Build Directory
 * @param fullPath
 */
function setupDirectory(fullPath: string) {
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
  fs.emptyDirSync(fullPath);
}

/**
 * Print msg on status of build
 * @param warnings
 */
function printBuildStatus(warnings: string[]) {
  if (warnings.length) {
    logger.warn("Compiled with warnings.");
    logger.warn(warnings.join("\n\n")); // TODO print array??? can webpacl-log handle this natively???
    logger.warn(
      "Search for the " +
        chalk.underline(chalk.yellow("keywords")) +
        " to learn more about each warning."
    );
  } else {
    logger.info("Compiled successfully.");
  }
}

/**
 * Print build file sizes
 * @param buildPath
 * @param stats
 * @param previousFileSizes
 */
function printBuildFileSizesAfterGzip(
  buildPath: string,
  stats: Stats,
  previousFileSizes: OpaqueFileSizes
) {
  logger.info("File sizes after gzip:\n");
  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    buildPath,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  );
  console.log();
}

/**
 * Create the production build
 * @param config
 * @param previousFileSizes
 */
function build(config: object, previousFileSizes: OpaqueFileSizes) {
  logger.info("Creating an optimized production build...");
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err: Error, stats: Stats) => {
      if (err) {
        return reject(err);
      }
      const handler = new WebpackStatsHandler(stats);
      const messages = handler.format();
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        process.env.CI.toLowerCase() !== "false" &&
        messages.warnings.length
      ) {
        logger.info(
          "Treating warnings as errors because process.env.CI = true."
        );
        logger.info("Most CI servers set it automatically.");
        return reject(new Error(messages.warnings.join("\n\n")));
      }
      return resolve({
        previousFileSizes,
        stats,
        warnings: messages.warnings
      });
    });
  });
}

/**
 * Build script
 */
try {
  // TODO be mindful of /docs.. this deletes them :( - Also make storybook configurable ON/OFF
  setupDirectory(PRIVATE_BUILD_PATH);
  setupDirectory(PUBLIC_BUILD_PATH);

  /**
   * Handle build for server side JavaScript
   * @description This lets us display how files changed
   */
  measureFileSizesBeforeBuild(PRIVATE_BUILD_PATH)
    .then((previousFileSizes: OpaqueFileSizes) => {
      return build(webpackServerConfig, previousFileSizes);
    })
    .then(({ previousFileSizes, stats, warnings }: BuildInformation) => {
      printBuildStatus(warnings);
      printBuildFileSizesAfterGzip(
        PRIVATE_BUILD_PATH,
        stats,
        previousFileSizes
      );
    }, handleError);

  /**
   * Handle build for client side JavaScript
   * @description This lets us display how files changed
   */
  measureFileSizesBeforeBuild(PUBLIC_BUILD_PATH)
    .then((previousFileSizes: OpaqueFileSizes) => {
      return build(webpackClientConfig, previousFileSizes);
    })
    .then(({ previousFileSizes, stats, warnings }: BuildInformation) => {
      printBuildStatus(warnings);
      printBuildFileSizesAfterGzip(PUBLIC_BUILD_PATH, stats, previousFileSizes);
    }, handleError);
} catch (error) {
  handleError(error);
}
