import { getArgList, run } from "../toolbox";
import { PixelOvenCoreToolbox } from "../types";

export default (toolbox: PixelOvenCoreToolbox) => {
    toolbox.pixelOven = {
        getArgList,
        run,
    };
};
