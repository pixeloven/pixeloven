import { PixelOvenToolbox } from "../types";

export default {
    name: "test",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, pixelOven, jest } = context;
        switch (parameters.first) {
            case "watch": {
                const argList = pixelOven.getArgList("watch", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await jest(["--watch"].concat(argList));
                pixelOven.exit(
                    "Jest",
                    results.status,
                    `Success! Untouchable.\n`,
                );
                break;
            }
            default: {
                const argList = pixelOven.getArgList("test", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await jest(argList);
                pixelOven.exit(
                    "Jest",
                    results.status,
                    `Success! Untouchable.\n`,
                );
                break;
            }
        }
    },
};
