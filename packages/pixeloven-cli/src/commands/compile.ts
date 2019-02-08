import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, tsc } = context;
        let statusCode = 0;
        const argList = parameters.array && parameters.array.length ? parameters.array.slice(1) : [];
        switch(parameters.first) {
            case "ts":
            case "tsx":
            default:
                statusCode = await tsc(argList);
                if (statusCode) {
                    print.error(`Tsc exited with status ${statusCode}`);
                } else {
                    print.success(`Success! Beam me up.`);
                }
                break;
        }
    },
};
