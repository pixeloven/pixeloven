import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, prettier, styleLint, tsLint } = context;
        let statusCode = 0;
        switch (parameters.first) {
            case "scss": {
                const argList =
                    parameters.argv && parameters.argv.length
                        ? parameters.argv.slice(4)
                        : [];
                statusCode = await styleLint(["--fix"].concat(argList));
                if (statusCode) {
                    print.error(`Stylelint exited with status ${statusCode}`);
                    break;
                }
                statusCode = await prettier(argList);
                if (statusCode) {
                    print.error(`Prettier exited with status ${statusCode}`);
                    break;
                }
                print.success(`Success! Looks a lot nicer now doesn't it?!`);
                break;
            }
            case "ts":
            case "tsx": {
                const argList =
                    parameters.argv && parameters.argv.length
                        ? parameters.argv.slice(4)
                        : [];
                statusCode = await tsLint(["--fix"].concat(argList));
                if (statusCode) {
                    print.error(`TSLint exited with status ${statusCode}`);
                    break;
                }
                statusCode = await prettier(argList);
                if (statusCode) {
                    print.error(`Prettier exited with status ${statusCode}`);
                    break;
                }
                print.success(`Success! Looks a lot nicer now doesn't it?!`);
                break;
            }
            default: {
                const argList =
                    parameters.argv && parameters.argv.length
                        ? parameters.argv.slice(3)
                        : [];
                prettier(argList);
                break;
            }
        }
    },
};
