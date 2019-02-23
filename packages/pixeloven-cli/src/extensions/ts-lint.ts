import { PixelOvenRunContext } from "../types";

export type TsLintExtension = (args?: string[]) => Promise<number>;

export default (context: PixelOvenRunContext) => {
    const tsLint = async (args: string[] = []) => {
        const { pixeloven, print, system } = context;
        const fileName = "tslint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            return system.spawn(["tslint", "-t", "codeFrame", "--config", configPath].concat(args).join(" "));
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return system.spawn(["tslint", "-t", "codeFrame"].concat(args).join(" "));
        }
    };
    context.tsLint = tsLint;
};
