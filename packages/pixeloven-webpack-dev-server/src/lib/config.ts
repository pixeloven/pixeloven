import { env, LogLevel, Machine, Protocol } from "@pixeloven/env";

/**
 * @todo unify with @pixeloven/env
 */
export interface Config {
    logLevel: LogLevel;
    host: string;
    port: number;
    protocol: Protocol;
    path: string;
    machine: Machine;
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

const server: Config = {
    host: HOST,
    logLevel: LOG_LEVEL,
    machine: MACHINE,
    path: PUBLIC_PATH,
    port: parseInt(PORT, 10),
    protocol: PROTOCOL,
}

export default server;
