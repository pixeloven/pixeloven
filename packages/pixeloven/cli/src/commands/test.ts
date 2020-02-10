import { PixelOvenToolbox } from "../types";

export default {
    description: "Test runner interface",
    name: "test",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, jest } = context;
        const argList = pixelOven.getArgList("test", parameters, {
            offset: 1,
            type: "withOptions",
        });
        const results = await jest(argList);
        statusCode = results.status;
        if (statusCode) {
            print.error("Failed to complete testing");
        } else {
            print.success(`Success! Untouchable.\n`);
        }
        process.exit(statusCode);
    },
};
