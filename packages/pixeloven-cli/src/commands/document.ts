import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (toolbox: PixelOvenToolbox) => {
        const { parameters, pixelOven, print, typeDoc } = toolbox;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const results = await typeDoc(argList);
                pixelOven.exit("TypeDoc", results.status, `Success! What's up doc(s)?\n`);
                break;
            }
            default: {
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
            }
        }
    },
};
