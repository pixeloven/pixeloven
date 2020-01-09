#!/usr/bin/env node
const {
    FileSystem,
    Logger,
    Process
} = require("@pixeloven-tooling/common");

const tsLintJson = "tslint.json";
const styleLintJson = "stylelint.json";

/**
 * Build preparation for publishing
 * @param {*} argv 
 */
async function main(proc) {
    const cwd = proc.cwd();

    let statusCode = 0;
    const params = Process.getParameters(proc.argv);
    /**
     * @todo Do these scripts have a standalone mode we can use instead of forking the process?
     * @todo How can we forward options?
     */
    const firstArg = params.args.shift();
    switch(firstArg) {
        case "tsx":
        case "ts": {
            const configPath = FileSystem.getPath(`${cwd}/${tsLintJson}`);
            if (configPath) {
                Logger.info("ts", `found configuration ${configPath}`);
            } else {
                Logger.warn("ts", `could not find configuration file ${tsLintJson} in current working directory`);
            }
            statusCode = await Process.run("tslint", ["-t", "codeFrame", "--config", configPath, ...params.args]);
            break;
        }
        case "scss": {
            const configPath = FileSystem.getPath(`${cwd}/${styleLintJson}`);
            if (configPath) {
                Logger.info("scss", `found configuration ${configPath}`);
            } else {
                Logger.warn("scss", `could not find configuration file ${styleLintJson} in current working directory`);
            }
            statusCode = await Process.run("stylelint", ["--syntax", "scss", "--config", configPath, ...params.args]);
            break;
        }
    }
    if (statusCode === 0) {
        Logger.success(firstArg, "completed");
    } else {
        Logger.error(firstArg, `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
