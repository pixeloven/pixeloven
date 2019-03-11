/**
 * General configuration for server
 */
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
const TARGET = process.env.TARGET || "web";

export interface Config {
    publicPath: string;
    target: string;
}

export const config: Config = {
    publicPath: PUBLIC_PATH,
    target: TARGET,
};
