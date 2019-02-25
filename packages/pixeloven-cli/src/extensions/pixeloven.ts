import { GluegunRunContext } from "gluegun";
import getConfigPath, {
    GetConfigPathFunction,
} from "./pixeloven-helpers/get-config-path";
import resolvePlugin, { ResolvePluginFunction } from "./pixeloven-helpers/resolve-plugin";
import run, { RunFunction } from "./pixeloven-helpers/run";

export interface PixelOvenExtensions {
    getConfigPath: GetConfigPathFunction;
    resolvePlugin: ResolvePluginFunction;
    run: RunFunction;
}

const pixelOven = (context: GluegunRunContext) => {
    context.pixelOven = {
        getConfigPath,
        resolvePlugin,
        run,
    };
};

export default pixelOven;
