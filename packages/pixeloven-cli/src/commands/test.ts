import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, jest } = context;
        let statusCode = 0;
        const argList = parameters.array && parameters.array.length ? parameters.array.slice(1) : [];
        switch(parameters.first) {
            case "watch":
                statusCode = await jest(["--watch"].concat(argList));
            default:
                statusCode = await jest(argList);
        }
        if (statusCode) {
            print.error(`Jest exited with status ${statusCode}`);
        } else {
            print.success(`Success! Untouchable.`);
        }
    },
};
