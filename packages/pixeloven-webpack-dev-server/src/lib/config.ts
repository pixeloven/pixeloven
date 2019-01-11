import { env } from "@pixeloven/env";

/**
 * Default Constants
 */
const DEFAULT_PUBLIC_PATH = "/";
const DEFAULT_HOST = "localhost";
const DEFAULT_PROTOCOL = "http";
const DEFAULT_PORT = "8080";
const DEFAULT_ENVIRONMENT = "development";
const DEFAULT_LOG_LEVEL = "info";
const DEFAULT_MACHINE = "host";
/**
 * ENV Constants
 */

const ENVIRONMENT = env.config("NODE_ENV", DEFAULT_ENVIRONMENT);
const PUBLIC_PATH = env.config("PUBLIC_URL", DEFAULT_PUBLIC_PATH);
const HOST = env.config("HOST", DEFAULT_HOST);
const PROTOCOL = env.config("PROTOCOL", DEFAULT_PROTOCOL);
const PORT = env.config("PORT", DEFAULT_PORT);
const LOG_LEVEL = env.config("LOG_LEVEL", DEFAULT_LOG_LEVEL);
const MACHINE = env.config("MACHINE", DEFAULT_MACHINE);

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config {
    environment: string;
    logLevel: string;
    machine: string;
    publicPath: string;
    server: Server;
}

const server: Server = {
    host: HOST,
    port: parseInt(PORT, 10),
    protocol: PROTOCOL,
};

export const config: Config = {
    environment: ENVIRONMENT,
    logLevel: LOG_LEVEL,
    machine: MACHINE,
    publicPath: PUBLIC_PATH,
    server,
};
