/**
 * General configuration for server
 * @description Process env is provided in a very limited capacity for the client. Webpack parses "process.env" into string literals
 */
const BASE_PATH = process.env.PUBLIC_URL || "/";
const ENVIRONMENT = process.env.NODE_ENV || "production";

export interface Config {
    basePath: string;
    environment: string;
}

/**
 * Define general config
 */
export const config: Config = {
    environment: ENVIRONMENT,
    basePath: BASE_PATH,
};
