import { config as sharedConfig, Config as SharedConfig } from "@shared/config";

export interface Environment {
    host: string;
    node: string;
}

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config extends SharedConfig {
    environment: Environment;
    name: string;
    publicPath: string;
    server: Server;
    target: string;
}

/**
 * General configuration for server
 * @todo This all should be server config and be exposed to the client through the store if needed
 */
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "https";
const NODE_ENV = process.env.NODE_ENV || "production";
const ENVIRONMENT = process.env.ENVIRONMENT || "production";

/**
 * @todo CA-543 Remove machine config and set to environment.host
 * @todo CA-543 Should set these in the docker container instead of via a .env file. First need to update the CLI
 *
 * @prop environment.host prod is meant to show the specific host machine we are running on.
 * @prop environment.node prod could mean any standard non development server build. This is not tied to a specific host.
 */
export const config: Config = {
    ...sharedConfig,
    environment: {
        host: ENVIRONMENT,
        node: NODE_ENV,
    },
    server: {
        host: HOST,
        port: parseInt(PORT, 10),
        protocol: PROTOCOL,
    },
};
