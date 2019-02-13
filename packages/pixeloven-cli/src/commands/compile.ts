import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, pixeloven, print, tsc } = context;
        let statusCode = 0;

        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const argList = parameters.argv && parameters.argv.length 
                    ? parameters.argv.slice(4)
                    : [];
                statusCode = await tsc(argList);
                if (statusCode) {
                    print.error(`Tsc exited with status ${statusCode}`);
                } else {
                    print.success(`Success! Beam me up.`);
                }
                break;
            }
            default:
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
