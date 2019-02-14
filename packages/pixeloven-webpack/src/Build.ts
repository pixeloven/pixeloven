import {
    createOrEmptyDir
} from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";

interface Config {
    path: string;
}

class Build {

    protected compiler: Compiler;
    protected config: Config;

    /**
     * Construct server
     * @param compiler
     * @param config
     */
    constructor(compiler: Compiler, config: Config) {
        this.compiler = compiler;
        this.config = config;
    }

    public async create() {
        createOrEmptyDir(this.config.path);
        logger.info("Creating an optimized production build...");
        if (this.compiler.hasClientCodePath) {
            logger.info("Client code path found...");
            if (this.compiler.client) {
                logger.info("Compiling client...");
                this.compiler.client.run((err, stats) => {
                    if (err) {
                        logger.error(err.message);
                    }
                    // Handle errors and print stats
                });
            }
        }
        if (this.compiler.hasServerCodePath) {
            logger.info("Server code path found...");
            if (this.compiler.server) {
                logger.info("Compiling server...");
                this.compiler.server.run((err, stats) => {
                    if (err) {
                        logger.error(err.message);
                    }
                    // Handle errors and print stats
                });
            }
        }
    }
}

export default Build;
