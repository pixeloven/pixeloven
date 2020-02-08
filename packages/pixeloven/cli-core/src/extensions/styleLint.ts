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
        let stylelintArgs = ["stylelint", "--syntax", "scss"];
        if (configPath) {
            stylelintArgs = stylelintArgs.concat([
                "--config",
                configPath,
                ...args,
            ]);
        } else {
            stylelintArgs = stylelintArgs.concat(args);
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
        }
        const results = pixelOven.run(stylelintArgs);
        return results;
    }
    context.styleLint = styleLint;
};
