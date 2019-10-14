export enum Mode {
    development = "development",
    production = "production",
}

export enum Name {
    client = "client",
    server = "server",
}

export enum Target{
    web = "web",
    node = "node"
}

export interface UtilOptions {
    mode: Mode | string,
    name: Name | string,
    target: Target | string,
}