import {
    exit,
    getArgList,
    getConfigPath,
    resolvePlugin,
    run,
} from "../toolbox";
import { PixelOvenToolbox } from "../types";

export default (context: PixelOvenToolbox) => {
    context.pixelOven = {
        exit,
        getArgList,
        getConfigPath,
        resolvePlugin,
        run,
    };
};
