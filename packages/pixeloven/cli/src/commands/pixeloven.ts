import { PixelOvenToolbox } from "../types";

export default {
    name: "pixeloven",
    run: async (context: PixelOvenToolbox) => {
        const { print } = context;
        /**
         * @todo Print out usage
         * @todo we should be able to use the aliases and chain them.
         */
        print.info("Coming soon");
    },
};
