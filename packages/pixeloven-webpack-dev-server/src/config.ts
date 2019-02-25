import { env, Machine, Protocol } from "@pixeloven/env";

export interface Config {
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
const DEFAULT_MACHINE = "host";

export const createConfig = () => {
    /**
     * Initialize env vars
     */
    env.load();

    /**
     * Set test environment
     */
    env.define("BABEL_ENV", "development");
    env.define("NODE_ENV", "development");

    /**
     * ENV file Constants
     */
    const PUBLIC_PATH = env.config("PUBLIC_URL", DEFAULT_PUBLIC_PATH);
    const HOST = env.config("HOST", DEFAULT_HOST);
    const PROTOCOL = env.config("PROTOCOL", DEFAULT_PROTOCOL) as Protocol;
    const PORT = env.config("PORT", DEFAULT_PORT);
    const MACHINE = env.config("MACHINE", DEFAULT_MACHINE) as Machine;

    const server: Config = {
        host: HOST,
        machine: MACHINE,
        path: PUBLIC_PATH,
        port: parseInt(PORT, 10),
        protocol: PROTOCOL,
    };
    return server;
};
