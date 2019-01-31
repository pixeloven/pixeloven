/* tslint:disable:no-any */
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import express, { Application, NextFunction, Request, Response } from "express";
import requireFromString from "require-from-string";
// import webpackHotServerMiddleware from "webpack-hot-server-middleware";

interface ServerEntryPoint {
    __esModule: any;
    default: any;
}

const interopRequireDefault = (obj: ServerEntryPoint) => {
    return obj && obj.__esModule ? obj.default : obj;
}

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
}

/**
 * @todo make compiler it's own package
 * @todo make this it's own package
 * @param compiler 
 */
const webpackHotServerMiddleware = (compiler: Compiler) => {
    if (!compiler.client) {
        logger.warn(`Cannot find webpack compiler "client". Starting without client compiler`);
    }
    if (!compiler.server) {
        throw new Error(`Server compiler not found.`);
    }
    if (compiler.server.options.target !== "node") {
        throw new Error(`Server compiler configuration must be targeting node.`);
    }
    return (req: Request, res: Response, next: NextFunction): void => {
        next();
    };
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackHotServerMiddleware = (
    compiler: Compiler
) => {
    return webpackHotServerMiddleware(compiler);
};

export default createWebpackHotServerMiddleware;
