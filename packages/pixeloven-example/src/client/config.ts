export interface Config {
    environment: string;
    basePath: string;
}

/**
 * Define general config
 * @description Process env is provided in a very limited capacity for the client
 */
export const config: Config = {
    basePath: process.env.PUBLIC_URL || "/",
    environment: process.env.NODE_ENV || "production",
};
