import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const fileName = "tslint.json";

export default (context: PixelOvenToolbox) => {
    async function tsLint(args: string[]) {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        const tslintArgs = ["tslint", "-t", "codeFrame"];
        if (configPath) {
            tslintArgs.concat(["--config", configPath, ...args]);
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            tslintArgs.concat(args);
        }
        return pixelOven.run(tslintArgs);
    }
    context.tsLint = tsLint;
};
