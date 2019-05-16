import {
    exit,
    getArgList,
    getConfigPath,
    invalidArgument,
    resolvePlugin,
    run,
} from "../toolbox";
import { PixelOvenToolbox } from "../types";

export default (context: PixelOvenToolbox) => {
    context.pixelOven = {
        exit,
        getArgList,
        getConfigPath,
        invalidArgument,
        resolvePlugin,
        run,
    };
};
