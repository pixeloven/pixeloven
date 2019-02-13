import {
    createOrEmptyDir,
    resolvePath,
} from "@pixeloven/core";
import { env } from "@pixeloven/env";
import { logger } from "@pixeloven/node-logger";
import {
    BuildOptions,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import {
    build,
    OpaqueFileSizes,
    printBuildFileSizesAfterGzip,
    printBuildStatus,
} from "./utils/build";
import { hasClientCodePath, hasServerCodePath } from "./utils/macros";

/**
 * Get print method
 */
const { measureFileSizesBeforeBuild } = FileSizeReporter;

/**
 * Build client code path
 * @param path 
 * @param environment 
 */
const buildClientCode = async (path: string, environment: NodeJS.ProcessEnv, options: BuildOptions) => {
    const previousFileSizes: OpaqueFileSizes = await measureFileSizesBeforeBuild(path);
    const results = await build(
        webpackServerConfig(environment, options),
        previousFileSizes,
    );
    printBuildStatus(results.warnings);
    printBuildFileSizesAfterGzip(
        path,
        results.stats,
        results.previousFileSizes,
    );
}

/**
 * Build server code path
 * @param path 
 * @param environment 
 */
const buildServerCode = async (path: string, environment: NodeJS.ProcessEnv, options: BuildOptions) => {
    const previousFileSizes: OpaqueFileSizes = await measureFileSizesBeforeBuild(path);
    const results = await build(
        webpackClientConfig(environment, options),
        previousFileSizes,
    );
    printBuildStatus(results.warnings);
    printBuildFileSizesAfterGzip(
        path,
        results.stats,
        results.previousFileSizes,
    );
}

/**
 * Setup variables and execute
 * @todo We should use the new compiler class here... Also create a Build class similar to our Server class
 * @todo Remove env and pass in process.env... have them set through Cli options
 */
export default async (options: BuildOptions) => {
    try {
        /**
         * Initialize env vars
         */
        env.load();

        /**
         * Set test environment
         */
        env.define("BABEL_ENV", "production");
        env.define("NODE_ENV", "production");

        /**
         * Setup build pathing
         */
        const privateBuildPath = resolvePath(env.config("BUILD_PATH", "dist"), false);
        const publicBuildPath = `${privateBuildPath}/public`;

        const environment = env.config();
        // TODO be mindful of /docs.. this deletes them :( - Also make storybook configurable ON/OFF
        createOrEmptyDir(privateBuildPath);
        createOrEmptyDir(publicBuildPath);

        /**
         * Handle build for server side JavaScript
         * @description This lets us display how files changed
         */
        if (hasServerCodePath()) {
            buildClientCode(privateBuildPath, environment, options);
        }
        /**
         * Handle build for client side JavaScript
         * @description This lets us display how files changed
         */
        if (hasClientCodePath()) {
            buildServerCode(publicBuildPath, environment, options);
        }
        return 0;
    } catch (err) {
        if (err && err.message) {
            logger.error(err.message);
        }
        return 1;
    }
};
