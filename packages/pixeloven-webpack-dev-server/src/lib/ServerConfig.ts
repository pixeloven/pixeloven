import { env, LogLevel, Machine, Protocol } from "@pixeloven/env";
import { Application } from "express";
import requireFromString from "require-from-string";
import Compiler from "./Compiler";
import {
    createWebpackDevMiddleware,
    createWebpackHotMiddleware,
    createWebpackHotServerMiddleware,
    errorHandler,
} from "./middleware";

/**
 * @todo unify with @pixeloven/env
 */
export interface Server {
    logLevel: LogLevel;
    host: string;
    port: number;
    protocol: Protocol;
    path: string;
    machine: Machine;
}

export interface ServerConfig {
    after?: (app: Application) => void;
    before?: (app: Application) => void;
    middle?: (app: Application) => void;
    server: Server;
}

export interface ServerConfigFile {
    config?: () => ServerConfig
}

/**
 * Default Constants
 */
const DEFAULT_PUBLIC_PATH = "/";
const DEFAULT_HOST = "localhost";
const DEFAULT_PROTOCOL = "http";
const DEFAULT_PORT = "8080";
const DEFAULT_LOG_LEVEL = "info";
const DEFAULT_MACHINE = "host";

/**
 * ENV file Constants
 * @todo should make methods on env to do this
 */
const PUBLIC_PATH = env.config("PUBLIC_URL", DEFAULT_PUBLIC_PATH);
const HOST = env.config("HOST", DEFAULT_HOST);
const PROTOCOL = env.config("PROTOCOL", DEFAULT_PROTOCOL) as Protocol;
const PORT = env.config("PORT", DEFAULT_PORT);
const LOG_LEVEL = env.config("LOG_LEVEL", DEFAULT_LOG_LEVEL) as LogLevel;
const MACHINE = env.config("MACHINE", DEFAULT_MACHINE) as Machine;

/**
 * Checks if instance of ServerConfigFile
 * @param object
 */
const instanceOfServerConfigFile = (object: object): object is ServerConfigFile => {
    return "config" in object
}

/**
 * Require config
 * @param obj 
 */
const interopRequireConfig = (object: object) => {
    if (object && instanceOfServerConfigFile(object)) {
        return object.config;
    }
    return undefined;
}

/**
 * Creates default configuration
 * @param compilerConfig 
 */
export const createDefaultConfig = (compiler: Compiler): ServerConfig => {
    const server: Server = {
        host: HOST,
        logLevel: LOG_LEVEL,
        machine: MACHINE,
        path: PUBLIC_PATH,
        port: parseInt(PORT, 10),
        protocol: PROTOCOL,
    };
    return {
        middle: (app: Application) => {
            app.use(createWebpackDevMiddleware(server, compiler.combined));
            if (compiler.client) {
                app.use(createWebpackHotMiddleware(server, compiler.client));
            }
            app.use(
                createWebpackHotServerMiddleware(server, compiler.combined),
            );
            app.use(errorHandler);
        },
        server
    }
};

/**
 * Require options file
 * @todo Should add warnings and logging here
 */
export const createServerConfig = (compiler: Compiler, fileName: string, buffer: Buffer) => {
    const defaultConfig = createDefaultConfig(compiler);
    const serverConfigFunction = interopRequireConfig(
        requireFromString(buffer.toString(), fileName)
    );
    if (serverConfigFunction) {
        const serverConfig = serverConfigFunction();
        return {
            ...defaultConfig, 
            ...serverConfig
        };
    }
    return defaultConfig;
};
