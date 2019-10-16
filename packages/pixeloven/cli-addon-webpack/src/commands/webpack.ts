// import {Mode, Name, Target} from "@pixeloven-core/env";
import {
    AddonWebpackToolbox,
    WebpackExecutionOptionTypes,
    WebpackExtensionType,
} from "../types";

export default {
    alias: ["--webpack", "-w"],
    name: "webpack",
    run: async (toolbox: AddonWebpackToolbox) => {
        const { parameters, pixelOven, webpack } = toolbox;
        const task = parameters.first;
        const {
            entry,
            host,
            ignored,
            path,
            poll,
            port,
            profile,
            protocol,
            sourceMap,
            stats,
            statsDir,
            statsHost,
            statsPort,
        } = parameters.options;

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
                            `Available options for "${task}" are "--entry", "--host", "--ignored", "--path", "--port", "--protocol", "--source-map", or "--stats"`,
                            `--${option}`,
                        );
                        pixelOven.exit("Webpack", 1);
                    }
                });

                const entries = entry
                    ? Array.isArray(entry)
                        ? entry
                        : [entry]
                    : ["production:client:web"];

                /**
                 * @todo Need to type the all the options for this CLI
                 */
                const statusCode = await webpack({
                    buildOptions: {
                        outputPath: "./dist",
                    },
                    compilerOptions: {
                        entries,
                        outputPath: "./dist",
                        profiling: profile,
                        publicPath: path,
                        sourceMap,
                        stats: {
                            enabled: stats || false,
                            host: statsHost || "localhost",
                            outputDir: statsDir || "./stats",
                            port: statsPort || 8081,
                        },
                    },
                    serverOptions: {
                        host,
                        ignored,
                        path,
                        poll,
                        port,
                        protocol,
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
