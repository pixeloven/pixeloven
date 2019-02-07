import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: PixelOvenRunContext) => {
        const { print } = context;
        /**
         * @todo Compile 
         */
        print.info("Coming soon");
    },
};
