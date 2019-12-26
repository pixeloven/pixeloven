import { PixelOvenToolbox } from "../types";

export default {
    name: "compile",
    run: async (toolbox: PixelOvenToolbox) => {
        const { parameters, pixelOven, tsc } = toolbox;
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
                const results = await tsc(argList);
                pixelOven.exit("Tsc", results.status, `Success! Beam me up.\n`);
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
