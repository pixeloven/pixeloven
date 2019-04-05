import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonWebpackRunContext, WebpackExtensionType } from "../types";

/**
 * @todo Need to document options here
 * @todo Need to move build logic in here
 * --source-map Allows build with or without sourcemaps
 */
export default {
    alias: ["--webpack", "-w"],
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
        /**
         * @todo Remove machine param in favor of something more generic
         *
         * @todo source map doesn't seem to be sent all the way through any more?
         */
        const statusCode = await webpack({
            buildOptions: {
                outputPath: "./dist",
            },
            compilerOptions: {
                outputPath: "./dist",
                path: parameters.options.path,
                withSourceMap: parameters.options.sourceMap,
            },
            serverOptions: {
                host: parameters.options.host,
                ignored: parameters.options.ignored,
                path: parameters.options.path,
                poll: parameters.options.poll,
                port: parameters.options.port,
                protocol: parameters.options.protocol,
            },
            type: WebpackExtensionType[parameters.first],
        });
        return handle("Webpack", statusCode);
    },
};
