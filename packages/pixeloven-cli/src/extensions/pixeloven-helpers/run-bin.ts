import { spawnBin } from "@pixeloven/core";

export type RunBinFunction = (cmd: string, args?: string[]) => number;

export default (cmd: string, args: string[] = []) => {
    const result = spawnBin(cmd, args);
    return result.status;
}