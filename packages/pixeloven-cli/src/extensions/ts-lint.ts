import { PixelOvenRunContext } from "../types";

export type TsLintExtension = (args?: string[]) => void;

export default (context: PixelOvenRunContext) => {
    context.tsLint = async (args: string[] = []) => {
        const configPath = context.pixeloven.getConfigPath("tslint.json");
        if (configPath) {
            context.pixeloven.runBin("tslint", [
                "-t",
                "codeFrame",
                "--config",
                configPath
            ].concat(args));
        } else {
            context.pixeloven.runBin("tslint", [
                "-t",
                "codeFrame"
            ].concat(args));
        }
    }
}