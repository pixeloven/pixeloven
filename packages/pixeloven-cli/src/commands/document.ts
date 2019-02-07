import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (context: PixelOvenRunContext) => {
        const { print } = context;
        /**
         * @todo Document ts
         */
        print.info("Coming soon");
    },
};
