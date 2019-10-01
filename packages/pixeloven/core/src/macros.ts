import { FileNotFoundException } from "@pixeloven/exceptions";
import { SpawnSyncReturns } from "child_process";
import spawn from "cross-spawn";
import fs from "fs-extra";
import path from "path";

/**
 * Simple wrapper for process exit
 */
export const exit = process.exit;

/**
 * Simple wrapper for process exit
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

/**
 * Spawn yarn cmd
 * @param name
 * @param args
 */
export const spawnBin = (name: string, args: string[] = []) => {
    const yarnArgs: string[] = [];
    const calling = yarnArgs.concat(args);
    return spawn.sync(name, calling, {
        stdio: "inherit",
    });
};

/**
 * Check signal returned by execution and close process
 * @param result
 * @todo should use the core logger here
 */
export const spawnComplete = (result: SpawnSyncReturns<Buffer>) => {
    if (result.signal && result.status) {
        exit(result.status);
    } else {
        exit(1);
    }
};
