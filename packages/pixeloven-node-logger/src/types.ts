import winston from "winston";

export type Level = "error" | "info" | "success" | "warn";

export type Message = string | string[];

export interface Logger extends winston.Logger {
    success: winston.LeveledLogMethod;
}