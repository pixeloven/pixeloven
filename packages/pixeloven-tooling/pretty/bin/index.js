#!/usr/bin/env node
const {
    FileSystem,
    Logger,
    Process
} = require("@pixeloven-tooling/common");

const prettierJson = "prettier.json";

/**
 * Build preparation for publishing
 * @param {*} argv 
 */
async function main(proc) {
    let statusCode = 0;
    const params = Process.getParameters(proc.argv);
    const firstArg = params.args.shift();
    
    function config(fileName) {
        const cwd = proc.cwd();
        const configPath = FileSystem.getPath(`${cwd}/${fileName}`);
        if (configPath) {
            Logger.info(`pretty ${firstArg}`, `found configuration ${configPath}`);
        } else {
            Logger.warn(`pretty ${firstArg}`, `could not find configuration file ${fileName} in current working directory`);
        }
        return configPath;
    }

    switch(firstArg) {
        case "scss":
        case "tsx":
        case "ts": {
            const configPath = config(prettierJson);
            statusCode = await Process.run("prettier", ["--write", "--config", configPath, ...params.args]);
            break;
        }
        default: {
            statusCode = 1;
            Logger.error(`pretty ${firstArg}`, `cmd does not exist`);
            break;
        }
    }
    if (statusCode === 0) {
        Logger.success(`pretty ${firstArg}`, "completed");
    } else {
        Logger.error(`pretty ${firstArg}`, `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
