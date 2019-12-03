import {
    exit,
    getArgList,
    getConfigPath,
    invalidArgument,
    run,
} from "../toolbox";
import { PixelOvenToolbox } from "../types";

export default (toolbox: PixelOvenToolbox) => {
    toolbox.pixelOven = {
        exit,
        getArgList,
        getConfigPath,
        invalidArgument,
        run,
    };
};
