import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, pixelOven, prettier, styleLint, tsLint } = context;
        /**
         * @todo might need to break these apart since the linters can't accept the same params as prettier
         *      - Might just rely on the underlying cli more directly instead of having these aliases
         */
        switch (parameters.first) {
            case "scss": {
                const argList = pixelOven.getArgList("scss", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                pixelOven.exit(
                    "Prettier",
                    prettierResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                const styleLintResults = await styleLint(
                    ["--fix"].concat(argList),
                );
                pixelOven.exit(
                    "Stylelint",
                    styleLintResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                break;
            }
            case "ts": {
                const argList = pixelOven.getArgList("ts", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                pixelOven.exit(
                    "Prettier",
                    prettierResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                const tsLintResults = await tsLint(["--fix"].concat(argList));
                pixelOven.exit(
                    "TSLint",
                    tsLintResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                break;
            }
            case "tsx": {
                const argList = pixelOven.getArgList("tsx", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                pixelOven.exit(
                    "Prettier",
                    prettierResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                const tsLintResults = await tsLint(["--fix"].concat(argList));
                pixelOven.exit(
                    "TSLint",
                    tsLintResults.status,
                    `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                );
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
