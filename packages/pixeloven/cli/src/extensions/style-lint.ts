import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox, StyleLintExtension } from "../types";

const fileName = "stylelint.json";

export default (context: PixelOvenToolbox) => {
    const styleLint: StyleLintExtension = async (args: string[]) => {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
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
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
        return pixelOven.run(["stylelint", "--syntax", "scss"].concat(args));
    };
    context.styleLint = styleLint;
};
