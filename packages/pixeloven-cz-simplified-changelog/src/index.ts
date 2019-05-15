/* tslint:disable no-any */
/**
 * https://github.com/commitizen/cz-conventional-changelog
 */
import engine from "./engine";
import { Options } from "./types";

import { configLoader } from "commitizen";

/**
 * @todo Remove and replace with our own version
 */
import conventionalCommitTypes from "conventional-commit-types";

const config = configLoader.load();
const defaultOptions: Options = {
    defaultBody: process.env.CZ_BODY || config.defaultBody,
    defaultScope: process.env.CZ_SCOPE || config.defaultScope,
    defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
    defaultType: process.env.CZ_TYPE || config.defaultType,
    maxHeaderWidth:
        (process.env.CZ_MAX_HEADER_WIDTH &&
            parseInt(process.env.CZ_MAX_HEADER_WIDTH, 10)) ||
        config.maxHeaderWidth ||
        100,
    maxLineWidth:
        (process.env.CZ_MAX_LINE_WIDTH &&
            parseInt(process.env.CZ_MAX_LINE_WIDTH, 10)) ||
        config.maxLineWidth ||
        100,
    types: conventionalCommitTypes.types,
};

/**
 * Load config if commit lint exists
 * @todo Re-write this to be a bit more robust
 * @param options
 */
function commitlintHandler(options: Options) {
    try {
        const commitlintLoad = require("@commitlint/load");
        commitlintLoad().then((clConfig: any) => {
            if (clConfig.rules) {
                const maxHeaderLengthRule = clConfig.rules["header-max-length"];
                if (
                    typeof maxHeaderLengthRule === "object" &&
                    maxHeaderLengthRule.length >= 3 &&
                    !process.env.CZ_MAX_HEADER_WIDTH &&
                    !config.maxHeaderWidth
                ) {
                    options.maxHeaderWidth = maxHeaderLengthRule[2];
                }
            }
        });
    } catch (err) {
        // Do nothing
    }
}

commitlintHandler(defaultOptions);

export default engine(defaultOptions);
