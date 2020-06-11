const { Color, colorize } = require("./Colorize");

/**
 * Info logger
 * @param {String} context 
 * @param  {...String} msg 
 */
function info(context, ...msg) {
    const header = colorize(Color.FgBlue, "info");
    const tag = colorize(Color.Dim, context);
    console.info(header, tag, ...msg);
}

function error(context, ...msg) {
    const header = colorize(Color.FgRed, "error");
    const tag = colorize(Color.Dim, context);
    console.error(header, tag, ...msg);
}

function success(context, ...msg) {
    const header = colorize(Color.FgGreen, "success");
    const tag = colorize(Color.Dim, context);
    console.log(header, tag, ...msg);
}

function warn(context, ...msg) {
    const header = colorize(Color.FgYellow, "warn");
    const tag = colorize(Color.Dim, context);
    console.warn(header, tag, ...msg);
}

module.exports = {
    info,
    error,
    success,
    warn
}