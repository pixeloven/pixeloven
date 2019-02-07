import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { print } = context;
        /**
         * @todo Run jest tests, ts
         */
        print.info("Coming soon");
    },
};
