import winston from "winston";
import Formatter from "./Formatter";
import { Level, Logger, Message } from "./types";

/**
 * Standard logger options shared by both our middleware and our logger endpoint
 */
const loggerOptions = {
    levels: {
        error: 0,
        info: 1,
        success: 2,
        warn: 3,
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata({ key: "meta" }),
                Formatter.console,
            ),
            level: "warn",
        }),
    ],
};

/**
 * Creates a log instance
 */
const loggerInstance = winston.createLogger(loggerOptions) as Logger;

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
            loggerInstance.log(level, item);
        });
    } else {
        loggerInstance.log(level, msg);
    }
}

export default {
    error: (msg: Message) => log("error", msg),
    info: (msg: Message) => log("info", msg),
    success: (msg: Message) => log("success", msg),
    warn: (msg: Message) => log("warn", msg),

    /**
     * @description Helpers for testing
     */
    getInstance: () => loggerInstance,
};
