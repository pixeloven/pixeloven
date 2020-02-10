import { PixelOvenCoreToolbox } from "../types";

export default {
    description: "Auto document TypeScript via TypeDoc",
    name: "document",
    run: async (toolbox: PixelOvenCoreToolbox) => {
        let statusCode = 0;
        const { parameters, print, pixelOven, typeDoc } = toolbox;
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
                statusCode = results.status;
                if (statusCode) {
                    print.error("Failed to build type docs");
                } else {
                    print.success(`Success! What's up doc(s)?\n`);
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
