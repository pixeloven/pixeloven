import {
    AddonWebpackToolbox,
    WebpackExecutionOptionTypes,
    WebpackExtensionType,
} from "../types";
// import {getUtils, Mode, Name, Target} from "@pixeloven-core/env";

export default {
    alias: ["--webpack", "-w"],
    name: "webpack",
    run: async (toolbox: AddonWebpackToolbox) => {
        const { parameters, pixelOven, webpack } = toolbox;
        const task = parameters.first;
        if (!task) {
            pixelOven.invalidArgument(
                "Please provide a task for Webpack to run.",
            );
            pixelOven.exit("Webpack", 1);
            return;
        }
        if (!WebpackExtensionType.hasOwnProperty(task)) {
            pixelOven.invalidArgument(
                `Available Webpack tasks are "build" or "start".`,
                task,
            );
            pixelOven.exit("Webpack", 1);
            return;
        }

        /**
         *  @todo: add "help" argument that prints available tasks and options
         */
        switch (task) {
            case "build":
            case "start": {
                /**
                 * @todo Need to list all options in some sorta help style menu
                 */
                Object.keys(parameters.options).forEach(option => {
                    if (!WebpackExecutionOptionTypes.hasOwnProperty(option)) {
                        pixelOven.invalidArgument(
                            `Available options for "${task}" are "--path", "--source-map", or "--stats"`,
                            `--${option}`,
                        );
                        pixelOven.exit("Webpack", 1);
                    }
                });

                /**
                 * @todo Need to type the all the options for this CLI
                 */
                const statusCode = await webpack({
                    buildOptions: {
                        outputPath: "./dist",
                    },
                    compilerOptions: {
                        mode: parameters.options.mode,
                        outputPath: "./dist",
                        profiling: parameters.options.profile,
                        publicPath: parameters.options.path,
                        sourceMap: parameters.options.sourceMap,
                        stats: {
                            enabled: parameters.options.stats || false,
                            host: parameters.options.statsHost || "localhost",
                            outputDir: parameters.options.statsDir || "./stats",
                            port: parameters.options.statsPort || 8081,
                        },
                    },
                    serverOptions: {
                        host: parameters.options.host,
                        ignored: parameters.options.ignored,
                        path: parameters.options.path,
                        poll: parameters.options.poll,
                        port: parameters.options.port,
                        protocol: parameters.options.protocol,
                    },
                    type: WebpackExtensionType[task],
                });
                pixelOven.exit(
                    "Webpack",
                    statusCode,
                    `Success! Pack your bags we're going home. \n`,
                );
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
