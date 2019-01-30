/**
 * General configuration for server
 */
const BASE_URL = process.env.PUBLIC_URL || "/";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "https";
const ENVIRONMENT = process.env.NODE_ENV || "production";

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config {
    baseUrl: string;
    environment: string;
    server: Server;
}

const server: Server = {
    host: HOST,
    port: parseInt(PORT, 10),
    protocol: PROTOCOL,
};

export const config: Config = {
    baseUrl: BASE_URL,
    environment: ENVIRONMENT,
    server,
};
