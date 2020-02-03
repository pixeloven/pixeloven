import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox, TscExtension } from "../types";

const fileName = "tsconfig.json";

/**
 * @todo Import ts instead of calling bin?
 */
export default (toolbox: PixelOvenToolbox) => {
    const tsc: TscExtension = async (args: string[] = []) => {
        const { print, pixelOven } = toolbox;
        const configPath = resolvePath(fileName, false);
        if (configPath) {
            return pixelOven.run(
                ["tsc", "--pretty", "--project", configPath].concat(args),
            );
        }
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
        return pixelOven.run(["tsc", "--pretty"].concat(args));
    };
    toolbox.tsc = tsc;
};
