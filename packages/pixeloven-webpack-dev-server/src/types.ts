export enum Protocol {
    http = "http",
    https = "https",
}

export interface Config {
    host: string;
    port: number;
    protocol: Protocol;
    path: string;
    poll: number | boolean;
}
