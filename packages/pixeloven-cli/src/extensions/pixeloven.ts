import { PixelOvenToolbox } from "../types";
import {
    getArgList,
    getConfigPath,
    resolvePlugin,
    run,
} from "./pixeloven-helpers";

/**
 * Sets up pixelOven helpers
 * @param context
 */
function helpers(context: PixelOvenToolbox) {
    context.pixelOven = {
        getArgList,
        getConfigPath,
        resolvePlugin,
        run,
    };
}

export default helpers;
