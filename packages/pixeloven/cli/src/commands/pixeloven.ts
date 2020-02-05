import { PixelOvenToolbox } from "../types";

export default {
    name: "pixeloven",
    run: async (context: PixelOvenToolbox) => {
        const { print } = context;
        print.error(`Invalid argument`);
        process.exit(1);
    },
};
