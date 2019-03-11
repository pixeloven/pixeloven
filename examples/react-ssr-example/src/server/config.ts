import { config as sharedConfig, Config as SharedConfig } from "@shared/config";

/**
 * General configuration for server
 */
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "https";
const ENVIRONMENT = process.env.NODE_ENV || "production";

export interface Config extends SharedConfig {
    environment: string;
    server: {
        host: string;
        port: number;
        protocol: string;
    };
}

export const config: Config = {
    ...sharedConfig,
    environment: ENVIRONMENT,
    server: {
        host: HOST,
        port: parseInt(PORT, 10),
        protocol: PROTOCOL,
    },
};
