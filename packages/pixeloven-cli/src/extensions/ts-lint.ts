import { PixelOvenRunContext, TsLintExtension } from "../types";

export default (context: PixelOvenRunContext) => {
    const tsLint: TsLintExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "tslint.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                ["tslint", "-t", "codeFrame", "--config", configPath].concat(
                    args,
                ),
            );
        }
        return pixelOven.run(["tslint", "-t", "codeFrame"].concat(args));
    };
    context.tsLint = tsLint;
};
