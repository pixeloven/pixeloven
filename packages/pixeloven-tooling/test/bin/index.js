#!/usr/bin/env node
const {
    FileSystem,
    Logger,
    Process
} = require("@pixeloven-tooling/common");

const jestJson = "jest.json";

/**
 * Test runner for PixelOven workflow
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
            Logger.info(`test`, `found configuration ${configPath}`);
        } else {
            Logger.warn(`test`, `could not find configuration file ${fileName} in current working directory`);
        }
        return configPath;
    }

    const configPath = config(jestJson);
    statusCode = await Process.run("jest", ["--config", configPath, ...params.raw]);
    if (statusCode === 0) {
        Logger.success(`test`, "completed");
    } else {
        Logger.error(`test`, `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
