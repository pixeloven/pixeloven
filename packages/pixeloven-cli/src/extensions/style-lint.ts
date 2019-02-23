import { PixelOvenRunContext } from "../types";

export type StyleLintExtension = (args?: string[]) => Promise<number>;

export default (context: PixelOvenRunContext) => {
    const stylelint = async (args: string[] = []) => {
        const { pixeloven, system } = context;
        const fileName = "stylelint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            return system.spawn(
                "stylelint",
                ["--syntax", "scss", "--config", configPath].concat(args),
            );
        } else {
            return system.spawn(
                "stylelint",
                ["--syntax", "scss"].concat(args),
            );
        }
    };
    context.styleLint = stylelint;
};
