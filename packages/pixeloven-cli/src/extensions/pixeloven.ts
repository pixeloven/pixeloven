import { GluegunRunContext } from "gluegun";
import { PixelOvenExtensions } from "../types";
import getConfigPath from "./pixeloven-helpers/get-config-path";
import resolvePlugin from "./pixeloven-helpers/resolve-plugin";
import run from "./pixeloven-helpers/run";

const helpers = (context: GluegunRunContext) => {
    const pixelOven: PixelOvenExtensions = {
        getConfigPath,
        resolvePlugin,
        run,
    }
    context.pixelOven = pixelOven;
};

export default helpers;
