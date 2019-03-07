import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonWebpackRunContext, WebpackExtensionType } from "../types";

/**
 * @todo Need to document options here
 * @todo Need to move build logic in here
 * --source-map Allows build with or without sourcemaps
 */
export default {
    name: "webpack",
    run: async (context: AddonWebpackRunContext) => {
        const { parameters, print, webpack } = context;
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
                print.success(`Success! Ready for action.`);
            }
            return status;
        };

        if (!parameters.first) {
            throw new NodeInvalidArgumentException(
                "Must provide a webpack run type.",
            );
        }
        if (!WebpackExtensionType.hasOwnProperty(parameters.first)) {
            throw new NodeInvalidArgumentException(
                "Invalid run type provided.",
            );
        }
        const statusCode = await webpack({
            configOptions: {
                withSourceMap: parameters.options.sourceMap || false,
            },
            type: WebpackExtensionType.build,
        });
        return handle("Webpack", statusCode);
    },
};
