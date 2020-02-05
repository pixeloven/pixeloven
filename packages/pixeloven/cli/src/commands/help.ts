import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--help", "-h"],
    name: "help",
    run: async (toolbox: PixelOvenToolbox) => {
        const { print } = toolbox;
        print.error(`Invalid argument`);
        process.exit(1);
    },
};
