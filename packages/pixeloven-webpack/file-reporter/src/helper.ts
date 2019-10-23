import chalk from "chalk";
import filesize from "filesize";
import fs from "fs";
import gzipSize from "gzip-size";
import recursive from "recursive-readdir";

import { FileSizeMap, FileSizes } from "./types";

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
export function getDifferenceLabel(currentSize: number, previousSize: number) {
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

export function measureFileSizes(root: string) {
    return new Promise<FileSizes>((resolve, reject) => {
        recursive(root, (err, fileNames) => {
            if (err) {
                reject(err);
            }
            const sizes: FileSizeMap = new Map();
            if (!err && fileNames) {
                const filteredFileNames = fileNames.filter(canReadAsset);
                for (const fileName of filteredFileNames) {
                    const contents = fs.readFileSync(fileName);
                    const key = removeFileNameHash(root, fileName);
                    sizes.set(key, gzipSize.sync(contents));
                }
            }
            resolve({
                root,
                sizes,
            });
        });
    });
}
