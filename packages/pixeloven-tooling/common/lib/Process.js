const { spawnSync } = require("child_process");

/**
 * Break up arguments in a digestible format
 */
function getParameters(argv) {
    const args = [];
    const options = {};
    argv.slice(2, argv.length).forEach(arg => {
        // Long form options
        if (arg.slice(0,2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2,longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            options[longArgFlag] = longArgValue;
        }
        // Short hand boolean flags
        else if (arg[0] === '-') {
            const flags = arg.slice(1,arg.length).split('');
            flags.forEach(flag => {
                options[flag] = true;
            });
        } else {
            args.push(arg)
        }
    });
    return {args, options, raw: argv};
}

async function run(cmd, args = []) {
    const result = spawnSync(cmd, args, {
        detached: true,
        stdio: "inherit" 
    });
    return result.status;
}

module.exports = {
    getParameters,
    run
}