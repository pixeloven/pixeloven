import fs from "fs";
import path from "path";

/**
 * Normalize a url
 * @param item
 */
export const normalizeUrl = (item: string) =>
    item.replace(/([^:]\/)\/+/g, "$1");

/**
 * Returns client code path
 */
export const optionsFilePath = path.resolve(
    fs.realpathSync(process.cwd()),
    "pixelOven.js",
);
export const hasOptionsFile = fs.existsSync(optionsFilePath);

/**
 * Require options file
 */
export const requireOptions = () => {
    return require(optionsFilePath);
};
