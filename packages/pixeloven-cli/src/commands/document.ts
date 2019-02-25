import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, typeDoc } = context;
        let statusCode = {};
        const argList = parameters.argv && parameters.argv.length 
            ? parameters.argv.slice(4)
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
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
        }
    },
};
