import { DynamicMiddleware } from "@pixeloven/express-dynamic-middleware";
import { Compiler } from "@pixeloven/webpack-compiler";
import express, { Express, NextFunction, Request, Response } from "express";
import MemoryFileSystem from "memory-fs";
import path from "path";
import requireFromString from "require-from-string";
import { Stats } from "webpack";
import { Module } from "./types";

interface HotServerMiddlewareConfig {
    done?: (stats: Stats) => void;
    error?: (stats: Error) => void;
}

/**
 * Checks file is an es module and has a default export
 * @param obj
 */
const interopRequireDefault = (obj: Module) => {
    return obj && obj.__esModule ? obj.default : obj;
};

/**
 * Gets file name from buffer
 * @description If source maps are generated `assetsByChunkName.main` will be an array of filenames.
 * @param stats
 * @param chunkName
 */
const getFileName = (stats: Stats.ToJsonOutput, chunkName: string) => {
    /**
     * @todo We should probably error out if outputPath is empty
     */
    const outputPath = stats.outputPath || "";
    const fileName = stats.assetsByChunkName && stats.assetsByChunkName[chunkName];
    if (!fileName) {
        throw Error(`Asset chunk ${chunkName} could not be found.`);
    }
    return path.join(
        outputPath,
        Array.isArray(fileName)
            ? fileName.find(asset => /\.js$/.test(asset))
            : fileName,
    );
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
        throw new Error("Module is not of type Express");
    }
    return server as Express;
};

/**
 * Middleware for server bundle
 * @param compiler
 * @todo Could pass in fileSystem from devMiddleware instead of hoping that it exists and casting here
 * @todo Pass in before and after handlers for logging and such
 */
const webpackHotServerMiddleware = (
    compiler: Compiler,
    config: HotServerMiddlewareConfig,
) => {
    if (!compiler.server) {
        throw new Error(`Server compiler not found`);
    }
    if (compiler.server.options.target !== "node") {
        throw new Error(`Server compiler configuration must be targeting node`);
    }
    const dynamicMiddleware = new DynamicMiddleware();
    const outputFs = compiler.server.outputFileSystem as MemoryFileSystem;
    /**
     * Create Handler
     * @param stats
     */
    const onDoneHandler = (stats: Stats) => {
        const statsObject = stats.toJson("verbose");
        const fileName = getFileName(statsObject, "main");
        const buffer = outputFs.readFileSync(fileName);
        dynamicMiddleware.clean();
        dynamicMiddleware.mount(getServer(fileName, buffer));
        if (config.done) {
            config.done(stats);
        }
    };

    try {
        compiler.onDone("server", onDoneHandler);
        return dynamicMiddleware.handle();
    } catch (err) {
        if (config.error) {
            config.error(err);
        }
        return (req: Request, res: Response, next: NextFunction) => {
            next(err);
        };
    }
};

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo should handle compiler.hooks.invalid like https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js
 * @todo improve logging
 * @param compiler
 */
const createWebpackHotServerMiddleware = (
    compiler: Compiler,
    config: HotServerMiddlewareConfig = {},
) => {
    return webpackHotServerMiddleware(compiler, config);
};

export default createWebpackHotServerMiddleware;
