import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox, TsLintExtension } from "../types";

const fileName = "tslint.json";

export default (context: PixelOvenToolbox) => {
    const tsLint: TsLintExtension = async (args: string[]) => {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        if (configPath) {
            return pixelOven.run(
                ["tslint", "-t", "codeFrame", "--config", configPath].concat(
                    args,
                ),
            );
        }
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
        return pixelOven.run(["tslint", "-t", "codeFrame"].concat(args));
    };
    context.tsLint = tsLint;
};
