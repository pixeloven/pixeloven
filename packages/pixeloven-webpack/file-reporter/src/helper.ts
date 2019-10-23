import { logger } from "@pixeloven-core/logger";
import chalk from "chalk";
import filesize from "filesize";
import fs from "fs";
import gzipSize from "gzip-size";
import path from "path";
import recursive from "recursive-readdir";
import stripAnsi from "strip-ansi";
import { Stats } from "webpack";

import { FileSizeMap, FileSizeStats } from "./types";

const FIFTY_KILOBYTES = 1024 * 50;

function canReadAsset(asset: string) {
    return /\.(js|css)$/.test(asset);
}

function removeFileNameHash(buildFolder: string, fileName: string) {
    return fileName
        .replace(buildFolder, "")
        .replace(/\\/g, "/")
        .replace(
            /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
            (match, p1, p2, p3, p4) => p1 + p4,
        );
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize: number, previousSize: number) {
    const difference = currentSize - previousSize;
    const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
    if (difference >= FIFTY_KILOBYTES) {
        return chalk.red("+" + fileSize);
    } else if (difference < FIFTY_KILOBYTES && difference > 0) {
        return chalk.yellow("+" + fileSize);
    } else if (difference < 0) {
        return chalk.green("" + fileSize);
    } else {
        return "";
    }
}

function measureFileSizesBeforeBuild(root: string) {
    return new Promise<FileSizeMap>((resolve, reject) => {
        recursive(root, (err, fileNames) => {
            if (err) {
                reject(err);
            }
            const sizes: number[] = [];
            if (!err && fileNames) {
                const filteredFileNames = fileNames.filter(canReadAsset);
                for (const fileName of filteredFileNames) {
                    const contents = fs.readFileSync(fileName);
                    const key = removeFileNameHash(root, fileName);
                    sizes[key] = gzipSize.sync(contents);
                }
            }
            resolve({
                root,
                sizes,
            });
        });
    });
}

/**
 * @todo This should be split up. printCurrentBuild, printPreviousBuild compareBuilds
 *
 * @param webpackStats
 * @param previousSizeMap
 * @param buildFolder
 * @param maxBundleGzipSize
 * @param maxChunkGzipSize
 */
function printFileSizesAfterBuild(
    webpackStats: Stats[] | Stats,
    previousSizeMap: FileSizeMap,
    buildFolder: string,
    maxBundleGzipSize: number,
    maxChunkGzipSize: number,
) {
    const root = previousSizeMap.root;
    const sizes = previousSizeMap.sizes;
    const collection = Array.isArray(webpackStats)
        ? webpackStats
        : [webpackStats];
    const assetFileStats: FileSizeStats[][] = [];
    for (const item of collection) {
        const statsJson = item.toJson({ all: false, assets: true });
        if (statsJson && statsJson.assets) {
            const fileStats = statsJson.assets
                .filter(asset => canReadAsset(asset.name))
                .map(asset => {
                    const fileContents = fs.readFileSync(
                        path.join(root, asset.name),
                    );
                    const size = gzipSize.sync(fileContents);
                    const previousSize =
                        sizes[removeFileNameHash(root, asset.name)];
                    const difference = getDifferenceLabel(size, previousSize);
                    return {
                        folder: path.join(
                            path.basename(buildFolder),
                            path.dirname(asset.name),
                        ),
                        name: path.basename(asset.name),
                        size,
                        sizeLabel:
                            filesize(size) +
                            (difference ? " (" + difference + ")" : ""),
                    };
                });
            assetFileStats.push(fileStats);
        }
    }

    const flatFileStats = assetFileStats
        .reduce((single, all) => all.concat(single), [])
        .sort((a, b) => b.size - a.size);
    /* tslint:disable no-null-keyword */
    const longestSizeLabelLength = Math.max.apply(
        null,
        flatFileStats.map(a => stripAnsi(a.sizeLabel).length),
    );
    /* tslint:enable no-null-keyword */
    let suggestBundleSplitting = false;
    flatFileStats.forEach(asset => {
        let sizeLabel = asset.sizeLabel;
        const sizeLength = stripAnsi(sizeLabel).length;
        if (sizeLength < longestSizeLabelLength) {
            const rightPadding = " ".repeat(
                longestSizeLabelLength - sizeLength,
            );
            sizeLabel += rightPadding;
        }
        const isMainBundle = asset.name.indexOf("main.") === 0;
        const maxRecommendedSize = isMainBundle
            ? maxBundleGzipSize
            : maxChunkGzipSize;
        const isLarge = maxRecommendedSize && asset.size > maxRecommendedSize;
        if (isLarge && path.extname(asset.name) === ".js") {
            suggestBundleSplitting = true;
        }
        logger.info(
            "  " +
                (isLarge ? chalk.yellow(sizeLabel) : sizeLabel) +
                "  " +
                chalk.dim(asset.folder + path.sep) +
                chalk.cyan(asset.name),
        );
    });
    if (suggestBundleSplitting) {
        logger.info(
            chalk.yellow(
                "The bundle size is significantly larger than recommended.",
            ),
        );
        logger.info(
            chalk.yellow(
                "Consider reducing it with code splitting: https://goo.gl/9VhYWB",
            ),
        );
        logger.info(
            chalk.yellow(
                "You can also analyze the project dependencies: https://goo.gl/LeUzfb",
            ),
        );
    }
}

export { measureFileSizesBeforeBuild, printFileSizesAfterBuild };
