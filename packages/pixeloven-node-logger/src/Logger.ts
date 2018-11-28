import log from "webpack-log";
const logger = log({ name: "core" });

export type Message = string | string[];
export type Level = "info" | "warn" | "error";

/**
 * Logs a message as a specific
 * @param message
 * @param level
 */
const messenger = (message: Message, level: Level): void => {
    if (Array.isArray(message)) {
        message.map((item: string) => {
            logger[level](item);
        });
    } else {
        logger[level](message);
    }
};

/**
 * Simple wrapper for webpack-log
 * @todo Add a success log state
 */
export const Logger = {
    error: (message: Message): void => messenger(message, "error"),
    info: (message: Message): void => messenger(message, "info"),
    warn: (message: Message): void => messenger(message, "warn"),
};

export default Logger;
