import chalk from "chalk";
import winston from "winston";

type Level = "error" | "info" | "success" | "warn";

type Message = string | string[];

interface CustomLevels extends winston.Logger {
    success: winston.LeveledLogMethod;
}

/**
 * @todo Add colors and what not
 * @todo replace the print function in the cli with this one
 * @todo can we replace storybooks logger? or make our looks similar
 * 
 * @todo we can extend the AbstractConfigSetLevels and others for specific functionality
 * @todo we want our logger to look good!
 */
const customConsoleFormat = winston.format.printf(info => {
    const getColor = () => {
        switch(info.level) {
            case "error":
                return chalk.red
            case "info":
                return chalk.blue
            case "success":
                return chalk.green
            case "warn":
                return chalk.yellow
        }
        return chalk.white
    };
    const color = getColor();
    return `${color(info.level.toUpperCase())}: ${info.meta.timestamp} ${
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
        warn: 3,
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata({ key: "meta" }),
                customConsoleFormat,
            ),
            level: "warn"
        }),
    ],
};

/**
 * Creates a log instance
 */
const loggerInstance = winston.createLogger(loggerOptions) as CustomLevels;

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

/**
 * Simple wrapper for winston
 */
const Logger = {
    error: (msg: Message) => log("error", msg),
    info: (msg: Message) => log("info", msg),
    success: (msg: Message) => log("success", msg),
    warn: (msg: Message) => log("warn", msg),

    /**
     * @description Helpers for testing
     */
    getInstance: () => loggerInstance,
};

export default Logger;
