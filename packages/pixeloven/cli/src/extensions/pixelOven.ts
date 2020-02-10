import { getArgList, run } from "../toolbox";
import { PixelOvenToolbox } from "../types";

export default (toolbox: PixelOvenToolbox) => {
    toolbox.pixelOven = {
        getArgList,
        run,
    };
};
