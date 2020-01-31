import { FileNotFoundException } from "@pixeloven-core/exceptions";
import fs from "fs-extra";
import path from "path";

/**
 * Simple wrapper for process cwd()
 */
export const cwd = () => process.cwd();

/**
 * Create or empty existing directory
 * @param fullPath
 */
export function createOrEmptyDir(fullPath: string) {
    if (fs.existsSync(fullPath)) {
        fs.emptyDirSync(fullPath);
    } else {
        fs.mkdirSync(fullPath);
    }
}

/**
 * Resolve relative path
 * @param relativePath
 * @param strict if true returns
 */
export function resolvePath(relativePath: string, strict: boolean = true) {
    const absolutePath = path.resolve(fs.realpathSync(cwd()), relativePath);
    if (strict && !fs.existsSync(absolutePath)) {
        throw new FileNotFoundException(
            `No such file or directory ${absolutePath}.`,
        );
    }
    return absolutePath;
}

/**
 * Resolves context of src directory
 */
export function resolveSourceRoot() {
    return path.resolve(cwd(), "./src");
}

/**
 * Resolves tsconfig path
 */
export function resolveTsConfig() {
    return path.resolve(cwd(), "./tsconfig.json");
}
