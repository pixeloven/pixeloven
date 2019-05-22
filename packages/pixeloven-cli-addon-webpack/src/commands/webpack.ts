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
        const { parameters, pixelOven, webpack } = context;

        /**
         * @todo Move these checks into the extension - try catch that
         */
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
         * @todo Need to type the all the options for this CLI
         */
        const statusCode = await webpack({
            buildOptions: {
                outputPath: "./dist",
            },
            compilerOptions: {
                outputPath: "./dist",
                path: parameters.options.path,
                withProfiling: parameters.options.profile,
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
        pixelOven.exit(
            "Webpack",
            statusCode,
            `Success! Pack your bags we're going home. \n`,
        );
    },
};
