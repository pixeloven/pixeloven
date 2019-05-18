import winston from "winston";

type Level = "error" | "info" | "warn";

type Message = string | string[];

/**
 * Standard logger options shared by both our middleware and our logger endpoint
 */
const loggerOptions = {
    transports: [
        new winston.transports.Console()
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