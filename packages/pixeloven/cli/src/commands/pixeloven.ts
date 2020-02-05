import { PixelOvenToolbox } from "../types";

export default {
    name: "pixeloven",
    run: async (toolbox: PixelOvenToolbox) => {
        const { print } = toolbox;
        print.error(`Invalid argument`);
        process.exit(1);
    },
};
