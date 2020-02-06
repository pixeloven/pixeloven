import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const tsLintFileName = "tslint.json";
const tsConfigFileName = "tsconfig.json";

export default (context: PixelOvenToolbox) => {
    async function tsLint(args: string[]) {
        const { print, pixelOven } = context;
        const tsLintPath = resolvePath(tsLintFileName, false);
        const tsConfigPath = resolvePath(tsConfigFileName, false);
        let tslintArgs = ["tslint", "-t", "codeFrame"];
        if (tsLintPath) {
            if (tsConfigPath) {
                tslintArgs = tslintArgs.concat([
                    "--config",
                    tsLintPath,
                    "--project",
                    tsConfigPath,
                    ...args,
                ]);
            } else {
                tslintArgs = tslintArgs.concat([
                    "--config",
                    tsLintPath,
                    ...args,
                ]);
            }
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
