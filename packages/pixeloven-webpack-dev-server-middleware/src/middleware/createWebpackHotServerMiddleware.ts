import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import express, { Application, NextFunction, Request, Response } from "express";
import MemoryFileSystem from "memory-fs";
import path from "path";
import requireFromString from "require-from-string";
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
const getFileName = (stats: StatsObject, chunkName: string) => {
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
 * Middleware for server bundle
 * @param compiler
 */
async function webpackHotServerMiddleware(compiler: Compiler) {
    if (!compiler.server) {
        throw new Error(`Server compiler not found`);
    }
    if (compiler.server.options.target !== "node") {
        throw new Error(
            `Server compiler configuration must be targeting node`,
        );
    }
    /**
     * @todo we could pass in fileSystem from devMiddleware instead of hoping that it exists and casting here\
     */
    const outputFs = compiler.server.outputFileSystem as MemoryFileSystem;
    try {
        const serverStats = await compiler.onDoneOnce("server");
        const serverStatsObject = serverStats.toJson("verbose");
        logger.info("Applying bundled server to stream");

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
 * @todo should handle compiler.hooks.invalid like https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js
 * @todo improve logging
 * @param compiler
 */
const createWebpackHotServerMiddleware = (compiler: Compiler) => {
    return webpackHotServerMiddleware(compiler);
};

export default createWebpackHotServerMiddleware;
