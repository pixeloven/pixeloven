import { createOrEmptyDir, handleError, resolvePath } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import fs from "fs-extra";
import ghpages from "gh-pages";
import path from "path";

/**
 * Resolves directory
 * @todo Should move this into core
 * @param relativePath
 */
const resolveDir = (relativePath: string) => {
    const packagePath = resolvePath(relativePath);
    const stat = fs.statSync(packagePath);
    if (stat && stat.isDirectory()) {
        return packagePath;
    } else {
        throw new Error("Path is not a directory.");
    }
}

/**
 * Copies docs to destination
 * @param containerName 
 * @param relativePath 
 */
const copyDocs = (containerName: string, packageName: string) => {
    try {
        const relativeDocsPath = path.join(containerName, packageName, "docs");
        const absoluteSourcePath = resolveDir(relativeDocsPath);
        const relativeDestPath = path.join("docs", relativeDocsPath);
        const absoluteDestPath = resolvePath(relativeDestPath, false);
        fs.copySync(absoluteSourcePath, absoluteDestPath);
        logger.info(`Copied: ${absoluteSourcePath}`);
    } catch(error) {
        if (error && error.message) {
            logger.warn(error.message);
        }
    }
}

/**
 * Publish dist files
 * @todo Make docs directory configurable through argv
 * @todo if argv is empty we should print usage here
 * @todo need to support the creation of an index page
 * @todo gh-pages might not support index files with underscores
 */
const main = (argv: string[]) => {
    try {
        const scriptArgs = argv.slice(2);

        logger.info("Creating global docs directory");
        createOrEmptyDir("docs");

        scriptArgs.forEach((containerName) =>{
            logger.info(`Resolving ${containerName}`);
            const examples = fs.readdirSync(containerName)
            examples.forEach((packageName) => copyDocs(containerName, packageName));
        });
        ghpages.publish("docs", handleError);
    } catch(error) {
        handleError(error);
    }
};

export default main;