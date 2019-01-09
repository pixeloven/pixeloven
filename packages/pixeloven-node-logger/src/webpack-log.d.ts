declare module "webpack-log" {
    export interface WebpackLogConfig {
        name?: string,
        level?: string,
        unique?: boolean
    }

    export interface WebpackLogInstance {
        error: (message: string) => void,
        info:(message: string) => void,
        warn: (message: string) => void,
    }

    export function delLogger(name: string): void;
    export default function log(config: WebpackLogConfig): WebpackLogInstance;
}