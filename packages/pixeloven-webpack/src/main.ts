#!/usr/bin/env node
import {
    createOrEmptyDir,
    exit,
    handleError,
    resolvePath,
} from "@pixeloven/core";
import { env } from "@pixeloven/env";
import { logger } from "@pixeloven/node-logger";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import {
    build,
    BuildInformation,
    OpaqueFileSizes,
    printBuildFileSizesAfterGzip,
    printBuildStatus,
} from "./utils/build";
import { hasClientCodePath, hasServerCodePath } from "./utils/macros";

/**
 * Setup build pathing
 */
const PRIVATE_BUILD_PATH = resolvePath(env.config("BUILD_PATH", "dist"), false);
const PUBLIC_BUILD_PATH = `${PRIVATE_BUILD_PATH}/public`;

/**
 * Get FileSizeReporter functions
 */
const { measureFileSizesBeforeBuild } = FileSizeReporter;

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) => index === "build";

/**
 * Setup variables and execute
 * @todo We should use the new compiler class here... Also create a Build class similar to our Server class
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
        try {
            const environment = env.config();
            // TODO be mindful of /docs.. this deletes them :( - Also make storybook configurable ON/OFF
            createOrEmptyDir(PRIVATE_BUILD_PATH);
            createOrEmptyDir(PUBLIC_BUILD_PATH);

            /**
             * Handle build for server side JavaScript
             * @description This lets us display how files changed
             */
            if (hasServerCodePath()) {
                measureFileSizesBeforeBuild(PRIVATE_BUILD_PATH)
                    .then((previousFileSizes: OpaqueFileSizes) => {
                        return build(
                            webpackServerConfig(environment),
                            previousFileSizes,
                        );
                    })
                    .then(
                        ({
                            previousFileSizes,
                            stats,
                            warnings,
                        }: BuildInformation) => {
                            printBuildStatus(warnings);
                            printBuildFileSizesAfterGzip(
                                PRIVATE_BUILD_PATH,
                                stats,
                                previousFileSizes,
                            );
                        },
                        handleError,
                    );
            }
            /**
             * Handle build for client side JavaScript
             * @description This lets us display how files changed
             */
            if (hasClientCodePath()) {
                measureFileSizesBeforeBuild(PUBLIC_BUILD_PATH)
                    .then((previousFileSizes: OpaqueFileSizes) => {
                        return build(
                            webpackClientConfig(environment),
                            previousFileSizes,
                        );
                    })
                    .then(
                        ({
                            previousFileSizes,
                            stats,
                            warnings,
                        }: BuildInformation) => {
                            printBuildStatus(warnings);
                            printBuildFileSizesAfterGzip(
                                PUBLIC_BUILD_PATH,
                                stats,
                                previousFileSizes,
                            );
                        },
                        handleError,
                    );
            }
        } catch (error) {
            handleError(error);
        }
    }
};

export default main;
