import { createOrEmptyDir } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";

/**
 * Setup constants for bundle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Get FileSizeReporter functions
 */
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild,
} = FileSizeReporter;

export interface Config {
    path: string;
}

class Build {
    /**
     * Compiler
     */
    protected compiler: Compiler;

    /**
     * Config
     */
    protected config: Config;

    /**
     * Client code path
     */
    protected clientPath: string;

    /**
     * Server code path
     */
    protected serverPath: string;

    /**
     * Construct server
     * @param compiler
     * @param config
     */
    constructor(compiler: Compiler, config: Config) {
        this.compiler = compiler;
        this.config = config;

        this.clientPath = `${config.path}/public`;
        this.serverPath = config.path;
    }

    /**
     * Build client code path
     */
    public async client() {
        createOrEmptyDir(this.config.path);
        logger.info("Creating an optimized production build...");
        if (this.compiler.hasClientCodePath) {
            logger.info("Client code path found...");
            if (this.compiler.client) {
                logger.info("Compiling client...");
                const previousFileSizes: string[] = await measureFileSizesBeforeBuild(
                    this.clientPath,
                );
                this.compiler.client.run(
                    this.handle(this.clientPath, previousFileSizes),
                );
                return true;
            }
            throw new Error(`Client compiler failed to initialize.`);
        }
        throw new Error(`Client code path ${this.clientPath} does not exist.`);
    }

    /**
     * Build server code path
     */
    public async server() {
        if (this.compiler.hasServerCodePath) {
            logger.info("Server code path found...");
            if (this.compiler.server) {
                logger.info("Compiling server...");
                const previousFileSizes: string[] = await measureFileSizesBeforeBuild(
                    this.serverPath,
                );
                this.compiler.server.run(
                    this.handle(this.serverPath, previousFileSizes),
                );
                return true;
            }
            throw new Error(`Server compiler failed to initialize.`);
        }
        throw new Error(`Server code path ${this.serverPath} does not exist.`);
    }

    /**
     * @todo Return stats as part of the promise for the CLI to handle
     * @param path 
     * @param fileSizes 
     */
    private handle(path: string, fileSizes: string[]) {
        return (err: Error, stats: Stats) => {
            if (err) {
                logger.error(err.message);
            } else {
                const messages = formatWebpackMessages(stats.toJson("verbose"));
                if (messages.errors.length) {
                    logger.error(messages.errors.join("\n\n"));
                }
                if (messages.warnings.length) {
                    logger.warn("Compiled with warnings.");
                    logger.warn(messages.warnings.join("\n\n"));
                    logger.warn(
                        'Search for the "keywords" to learn more about each warning.',
                    );
                    if (
                        process.env.CI &&
                        process.env.CI.toLowerCase() !== "false" &&
                        messages.warnings.length
                    ) {
                        logger.info(
                            "Treating warnings as errors because process.env.CI = true.",
                        );
                        logger.info("Most CI servers set it automatically.");
                        throw new Error(messages.warnings.join("\n\n"));
                    }
                } else {
                    logger.info("Compiled successfully.");
                    logger.info("File sizes after gzip:\n");
                    printFileSizesAfterBuild(
                        stats,
                        fileSizes,
                        path,
                        WARN_AFTER_BUNDLE_GZIP_SIZE,
                        WARN_AFTER_CHUNK_GZIP_SIZE,
                    );
                    console.log();
                }
            }
        };
    }
}

export default Build;