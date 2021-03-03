import { AddonStyleLintToolbox } from "../../types";

export default {
    description: "Project linter supporting scss and css",
    name: "style",
    alias: ["css", "scss"],
    run: async (context: AddonStyleLintToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, styleLint } = context;
        const argList = pixelOven.getArgList("lint", parameters, {
            offset: 2,
            type: "withOptions",
        });
        const results = await styleLint(argList);
        statusCode = results.status;
        if (!statusCode) {
            print.success(
                `Success! Your code is beautify just the way it is.\n`,
            );
        }
        process.exit(statusCode);
    },
};
