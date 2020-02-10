import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenCoreToolbox } from "../types";

const typeDocFileName = "typedoc.json";
const tsconfigFileName = "tsconfig.json";

/**
 * @todo Does typedoc have a standalone I can import vs running as a child process?
 */
export default (context: PixelOvenCoreToolbox) => {
    async function typeDoc(args: string[] = []) {
        const { print, pixelOven } = context;
        const typeDocArgs = ["typedoc"];
        const typeDocConfigPath = resolvePath(typeDocFileName, false);
        if (typeDocConfigPath) {
            typeDocArgs.concat(["--options", typeDocConfigPath]);
        } else {
            print.warning(
                `Unable to find "${typeDocFileName}" reverting to default configuration`,
            );
        }
        const tsconfigConfigPath = resolvePath(tsconfigFileName, false);
        if (tsconfigConfigPath) {
            typeDocArgs.concat(["--tsconfig", tsconfigConfigPath, ...args]);
        } else {
            typeDocArgs.concat(args);
            print.warning(
                `Unable to find "${tsconfigFileName}" reverting to default configuration`,
            );
        }
        const results = await pixelOven.run(typeDocArgs);
        return results;
    }
    context.typeDoc = typeDoc;
};
