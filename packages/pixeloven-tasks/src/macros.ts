import { env } from "@pixeloven/env";
import path from "path";
import url from "url";

/**
 * Default Constants
 */
const DEFAULT_PUBLIC_PATH = "/";
const DEFAULT_HOST = "localhost";
const DEFAULT_PROTOCOL = "http";
const DEFAULT_PORT = "8080";

/**
 * ENV Constants
 */
const PUBLIC_PATH = env.config("PUBLIC_URL", DEFAULT_PUBLIC_PATH);
const HOST = env.config("HOST", DEFAULT_HOST);
const PROTOCOL = env.config("PROTOCOL", DEFAULT_PROTOCOL);
const PORT = env.config("PORT", DEFAULT_PORT);

const normalizeUrl = (item: string) => item.replace(/([^:]\/)\/+/g, "$1");

/**
 * Returns default url
 * @returns string
 */
export const getDefaultUrl = () => normalizeUrl(`${DEFAULT_PROTOCOL}://${DEFAULT_HOST}:${DEFAULT_PORT}/${DEFAULT_PUBLIC_PATH}/`);

/**
 * Returns base url
 * @returns string
 */
export const getBaseUrl = () => normalizeUrl(`${PROTOCOL}://${HOST}:${PORT}/${PUBLIC_PATH}`);

/**
 * Get Base Url
 * @returns Url
 */
export const getUrlObject = (item: string) => url.parse(item);

/**
 * Returns public path
 * @returns string
 */
export const getPublicPath = () => path.normalize(`${PUBLIC_PATH}/`);

/**
 * Returns HMR path
 */
export const getHMRPath = () => path.normalize(`${PUBLIC_PATH}/__webpack_hmr`);

/**
 * Returns HOST
 * @returns number
 */
export const getHost = () => {
    const baseUrl = getBaseUrl();
    const parsedUrl = getUrlObject(baseUrl);
    return parsedUrl.hostname || HOST
}

/**
 * Returns PORT as a numeric
 * @returns number
 */
export const getPort = () => parseInt(PORT, 10);
