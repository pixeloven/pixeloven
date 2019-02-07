import { PixelOvenRunContext } from "../types";

export type StyleLintExtension = (args?: string[]) => void;

export default (context: PixelOvenRunContext) => {
    context.styleLint = async (args: string[] = []) => {
        const configPath = context.pixeloven.getConfigPath("stylelint.json");
        if (configPath) {
            context.pixeloven.runBin("stylelint", [
                "--syntax",
                "scss",
                configPath
            ].concat(args));
        } else {
            context.pixeloven.runBin("stylelint", [
                "--syntax",
                "scss",
            ].concat(args));
        }
    }
}