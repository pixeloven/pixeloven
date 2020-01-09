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
    console.log(params);
    proc.exit();
    const firstArg = params.args.shift();
    
    function config(fileName) {
        const cwd = proc.cwd();
        const configPath = FileSystem.getPath(`${cwd}/${fileName}`);
        if (configPath) {
            Logger.info(`test ${firstArg}`, `found configuration ${configPath}`);
        } else {
            Logger.warn(`test ${firstArg}`, `could not find configuration file ${fileName} in current working directory`);
        }
        return configPath;
    }

    const configPath = config(jestJson);
    if (params.options.watch) {
        statusCode = await Process.run("jest", ["--watch", "--config", configPath, ...params.args]);
    } else {
        statusCode = await Process.run("jest", ["--config", configPath, ...params.args]);
    }
    if (statusCode === 0) {
        Logger.success(`test ${firstArg}`, "completed");
    } else {
        Logger.error(`test ${firstArg}`, `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
