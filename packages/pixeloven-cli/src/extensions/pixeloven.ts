import { GluegunRunContext } from "gluegun";
import getConfigPath, { GetConfigPathFunction } from "./pixeloven-helpers/get-config-path";
import printInvalidArgument, { PrintInvalidArgumentFunction } from "./pixeloven-helpers/print-invalid-argument";
import runBin, { RunBinFunction } from "./pixeloven-helpers/run-bin";

export interface PixelOvenExtensions {
    getConfigPath: GetConfigPathFunction;
    printInvalidArgument: PrintInvalidArgumentFunction;
    runBin: RunBinFunction;
}

export default (context: GluegunRunContext) => {
    const pixeloven = {
        getConfigPath,
        printInvalidArgument,
        runBin,
    };
    context.pixeloven = pixeloven;
};