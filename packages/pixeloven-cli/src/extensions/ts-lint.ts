import { PixelOvenRunContext } from "../types";

export type TsLintExtension = (args?: string[]) => Promise<number>;

export default (context: PixelOvenRunContext) => {
    const tsLint = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "tslint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            print.info(`Configuration file found ${configPath}`);
            return pixeloven.runBin(
                "tslint",
                ["-t", "codeFrame", "--config", configPath].concat(args),
            );
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.runBin("tslint", ["-t", "codeFrame"].concat(args));
        }
    };
    context.tsLint = tsLint;
};
