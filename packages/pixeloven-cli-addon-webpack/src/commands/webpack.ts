import { AddonWebpackRunContext } from "../types";

/**
 * @todo Need to document options here
 * @todo Need to move build logic in here
 * --source-map Allows build with or without sourcemaps
 */
export default {
    name: "webpack",
    run: async (context: AddonWebpackRunContext) => {
        const { parameters, print, webpack, webpackDevServer } = context;
        let statusCode = 0;
        switch (parameters.first) {
            case "build":
                statusCode = await webpack({
                    withSourceMap: parameters.options.sourceMap || false
                });
                if (statusCode) {
                    print.error(`Webpack exited with status ${statusCode}`);
                }
                break;
            case "start":
                statusCode = await webpackDevServer();
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
