export enum Protocol {
    http = "http",
    https = "https",
}

export enum Machine {
    ci = "ci",
    docker = "docker",
    host = "host",
    virtual = "virtual",
}

export interface Config {
    host: string;
    port: number;
    protocol: Protocol;
    path: string;
    machine: Machine;
}
