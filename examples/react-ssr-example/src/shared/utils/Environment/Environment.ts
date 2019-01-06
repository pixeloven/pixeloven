import { Config } from "@shared/config";

export class Environment {
    private config: Config;

    constructor(configuration: Config) {
        this.config = configuration;
    }

    public get isDocker(): boolean {
        return this.config.machine === "docker";
    }

    public get isServer(): boolean {
        return this.config.target === "node";
    }
}
