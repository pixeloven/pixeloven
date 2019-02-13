import { spawnBin } from "@pixeloven/core";

export type RunBinFunction = (cmd: string, args?: string[]) => number;

export default (cmd: string, args: string[] = []) => {
    console.log(`${cmd} ${args.join(" ")}`);
    const result = spawnBin(cmd, args);
    return result.status;
};
