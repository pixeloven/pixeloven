import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, tsc } = context;
        let statusCode = {};

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
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
        }
    },
};
