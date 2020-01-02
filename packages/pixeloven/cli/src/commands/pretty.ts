import { PixelOvenToolbox } from "../types";

export default {
    name: "pretty",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, pixelOven, prettier, styleLint, tsLint } = context;
        const availableTasks = ["css", "scss", "ts", "tsx"];
        const task = parameters.first;

        /**
         * @todo might need to break these apart since the linters can't accept the same params as prettier
         *      - Might just rely on the underlying cli more directly instead of having these aliases
         */
        if (!task) {
            pixelOven.invalidArgument(
                "Please provide a task for Pretty to run.",
            );
            pixelOven.exit("Pretty", 1);
        } else if (!availableTasks.includes(task)) {
            pixelOven.invalidArgument(
                `Available Pretty tasks are "css", "scss", "ts", or "tsx".`,
                task,
            );
            pixelOven.exit("Pretty", 1);
        } else {
            const argList = pixelOven.getArgList(task, parameters, {
                offset: 1,
                type: "withOptions",
            });
            const prettierResults = await prettier(argList);
            pixelOven.exit(
                "Prettier",
                prettierResults.status,
                `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
            );

            switch (task) {
                case "css":
                case "scss": {
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
                case "ts":
                case "tsx": {
                    const tsLintResults = await tsLint(
                        ["--fix"].concat(argList),
                    );
                    pixelOven.exit(
                        "TSLint",
                        tsLintResults.status,
                        `\nSuccess! Looks a lot nicer now doesn't it?!\n`,
                    );
                    break;
                }
                default: {
                    pixelOven.invalidArgument(
                        `Available Pretty tasks are "css", "scss", "ts", or "tsx".`,
                        task,
                    );
                    pixelOven.exit("Pretty", 1);
                    break;
                }
            }
        }
    },
};
