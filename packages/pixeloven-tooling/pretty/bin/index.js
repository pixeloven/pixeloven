#!/usr/bin/env node
const {
    FileSystem,
    Logger,
    Process
} = require("@pixeloven-tooling/common");

const prettierJson = "prettier.json";

/**
 * Compiler for PixelOven workflow
 * @param {*} argv 
 */
async function main(proc) {
    let statusCode = 0;
    const params = Process.getParameters(proc.argv);
    
    function config(fileName) {
        const cwd = proc.cwd();
        const configPath = FileSystem.getPath(`${cwd}/${fileName}`);
        if (configPath) {
            Logger.info("pretty", `found configuration ${configPath}`);
        } else {
            Logger.warn("pretty", `could not find configuration file ${fileName} in current working directory`);
        }
        return configPath;
    }
    const configPath = config(prettierJson);
    statusCode = await Process.run("prettier", ["--write", "--config", configPath, ...params.args]);

    if (statusCode === 0) {
        Logger.success("pretty", "completed");
    } else {
        Logger.error("pretty", `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
