import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, pixelOven, print, styleLint, tsLint } = context;
        switch (parameters.first) {
            case "scss": {
                const argList = pixelOven.getArgList("scss", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await styleLint(argList);
                pixelOven.exit("Stylelint", results.status, `Success! Your SCSS is beautify just the way it is.\n`);
                break;
            }
            case "ts": {
                const argList = pixelOven.getArgList("ts", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await tsLint(argList);
                pixelOven.exit("TSLint", results.status, `Success! Your TypeScript is beautify just the way it is.\n`);
                break;
            }
            case "tsx": {
                const argList = pixelOven.getArgList("tsx", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await tsLint(argList);
                pixelOven.exit("TSLint", results.status, `Success! Your TypeScript is beautify just the way it is.\n`);
                break;
            }
            default: {
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
            }
        }
    },
};
