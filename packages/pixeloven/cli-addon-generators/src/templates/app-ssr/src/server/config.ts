export interface Environment {
    host: string;
    node: string;
}

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config {
    environment: Environment;
    name: string;
    publicPath: string;
    server: Server;
    target: string;
}

/**
 * General configuration by webpack.
 * @description These values are the only values that get parsed out by webpack.
 *              Example: process.env.NAME might become "client" or "server"
 */
const NAME = process.env.NAME || "client";
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
const TARGET = process.env.TARGET || "web";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "http";
const NODE_ENV = process.env.NODE_ENV || "development";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

export const config: Config = {
    environment: {
        host: ENVIRONMENT,
        node: NODE_ENV,
    },
    name: NAME,
    publicPath: PUBLIC_PATH,
    server: {
        host: HOST,
        port: parseInt(PORT, 10),
        protocol: PROTOCOL,
    },
    target: TARGET,
};
