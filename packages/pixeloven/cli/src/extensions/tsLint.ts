import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const tsLintFileName = "tslint.json";

export default (context: PixelOvenToolbox) => {
    async function tsLint(args: string[]) {
        const { print, pixelOven } = context;
        const tsLintPath = resolvePath(tsLintFileName, false);
        let tslintArgs = ["tslint", "-t", "codeFrame"];
        if (tsLintPath) {
            tslintArgs = tslintArgs.concat(["--config", tsLintPath, ...args]);
        } else {
            tslintArgs = tslintArgs.concat(args);
            print.warning(
                `Unable to find "${tsLintPath}" reverting to default configuration`,
            );
        }
        const results = await pixelOven.run(tslintArgs);
        return results;
    }
    context.tsLint = tsLint;
};
