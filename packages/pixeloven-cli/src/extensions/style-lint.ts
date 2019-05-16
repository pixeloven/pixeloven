import { PixelOvenToolbox, StyleLintExtension } from "../types";

export default (context: PixelOvenToolbox) => {
    const styleLint: StyleLintExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "stylelint.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                [
                    "stylelint",
                    "--syntax",
                    "scss",
                    "--config",
                    configPath,
                ].concat(args),
            );
        }
        return pixelOven.run(["stylelint", "--syntax", "scss"].concat(args));
    };
    context.styleLint = styleLint;
};
