import { FileNotFoundException } from "@pixeloven-core/exceptions";
import fs from "fs-extra";
import path from "path";

/**
 * Simple wrapper for process cwd()
 * @todo MOVE TO A PROCESS ABSTRACTION LIBRARY
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
 * Resolves directory
 * @todo Should move this into core or as a helper in CLI... or both
 * @param relativePath
 */
export function resolveDir(relativePath: string) {
    const packagePath = resolvePath(relativePath);
    const stat = fs.statSync(packagePath);
    if (stat && stat.isDirectory()) {
        return packagePath;
    } else {
        throw new FileNotFoundException();
    }
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
