import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const fileName = "stylelint.json";

/**
 * @todo Add support for CSS
 */
export default (context: PixelOvenToolbox) => {
    async function styleLint(args: string[]) {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        const stylelintArgs = ["stylelint", "--syntax", "scss"];
        if (configPath) {
            stylelintArgs.concat(["--config", configPath, ...args]);
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            stylelintArgs.concat(args);
        }
        return pixelOven.run(stylelintArgs);
    }
    context.styleLint = styleLint;
};
