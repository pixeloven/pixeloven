import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const fileName = "tsconfig.json";

/**
 * @todo Does tsc have a standalone I can import vs running as a child process?
 */
export default (toolbox: PixelOvenToolbox) => {
    async function tsc(args: string[]) {
        const { print, pixelOven } = toolbox;
        const configPath = resolvePath(fileName, false);
        const tscArgs = ["tsc", "--pretty"];
        if (configPath) {
            tscArgs.concat(["--project", configPath, ...args]);
        } else {
            tscArgs.concat(args);
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
        }
        const result = await pixelOven.run(tscArgs);
        return result;
    }
    toolbox.tsc = tsc;
};
