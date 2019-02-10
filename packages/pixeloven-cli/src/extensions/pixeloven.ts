import { GluegunRunContext } from "gluegun";
import getConfigPath, {
    GetConfigPathFunction,
} from "./pixeloven-helpers/get-config-path";
import printInvalidArgument, {
    PrintInvalidArgumentFunction,
} from "./pixeloven-helpers/print-invalid-argument";
import resolvePlugin, { ResolvePluginFunction } from "./pixeloven-helpers/resolve-plugin";
import runBin, { RunBinFunction } from "./pixeloven-helpers/run-bin";

export interface PixelOvenExtensions {
    getConfigPath: GetConfigPathFunction;
    printInvalidArgument: PrintInvalidArgumentFunction;
    resolvePlugin: ResolvePluginFunction;
    runBin: RunBinFunction;
}

export default (context: GluegunRunContext) => {
    const pixeloven = {
        getConfigPath,
        printInvalidArgument,
        resolvePlugin,
        runBin,
    };
    context.pixeloven = pixeloven;
};
