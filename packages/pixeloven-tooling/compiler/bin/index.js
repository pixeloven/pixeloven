#!/usr/bin/env node
const {
    FileSystem,
    Logger,
    Process
} = require("@pixeloven-tooling/common");

const tsConfigJson = "tsconfig.json";

/**
 * Compiler for PixelOven workflow
 * @todo https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function - should do this for both cli compilers
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
            Logger.info(`compiler ${firstArg}`, `found configuration ${configPath}`);
        } else {
            Logger.warn(`compiler ${firstArg}`, `could not find configuration file ${fileName} in current working directory`);
        }
        return configPath;
    }

    switch(firstArg) {
        case "tsx":
        case "ts": {
            params.raw.shift()
            const configPath = config(tsConfigJson);
            statusCode = await Process.run("tsc", ["--pretty", "--project", configPath, ...params.raw]);
            break;
        }
        default: {
            statusCode = 1;
            Logger.error(`compiler ${firstArg}`, `cmd does not exist`);
            break;
        }
    }
    if (statusCode === 0) {
        Logger.success(`compiler ${firstArg}`, "completed");
    } else {
        Logger.error(`compiler ${firstArg}`, `exited with status code ${statusCode}`);
    }
    proc.exit(statusCode);
}

main(process);
