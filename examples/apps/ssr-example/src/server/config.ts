import {config as sharedConfig, Config as SharedConfig} from "@shared/config";

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

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "http";
const NODE_ENV = process.env.NODE_ENV || "development";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

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
