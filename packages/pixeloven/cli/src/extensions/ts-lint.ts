import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const tsLintFileName = "tslint.json";
const tsConfigFileName = "tsconfig.json";

export default (context: PixelOvenToolbox) => {
    async function tsLint(args: string[]) {
        const { print, pixelOven } = context;
        const tsLintPath = resolvePath(tsLintFileName, false);
        const tsConfigPath = resolvePath(tsConfigFileName, false);
        const tslintArgs = ["tslint", "-t", "codeFrame"];
        if (tsLintPath) {
            if (tsConfigPath) {
                tslintArgs.concat([
                    "--config",
                    tsLintPath,
                    "--project",
                    tsConfigPath,
                    ...args,
                ]);
            } else {
                tslintArgs.concat(["--config", tsLintPath, ...args]);
            }
        } else {
            print.warning(
                `Unable to find "${tsLintPath}" reverting to default configuration`,
            );
            tslintArgs.concat(args);
        }
        return pixelOven.run(tslintArgs);
    }
    context.tsLint = tsLint;
};
