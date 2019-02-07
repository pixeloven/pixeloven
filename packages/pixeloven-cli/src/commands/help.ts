import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--help", "-h"],
    name: "help",
    run: async (context: PixelOvenRunContext) => {
        const { print } = context;
        print.info("Coming soon");
    },
};
