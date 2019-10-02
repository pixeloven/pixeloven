import { FileNotFoundException } from "@pixeloven-core/exceptions";
import fs from "fs-extra";
import path from "path";

/**
 * Simple wrapper for process exit
 */
export const exit = process.exit;

/**
 * Simple wrapper for process cwd()
 */
export const cwd = () => process.cwd();

/**
 * Resolve relative path
 * @param relativePath
 * @param strict if true returns
 */
export const resolvePath = (
    relativePath: string,
    strict: boolean = true,
): string => {
    const absolutePath = path.resolve(fs.realpathSync(cwd()), relativePath);
    if (strict && !fs.existsSync(absolutePath)) {
        throw new FileNotFoundException(
            `No such file or directory ${absolutePath}.`,
        );
    }
    return absolutePath;
};

/**
 * Create or empty existing directory
 * @param fullPath
 */
export const createOrEmptyDir = (fullPath: string) => {
    if (fs.existsSync(fullPath)) {
        fs.emptyDirSync(fullPath);
    } else {
        fs.mkdirSync(fullPath);
    }
};

/**
 * Normalize a url
 * @param item
 */
export const normalizeUrl = (item: string) =>
    item.replace(/([^:]\/)\/+/g, "$1");
