import { FileNotFoundException } from "@pixeloven/exceptions";
import { SpawnSyncReturns } from "child_process";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";
import { logger } from "./libraries";

/**
 * Simple wrapper for process exit
 */
export const exit = process.exit;

/**
 * Handle errors
 * @param error
 */
export const handleError = (error: Error) => {
    if (error.message) {
        logger.error(error.message);
    }
    if (error.stack) {
        logger.error(error.stack);
    }
    exit(1);
}

/**
 * Resolve relative path
 * @param relativePath
 * @param strict if true returns
 */
export const resolvePath = (
    relativePath: string,
    strict: boolean = true,
): string => {
    const absolutePath = path.resolve(
        fs.realpathSync(process.cwd()),
        relativePath,
    );
    if (strict && !fs.existsSync(absolutePath)) {
        throw new FileNotFoundException(
            `No such file or directory ${absolutePath}.`,
        );
    }
    return absolutePath;
}

/**
 * Sleep application for a given time
 * @param milliseconds
 */
export const sleep = (milliseconds: number) => {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

/**
 * Spawn yarn cmd
 * @param name
 * @param args
 */
export const spawnYarn = (name: string, args: string[] = []) => {
    const yarnArgs: string[] = [];
    const calling = yarnArgs.concat(name).concat(args);
    return spawn.sync("yarn", calling, {
        stdio: "inherit",
    });
};

/**
 * Check signal returned by execution and close process
 * @param result
 * @todo should use the core logger here
 */
export const spawnComplete = (result: SpawnSyncReturns<Buffer>) => {
    if (result.signal) {
        if (result.signal === "SIGKILL") {
            console.error(
                "Process exited too early. " +
                    "This probably means the system ran out of memory or someone called " +
                    "`kill -9` on the process.",
            );
        } else if (result.signal === "SIGTERM") {
            console.error(
                "Process exited too early. " +
                    "Someone might have called `kill` or `killall`, or the system could " +
                    "be shutting down.",
            );
        }
        exit(1);
    } else {
        exit(result.status);
    }
};