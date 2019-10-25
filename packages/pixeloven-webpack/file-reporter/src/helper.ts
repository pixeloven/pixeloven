import chalk from "chalk";
import filesize from "filesize";
import fs from "fs";
import gzipSize from "gzip-size";
import recursive from "recursive-readdir";
import { Stats } from "webpack";

import { FileSizeMap, FileSizes, SimplifiedStats } from "./types";

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

export function getDifferenceLabel(currentSize: number, previousSize: number) {
    const difference = currentSize - previousSize;
    const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
    if (difference > 0) {
        return (
            chalk.dim("(") + chalk.redBright(`+${fileSize}`) + chalk.dim(")")
        );
    } else if (difference < 0) {
        return chalk.dim("(") + chalk.green(`${fileSize}`) + chalk.dim(")");
    }
    return chalk.dim(`(no change)`);
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

const friendlySyntaxErrorLabel = "Syntax error:";

function isLikelyASyntaxError(message: string) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

/**
 * @todo clean these rules up and make them more relevant to our env.
 *      This is a port of https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/formatWebpackMessages.js
 * @param message
 */
function formatMessage(message: string) {
    let lines = message.split("\n");

    // Strip Webpack-added headers off errors/warnings
    // https://github.com/webpack/webpack/blob/master/lib/ModuleError.js
    lines = lines.filter(line => !/Module [A-z ]+\(from/.test(line));

    // Transform parsing error into syntax error
    // TODO: move this to our ESLint formatter?
    lines = lines.map(line => {
        const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
            line,
        );
        if (!parsingError) {
            return line;
        }
        const [, errorLine, errorColumn, errorMessage] = parsingError;
        return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
    });

    message = lines.join("\n");
    // Smoosh syntax errors (commonly found in CSS)
    message = message.replace(
        /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
        `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
    );
    // Clean up export errors
    message = message.replace(
        /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$1' is not exported from '$2'.`,
    );
    message = message.replace(
        /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$2' does not contain a default export (imported as '$1').`,
    );
    message = message.replace(
        /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`,
    );
    lines = message.split("\n");

    // Remove leading newline
    if (lines.length > 2 && lines[1].trim() === "") {
        lines.splice(1, 1);
    }
    // Clean up file name
    lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, "$1");

    // Cleans up verbose "module not found" messages for files and packages.
    if (lines[1] && lines[1].indexOf("Module not found: ") === 0) {
        lines = [
            lines[0],
            lines[1]
                .replace("Error: ", "")
                .replace(
                    "Module not found: Cannot find file:",
                    "Cannot find file:",
                ),
        ];
    }

    // Add helpful message for users trying to use Sass for the first time
    if (lines[1] && lines[1].match(/Cannot find module.+node-sass/)) {
        lines[1] =
            "To import Sass files, you first need to install node-sass.\n";
        lines[1] +=
            "Run `npm install node-sass` or `yarn add node-sass` inside your workspace.";
    }

    lines[0] = chalk.inverse();

    message = lines.join("\n");
    // Internal stacks are generally useless so we strip them... with the
    // exception of stacks containing `webpack:` because they're normally
    // from user code generated by Webpack. For more information see
    // https://github.com/facebook/create-react-app/pull/1050
    message = message.replace(
        /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
        "",
    ); // at ... ...:x:y
    message = message.replace(/^\s*at\s<anonymous>(\n|$)/gm, ""); // at <anonymous>
    lines = message.split("\n");

    // Remove duplicated newlines
    lines = lines.filter(
        (line, index, arr) =>
            index === 0 ||
            line.trim() !== "" ||
            line.trim() !== arr[index - 1].trim(),
    );

    // Reassemble the message
    message = lines.join("\n");
    return message.trim();
}

export function formatWebpackMessages(json: Stats.ToJsonOutput) {
    const formattedErrors = json.errors.map((message: string) => {
        return formatMessage(message);
    });
    const formattedWarnings = json.warnings.map((message: string) => {
        return formatMessage(message);
    });
    const result: SimplifiedStats = {
        errors: formattedErrors,
        hash: json.hash,
        time: json.time,
        warnings: formattedWarnings,
    };
    if (result.errors.some(isLikelyASyntaxError)) {
        // If there are any syntax errors, show just them.
        result.errors = result.errors.filter(isLikelyASyntaxError);
    }
    return result;
}
