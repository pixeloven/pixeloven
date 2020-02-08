import { PixelOvenCoreToolbox } from "../types";

export default {
    description: "TypeScript compiler interface",
    name: "compile",
    run: async (toolbox: PixelOvenCoreToolbox) => {
        let statusCode = 0;
        const { parameters, print, pixelOven, tsc } = toolbox;
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
                statusCode = results.status;
                if (statusCode) {
                    print.error("Failed to compile source");
                } else {
                    print.success(`Success! Beam me up\n`);
                }
                break;
            }
            default: {
                print.error(`Invalid argument provided`);
                statusCode = 1;
                break;
            }
        }
        process.exit(statusCode);
    },
};
