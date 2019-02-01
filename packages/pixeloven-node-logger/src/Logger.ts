import log from "webpack-log";

export type Message = string | string[];
/**
 * @todo Need to support import { LogLevel } from "@pixeloven/env";
 */
export type Level = "error" | "info" | "warn";

export interface LoggerInstance {
    error: (message: Message) => void;
    info: (message: Message) => void;
    warn: (message: Message) => void;
}

/**
 * Log Instance name
 */
export const logInstanceName = "core";

/**
 * Create logger
 * @todo Eventually write my own logger instead of wrapping webpack-log
 */
export const logInstance = log({ name: logInstanceName });

/**
 * Logs a message as a specific
 * @param message
 * @param level
 */
const messenger = (message: Message, level: Level): void => {
    if (Array.isArray(message)) {
        message.map((item: string) => {
            logInstance[level](item);
        });
    } else {
        logInstance[level](message);
    }
};

/**
 * Simple wrapper for webpack-log
 * @todo Add a success log state
 */
const Logger: LoggerInstance = {
    error: (message: Message): void => messenger(message, "error"),
    info: (message: Message): void => messenger(message, "info"),
    warn: (message: Message): void => messenger(message, "warn"),
};

export default Logger;
