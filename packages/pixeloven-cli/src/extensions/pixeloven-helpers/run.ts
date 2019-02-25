import { system } from "gluegun";

export interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type RunFunction = (args: string[]) => Promise<RunResponse>;

const run: RunFunction = (args: string[]) => {
    return system.spawn(args.join(" "));
};

export default run;
