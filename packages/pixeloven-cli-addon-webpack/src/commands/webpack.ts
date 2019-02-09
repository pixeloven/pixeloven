import { AddonWebpackRunContext } from "../types";

export default {
    name: "webpack",
    run: async (context: AddonWebpackRunContext) => {
        const { parameters, print, webpack, webpackDevServer } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
                statusCode = await webpack(argList);
                if (statusCode) {
                    print.error(`Webpack exited with status ${statusCode}`);
                }
                break;
            case "start":
                statusCode = await webpackDevServer(argList);
                if (statusCode) {
                    print.error(`Webpack exited with status ${statusCode}`);
                }
                break;
            default:
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
        }
    },
};
