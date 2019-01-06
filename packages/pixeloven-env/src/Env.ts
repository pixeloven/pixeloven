import { NodeProcessException } from "@pixeloven/exceptions";
import dotenv from "dotenv";

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "silent"

export type Protocol = "http" | "https"

export type Environment = "development" | "production" | "test";

export type Machine = "ci" | "docker" | "host" | "virtual" | undefined;

export interface Environments {
    development?: object;
    production?: object;
    test?: object;
}

/**
 * Define required keys here
 */
export interface DefaultEnv extends NodeJS.ProcessEnv {
    BABEL_ENV: Environment;
    BUILD_PATH: string;
    DOMAIN: string;
    HOST: string;
    LOG_LEVEL: LogLevel;
    PORT: string;
    PROTOCOL: Protocol;
    PUBLIC_URL: string;
    MACHINE: Machine;
    NODE_ENV: Environment;
}

export class Env {
    /**
     * Default values for env
     */
    public static defaultValues: DefaultEnv = {
        BABEL_ENV: "production",
        BUILD_PATH: "dist",
        DOMAIN: "",
        HOST: "localhost",
        LOG_LEVEL: "silent",
        MACHINE: "host",
        NODE_ENV: "production",
        PORT: "8080",
        PROTOCOL: "http",
        PUBLIC_URL: "/",
    };

    /**
     * Get entire env, get by key or set by key
     * @description Values will always be read in as a string. All casting must happen afterward.
     * @param key
     * @param defaultValue
     */
    public static config(): NodeJS.ProcessEnv;
    public static config(key: string): string | undefined;
    public static config(key: string, defaultValue: string): string;
    public static config(
        key?: string,
        defaultValue?: string,
    ): NodeJS.ProcessEnv | string | undefined {
        if (key) {
            return process.env.hasOwnProperty(key)
                ? process.env[key]
                : defaultValue;
        }
        return process.env;
    }

    /**
     * Get current environment
     */
    public static get current(): Environment {
        return Env.config("NODE_ENV") as Environment;
    }

    /**
     * Set value on env
     * @param key
     * @param value
     */
    public static define(key: string, value: string): void {
        process.env[key] = value;
    }

    /**
     * Load from file for specific environment
     * @description Check env and default keys. This should ONLY be executed on the server (node) side.
     */
    public static load(environment?: Environment): void {
        if (!Env.process) {
            throw new NodeProcessException("Node process is undefined.");
        }
        dotenv.config();
        if (environment) {
            process.env = Object.assign({}, Env.defaultValues, process.env, {
                BABEL_ENV: environment,
                NODE_ENV: environment,
            });
        } else {
            process.env = Object.assign({}, Env.defaultValues, process.env);
        }
    }

    /**
     * Private variable for storing global process
     */
    private static proc: NodeJS.Process | undefined = process;

    /**
     * Return process
     * @return Process
     */
    public static get process(): NodeJS.Process | undefined {
        return Env.proc;
    }

    /**
     * Allows for the process to be overridden
     * @description This should rarely be used. It's main function is to facilitate testing.
     */
    public static set process(proc: NodeJS.Process | undefined) {
        Env.proc = proc;
    }
}

export default Env;
