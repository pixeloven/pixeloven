import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, pixeloven, print, typeDoc } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "ts":
            case "tsx":
                statusCode = await typeDoc(argList);
                if (statusCode) {
                    print.error(`Typedoc exited with status ${statusCode}`);
                } else {
                    print.success(`Success! We got docs.`);
                }
                break;
            default:
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
