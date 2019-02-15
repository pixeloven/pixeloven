import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, jest } = context;
        let statusCode = 0;
        switch (parameters.first) {
            case "watch": {
                const argList =
                    parameters.argv && parameters.argv.length
                        ? parameters.argv.slice(4)
                        : [];
                statusCode = await jest(["--watch"].concat(argList));
                if (statusCode) {
                    print.error(`Jest exited with status ${statusCode}`);
                } else {
                    print.success(`Success! Untouchable.`);
                }
                break;
            }
            default: {
                const argList =
                    parameters.argv && parameters.argv.length
                        ? parameters.argv.slice(3)
                        : [];
                statusCode = await jest(argList);
                if (statusCode) {
                    print.error(`Jest exited with status ${statusCode}`);
                } else {
                    print.success(`Success! Untouchable.`);
                }
                break;
            }
        }
    },
};
