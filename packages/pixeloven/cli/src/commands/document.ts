import { PixelOvenToolbox } from "../types";

export default {
    name: "document",
    run: async (toolbox: PixelOvenToolbox) => {
        const { parameters, pixelOven, typeDoc } = toolbox;
        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const argList = pixelOven.getArgList(
                    parameters.first,
                    parameters,
                    {
                        offset: 1,
                        type: "withOptions",
                    },
                );
                const results = await typeDoc(argList);
                pixelOven.exit(
                    "TypeDoc",
                    results.status,
                    `Success! What's up doc(s)?\n`,
                );
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
