import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import express, { Application, NextFunction, Request, Response } from "express";
import MemoryFileSystem from "memory-fs";
import path from "path";
import requireFromString from "require-from-string";
import * as sourceMapSupport from "source-map-support";
import { Module, StatsObject } from "./types";

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
        throw new Error("Module is not of type Express.Application");
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
        throw Error(`Asset chunk ${chunkName} could not be found.`);
    }
    return path.join(
        outputPath,
        Array.isArray(fileName)
            ? fileName.find(asset => /\.js$/.test(asset))
            : fileName,
    );
}

/**
 * @todo Investigate whether is still necessary
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
async function webpackHotServerMiddleware(compiler: Compiler) {
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
     * @todo Make chunk name configurable
     * @todo Allow streaming of webpack stats for both server and client to browser
     * 
     * @todo Need to do the following:
     * 1) Cleanup logging
     * 2) Need to invalidate/restart server if this chunk changes
     */
    try {
        const serverStats = await compiler.onDone("server");
        const serverStatsObject = serverStats.toJson("verbose");
        logger.info("Applying server stats to stream.");

        const fileName = getFileName(serverStatsObject, "main");
        const buffer = outputFs.readFileSync(fileName);
        return getServer(fileName, buffer);
    } catch (err) {
        logger.error(err.message);
        return (req: Request, res: Response, next: NextFunction) => {
            next(err);
        };
    }
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param compiler
 */
const createWebpackHotServerMiddleware = (compiler: Compiler) => {
    return webpackHotServerMiddleware(compiler);
};

export default createWebpackHotServerMiddleware;
