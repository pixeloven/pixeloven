import { AddonTsLintToolbox } from "../../types";

export default {
    description: "Project linter supporting TypeScript",
    name: "ts",
    alias: ["tsx"],
    run: async (context: AddonTsLintToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, tsLint } = context;
        const argList = pixelOven.getArgList("lint", parameters, {
            offset: 2,
            type: "withOptions",
        });
        const results = await tsLint(argList);
        statusCode = results.status;
        if (!statusCode) {
            print.success(
                `Success! Your code is beautify just the way it is.\n`,
            );
        }
        process.exit(statusCode);
    },
};
