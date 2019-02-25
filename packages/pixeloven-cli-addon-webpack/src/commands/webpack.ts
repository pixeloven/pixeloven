import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
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
        /**
         * Process results
         * @param name 
         * @param status 
         */
        const handle = (name: string, status: number) => {
            if (status) {
                print.error(`${name} exited with status ${status}`);
                process.exit(status);
            } else {
                print.success(
                    `Success! Ready for action.`,
                );
            }
            return status;
        }
        let statusCode = 0;
        switch (parameters.first) {
            case "build":
                statusCode = await webpack({
                    withSourceMap: parameters.options.sourceMap || false
                });
                return handle("Webpack", statusCode);
            case "start":
                statusCode = await webpackDevServer();
                return handle("Webpack Dev Server", statusCode);
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
