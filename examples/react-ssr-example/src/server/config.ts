import { config as sharedConfig, Config as SharedConfig } from "@shared/config";

/**
 * General configuration for server
 * @todo Need to validate these .env... @pixeloven/env could change roles into this?
 *
 * @todo we should set these at runtime by the CLI... and in prod we need to make sure these are set in docker, ansible etc
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
