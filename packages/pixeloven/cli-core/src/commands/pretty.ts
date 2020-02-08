import { PixelOvenToolbox } from "../types";

export default {
    description: "Project formatter supported via Prettier",
    name: "pretty",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, prettier } = context;
        if (!parameters.first) {
            print.error(`No arguments provided`);
            statusCode = 1;
        } else {
            const argList = pixelOven.getArgList(parameters.first, parameters, {
                offset: 0,
                type: "withOptions",
            });
            const results = await prettier(argList);
            statusCode = results.status;
        }
        if (!statusCode) {
            print.success(`\nSuccess! Looks a lot nicer now doesn't it?!\n`);
        }
        process.exit(statusCode);
    },
};
