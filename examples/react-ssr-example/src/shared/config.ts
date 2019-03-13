/**
 * General configuration by webpack.
 * @description These values are the only values that get parsed out by webpack.
 *              Example: process.env.NAME might become "client" or "server"
 */
const NAME = process.env.NAME || "client";
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/example/";
const TARGET = process.env.TARGET || "web";

export interface Config {
    name: string;
    publicPath: string;
    target: string;
}

export const config: Config = {
    name: NAME,
    publicPath: PUBLIC_PATH,
    target: TARGET,
};
