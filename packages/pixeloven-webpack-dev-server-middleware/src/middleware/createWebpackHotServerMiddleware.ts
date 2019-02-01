/* tslint:disable:no-any */
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import { NextFunction, Request, Response } from "express";
// import requireFromString from "require-from-string";
// import webpackHotServerMiddleware from "webpack-hot-server-middleware";

// interface ServerEntryPoint {
//     __esModule: any;
//     default: any;
// }

// const interopRequireDefault = (obj: ServerEntryPoint) => {
//     return obj && obj.__esModule ? obj.default : obj;
// }

// const getServer = (filename: string, buffer: Buffer) => {
//     const server = interopRequireDefault(
//         requireFromString(buffer.toString(), filename),
//     );
//     /**
//      * @todo not sure if this will work
//      */
//     if (Object.getPrototypeOf(server) === express) {
//         throw new Error();
//     }
//     return server as Application;
// }

/**
 * @todo Add this to @types/webpack
 * @description based on https://webpack.js.org/api/stats/
 */
interface AssetObject {
    chunkNames: string[];
    chunks: number[];
    emitted: boolean;
    name: string;
    size: number;
}

interface StatsObject {
    version: string;
    hash: string;
    time: number;
    filteredModules: number;
    outputPath: string; // path to webpack output directory
    assetsByChunkName: {
        [key: string]: string;
    };
    assets: AssetObject[];
    chunks: [// A list of chunk objects];
    modules: [// A list of module objects];
    errors: [// A list of error strings];
    warnings: [// A list of warning strings];
}

interface StatsBuffer {
    client?: StatsObject;
    server?: StatsObject;
}

/**
 * @todo make compiler it's own package
 * @todo make this it's own package
 * @todo should handle compiler.hooks.invalid like https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js
 * @param compiler
 */
function webpackHotServerMiddleware(compiler: Compiler) {
    if (!compiler.client) {
        logger.warn(
            `Cannot find webpack compiler "client". Starting without client compiler`,
        );
    }
    if (!compiler.server) {
        throw new Error(`Server compiler not found.`);
    }
    if (compiler.server.options.target !== "node") {
        throw new Error(
            `Server compiler configuration must be targeting node.`,
        );
    }

    /**
     * @todo Don handlers for providing stats to server
     */
    const buffer: StatsBuffer = {};
    logger.info("client - before");
    compiler
        .onDone("client")
        .then(stats => {
            logger.info("client - then");
            buffer.client = stats.toJson("verbose");
        })
        .catch((err: Error) => {
            logger.info("client - catch");
            logger.error(err.message);
        });
    logger.info("client - after");
    logger.info("server - before");
    compiler
        .onDone("server")
        .then(stats => {
            logger.info("server - then");
            buffer.server = stats.toJson("verbose");
        })
        .catch((err: Error) => {
            logger.info("server - catch");
            logger.error(err.message);
        });
    // Return app from entry point here instead
    return (req: Request, res: Response, next: NextFunction): void => {
        res.write(JSON.stringify(buffer));
    };
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackHotServerMiddleware = (compiler: Compiler) => {
    return webpackHotServerMiddleware(compiler);
};

export default createWebpackHotServerMiddleware;
