/* tslint:disable:no-any */
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import express, { Application, NextFunction, Request, Response } from "express";
import MemoryFileSystem from "memory-fs";
import path from "path";
import requireFromString from "require-from-string";
import * as sourceMapSupport from "source-map-support";

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
    // A list of chunk objects
    chunks: [];
    // A list of module objects
    modules: [];
    // A list of error strings
    errors: [];
    // A list of warning strings
    warnings: [];
}
// const buffer = outputFs.readFileSync(filename);

interface MultiStatsObject {
    client?: StatsObject;
    server?: StatsObject;
}

interface Module {
    __esModule: any;
    default: any;
}

/**
 * Checks file is an es module and has a default export
 * @param obj
 */
const interopRequireDefault = (obj: Module) => {
    return obj && obj.__esModule ? obj.default : obj;
};

/**
 * Returns server application from file name and memory buffer
 * @param filename
 * @param buffer
 */
const getServer = (filename: string, buffer: Buffer) => {
    const server = interopRequireDefault(
        requireFromString(buffer.toString(), filename),
    );
    /**
     * @todo not sure if this will work
     */
    if (Object.getPrototypeOf(server) === express) {
        throw new Error();
    }
    return server as Application;
};

/**
 * Gets file name from buffer
 * @description If source maps are generated `assetsByChunkName.main` will be an array of filenames.
 * @param stats
 * @param chunkName
 */
function getFileName(stats: StatsObject, chunkName: string) {
    const outputPath = stats.outputPath;
    const fileName = stats.assetsByChunkName[chunkName];
    if (!fileName) {
        throw Error(`Asset chunk ${chunkName} could not be found`);
    }
    return path.join(
        outputPath,
        Array.isArray(fileName)
            ? fileName.find(asset => /\.js$/.test(asset))
            : fileName,
    );
}

/**
 * @todo This might not bee needed anymore should see what happens with or without.
 * @param fs
 */
function installSourceMapSupport(fs: MemoryFileSystem) {
    sourceMapSupport.install({
        // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
        // lands we can be less aggressive and explicitly invalidate the source
        // map cache when Webpack recompiles.
        emptyCacheBetweenOperations: true,
        retrieveFile(source) {
            try {
                return fs.readFileSync(source, "utf8");
            } catch (ex) {
                // Doesn't exist
            }
        },
    });
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
     * @todo we could pass in fileSystem from devMiddleware instead of hoping that it exists and casting here
     */
    const outputFs = compiler.server.outputFileSystem as MemoryFileSystem;
    installSourceMapSupport(outputFs);



    /**
     * https://github.com/60frames/webpack-hot-server-middleware/blob/master/src/index.js
     * @todo Done handlers for providing stats to server
     */
    const multiStats: MultiStatsObject = {};
    compiler
        .onDone("client")
        .then(stats => {
            multiStats.client = stats.toJson("verbose");
            logger.info("Applying client stats to stream.");
        })
        .catch((err: Error) => {
            logger.error(err.message);
        });

    /**
     * @todo might need to break the client and server into two async methods that do Promise.all on. 
     *      - https://hackernoon.com/async-await-generators-promises-51f1a6ceede2
     * @todo Need to do something like this...
     * 1) Inspired by AssetManifest add client stats to express request.
     *      - How do we apply if client seems to finish after server starts? async problems:(
     * 2) Pass server app back to dev server and apply as middleware / sub app.
     * 3) Need to be able to restart server if server bundle changes
     *      - Need to be able to config path so we are always refreshing if not needed.
     */
    return compiler
        .onDone("server")
        .then(stats => {
            const serverStats = stats.toJson("verbose");
            multiStats.server = serverStats;
            logger.info("Applying server stats to stream.");

            const fileName = getFileName(serverStats, "main");
            const buffer = outputFs.readFileSync(fileName);
            return getServer(fileName, buffer);
        })
        .catch((err: Error) => {
            logger.error(err.message);
            return (req: Request, res: Response, next: NextFunction) => {
                next(err);
            }
        });
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
