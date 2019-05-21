import winston from "winston";

type Level = "error" | "info" | "warn";

type Message = string | string[];

/**
 * @todo Add colors and what not
 * @todo replace the print function in the cli with this one
 * @todo can we replace storybooks logger? or make our looks similar
 * 
 * @todo we can extend the AbstractConfigSetLevels and others for specific functionality
 * @todo we want our logger to look good!
 */
const customConsoleFormat = winston.format.printf(info => {
    return `${info.level.toUpperCase()}: ${info.meta.timestamp} ${
        info.message
    }`;
});

/**
 * Standard logger options shared by both our middleware and our logger endpoint
 */
const loggerOptions = {
    levels: {
        error: 0,
        info: 1,
        success: 2,
        warn: 3
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata({ key: "meta" }),
                customConsoleFormat,
            ),
        })
    ],
};

/**
 * Creates a log instance
 */
const loggerInstance = winston.createLogger(loggerOptions);

/**
 * Logs a message as a specific
 * @param message
 * @param level
 * 
 * @todo Add ability to log meta data
 */
function log(level: Level, msg: Message) {
    if (Array.isArray(msg)) {
        msg.map((item: string) => {
            loggerInstance[level](item);
        });
    } else {
        loggerInstance[level](msg);
    }
};

/**
 * Simple wrapper for winston
 * 
 * @todo Need to add success but it's not a given type for winston so we need to extend it.
 */
const Logger = {
    error: (msg: Message) => log("error", msg),
    info: (msg: Message) => log("info", msg),
    warn: (msg: Message) => log("warn", msg),

    /**
     * @description Helpers for testing
     */
    getInstance: () => loggerInstance
};

export default Logger;