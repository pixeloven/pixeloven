/**
 * General configuration for server
 */
const DOMAIN = process.env.DOMAIN || "pixeloven.com";
const ENVIRONMENT = process.env.NODE_ENV || "production";
const MACHINE = process.env.MACHINE || "host";
const TARGET = process.env.TARGET || "web";

export interface Config {
    domain: string;
    environment: string;
    machine: string;
    target: string;
}

export const config: Config = {
    domain: DOMAIN,
    environment: ENVIRONMENT,
    machine: MACHINE,
    target: TARGET,
};
