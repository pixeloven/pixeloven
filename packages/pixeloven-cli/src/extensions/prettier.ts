import { PixelOvenRunContext } from "../types";

export type PrettierExtension = (args?: string[]) => void;

export default (context: PixelOvenRunContext) => {
    context.prettier = async (args: string[] = []) => {
        const configPath = context.pixeloven.getConfigPath("prettier.json");
        if (configPath) {
            context.pixeloven.runBin("prettier", [
                "--write",
                "--config",
                configPath
            ].concat(args));
        } else {
            context.pixeloven.runBin("prettier", [
                "--write"
            ].concat(args));
        }
    }
}