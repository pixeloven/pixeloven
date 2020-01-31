import { PixelOvenToolbox } from "../types";

export default {
    name: "test",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, jest } = context;
        switch (parameters.first) {
            /**
             * @deprecated We should simply treat this as a proxy for jest in future versions.
             */
            case "watch": {
                const argList = pixelOven.getArgList("watch", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await jest(["--watch"].concat(argList));
                statusCode = results.status;
                break;
            }
            default: {
                const argList = pixelOven.getArgList("test", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await jest(argList);
                statusCode = results.status;
                break;
            }
        }
        if (statusCode) {
            print.error("Failed to complete testing");
        } else {
            print.success(`Success! Untouchable.\n`);
        }
    },
};
