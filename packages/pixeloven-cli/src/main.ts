#!/usr/bin/env node
import { SpawnSyncReturns } from "child_process";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) => 
    index === "clean" 
    || index === "compile:ts"
    || index === "compile:clean"
    || index === "lint:ts"
    || index === "lint:scss"
    || index === "pretty"
    || index === "pretty:ts"
    || index === "pretty:scss"
    || index === "test"
    || index === "test:watch"
    || index === "test:clean"

/**
 * Load config file
 * @param file 
 * @return string
 * 
 * @todo Should add warning about which config is used.
 */
const loadConfig = (file: string): string => {
    const remoteConfig = path.resolve(process.cwd(), file);
    if (fs.existsSync(remoteConfig)) {
        return remoteConfig
    }
    return path.resolve(__dirname, file);
}

/**
 * Execute yarn cmd
 * @param name 
 * @param args 
 */
const execute = (name: string, args: string[]) => {
    const yarnArgs: string[] = [];
    const calling = yarnArgs
        .concat(path.resolve(__dirname, "../../node_modules/.bin/", name))
        .concat(args);
    return spawn.sync("yarn", calling, {
        stdio: "inherit",
    });
};

/**
 * Check signal returned by execution and close process
 * @param result 
 */
const complete = (result: SpawnSyncReturns<Buffer>) => {
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
        process.exit(1);
    } else {
        process.exit(result.status);
    }
};

/**
 * Configuration files
 */
const tsConfigFile = "tsconfig.json";
const tsLintFile = "tslint.json";
const prettyConfigFile = "prettierrc.json";
const jestConfigFile = "jestrc.json";
const stylelintConfigFile = "stylelintrc.json";

/**
 * Setup variables and execute
 * 
 * @todo Check for yarn before attempting to execute
 * @todo Show usage for scripts if not in index
 */
const scriptArgs = process.argv.slice(2);
const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
const scriptName = scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];

switch (scriptName) {
    case "clean": {
        const result = execute("rimraf", ["node_modules"]);
        complete(result);
        break;
    }
    case "compile:ts": {
        const config = loadConfig(tsConfigFile);
        const result = execute("tsc", ["--pretty", "--project", config]);
        complete(result);
        break;
    }
    case "compile:clean": {
        const result = execute("rimraf", ["dist", "docs"]);
        complete(result);
        break;
    }
    case "lint:ts": {
        const config = loadConfig(tsLintFile);
        const result = execute("tslint", ["-t", "codeFrame", "--config", config, "--project", "."]);
        complete(result);
        break;
    }
    case "lint:scss": {
        const config = loadConfig(stylelintConfigFile);
        const result = execute("stylelint", ["src/**/*.scss", "--syntax", "scss", "--config", config]);
        complete(result);
        break;
    }
    case "pretty": {
        const config = loadConfig(prettyConfigFile);
        const result = execute("prettier", ["src/**/*.{scss,ts,tsx}", "--write", "--config", config]);
        complete(result);
        break;
    }
    case "pretty:ts": {
        const config = loadConfig(tsLintFile);
        const result = execute("tslint", ["-t", "codeFrame", "--config", config, "--project", ".", "--fix"]);
        complete(result);
        break;
    }
    case "pretty:scss": {
        const config = loadConfig(tsLintFile);
        const result = execute("stylelint", ["src/**/*.scss", "--syntax", "scss", "--config", config, "--fix"]);
        complete(result);
        break;
    }
    case "test": {
        const config = loadConfig(jestConfigFile);
        const result = execute("jest", ["--color", "--coverage", "--env=jsdom", "--config", config]);
        complete(result);
        break;
    }
    case "test:watch": {
        const config = loadConfig(jestConfigFile);
        const result = execute("jest", ["--watch", "--env=jsdom", "--config", config]);
        complete(result);
        break;
    }
    case "test:clean": {
        const result = execute("rimraf", ["coverage"]);
        complete(result);
        break;
    }
    default:
        console.log(`Unknown usage ${scriptName}.`);
        break;
}
