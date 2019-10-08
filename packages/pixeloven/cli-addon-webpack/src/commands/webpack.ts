import { AddonWebpackToolbox, WebpackExtensionType } from "../types";

export default {
    alias: ["--webpack", "-w"],
    name: "webpack",
    run: async (toolbox: AddonWebpackToolbox) => {
        const { parameters, pixelOven, webpack } = toolbox;
        if (!parameters.first) {
            pixelOven.invalidArgument("Must provide a task for Webpack to run.");
            pixelOven.exit("Webpack", 1);
            return;
        }
        if (!WebpackExtensionType.hasOwnProperty(parameters.first)) {
            pixelOven.invalidArgument(`Available Webpack tasks are "build" or "start".`, `"${parameters.first}"`);
            pixelOven.exit("Webpack", 1);
            return;
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
                withStats: parameters.options.stats,
                withStatsDir: parameters.options.statsDir,
                withStatsHost: parameters.options.statsHost,
                withStatsPort: parameters.options.statsPort,
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
