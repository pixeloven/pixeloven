import { env } from "@pixeloven/env";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    BuildOptions,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import Build from "./Build";

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
        const path = env.config("BUILD_PATH", "dist");
        const environment = env.config();

        /**
         * Create compiler
         */
        const compiler = Compiler.create([
            webpackClientConfig(environment, options),
            webpackServerConfig(environment, options),
        ]);

        const build = new Build(compiler, { path });
        build.create();
        return 0;
    } catch (err) {
        if (err && err.message) {
            logger.error(err.message);
        }
        return 1;
    }
};
