import { RunResponse } from "@pixeloven/cli";
import { createOrEmptyDir, resolvePath } from "@pixeloven/core";
import { FileNotFoundException } from "@pixeloven/exceptions";
import fs from "fs-extra";
import ghpages from "gh-pages";
import path from "path";
import {
    AddonGhPagesRunContext,
    GhPagesExtension
} from "../types";

/**
 * Resolves directory
 * @todo Should move this into core or as a helper in CLI... or both
 * @param relativePath
 */
const resolveDir = (relativePath: string) => {
    const packagePath = resolvePath(relativePath);
    const stat = fs.statSync(packagePath);
    if (stat && stat.isDirectory()) {
        return packagePath;
    } else {
        throw new FileNotFoundException();
    }
};

/**
 * Copies docs to destination
 * @param containerName
 * @param relativePath
 */
const copyDocs = (containerName: string, packageName: string) => {
    const relativeDocsPath = path.join(containerName, packageName, "docs");
    const absoluteSourcePath = resolveDir(relativeDocsPath);
    const relativeDestPath = path.join("docs", relativeDocsPath);
    const absoluteDestPath = resolvePath(relativeDestPath, false);
    fs.copySync(absoluteSourcePath, absoluteDestPath);
    return {
        from: absoluteSourcePath,
        to: absoluteDestPath
    }
};

/**
 * Publish dist files
 * @todo Make docs directory configurable through argv
 * @todo if argv is empty we should print usage here
 * @todo need to support the creation of an index page
 * @todo gh-pages might not support index files with underscores
 * @todo Type docs should not include readme.md file
 *      docs
 *          -> types
 *          -> coverage
 *          -> index.html (simple static site created from README.md)
 * 
 * @todo Need to return a promise here
 */
export default (context: AddonGhPagesRunContext) => {
    const ghPages: GhPagesExtension = async (
        args: string[] = [],
    ) => {
        const { print } = context;
        /**
         * Handles error or success
         * @param err 
         */
        let results: RunResponse = {
            status: 0,
        };
        const handler = async (err?: Error) => {
            if (err) {
                print.error(err.message);
                results = {
                    error: err,
                    status: 1
                };
            }
        }
        try {
            print.info("Creating global docs directory");
            createOrEmptyDir("docs");
            args.forEach(containerName => {
                print.info(`Resolving ${containerName}`);
                const examples = fs.readdirSync(containerName);
                examples.forEach(packageName => {
                    const copied = copyDocs(containerName, packageName);
                    print.info(`${copied.from} => ${copied.to}`);
                });
            });
            ghpages.publish("docs", await handler);
        } catch (err) {
            await handler(err);
        }
        return results;
    };
    context.ghPages = ghPages;
};
