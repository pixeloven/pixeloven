import { PixelOvenRunContext } from "../types";

export type TsLintExtension = (args?: string[]) => Promise<object>;

export default (context: PixelOvenRunContext) => {
    const tsLint = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "tslint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            return pixeloven.run(["tslint", "-t", "codeFrame", "--config", configPath].concat(args));
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.run(["tslint", "-t", "codeFrame"].concat(args));
        }
    };
    context.tsLint = tsLint;
};
