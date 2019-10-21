import { Mode, Name, Target } from "@pixeloven-core/env";
import {
    AddonWebpackToolbox,
    ErrorCode,
    WebpackExecutionOptionTypes,
    WebpackExtensionType,
} from "../types";

/**
 * Handles breaking options
 * @param option
 */
function breakOption(option: string | boolean) {
    if (typeof option === "boolean") {
        return {};
    }
    const options = option.includes(":") ? option.split(":") : [option];
    if (options.length > 1) {
        return {
            entry: options[1],
            target: Target[options[0]],
        };
    } else if (options[0].includes(".")) {
        return {
            entry: options[0],
        };
    }
    return {
        target: Target[options[0]],
    };
}

export default {
    alias: ["--webpack", "-w"],
    name: "webpack",
    run: async (toolbox: AddonWebpackToolbox) => {
        const { parameters, pixelOven, print, webpack } = toolbox;
        const task = parameters.first;
        const {
            client,
            development,
            host,
            ignored,
            library,
            path,
            poll,
            port,
            profile,
            protocol,
            server,
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
            pixelOven.exit("Webpack", ErrorCode.MissingTask);
            return;
        }
        if (!WebpackExtensionType.hasOwnProperty(task)) {
            pixelOven.invalidArgument(
                `Available Webpack tasks are "build" or "start".`,
                task,
            );
            pixelOven.exit("Webpack", ErrorCode.InvalidTask);
            return;
        }

        /**
         *  @todo: add "help" argument that prints available tasks and options
         */
        switch (task) {
            case "build":
            case "start": {
                if (!client && !library && !server) {
                    pixelOven.invalidArgument(
                        `Please provide an entry for Webpack to target. Available options are "--client", "--library", or "--server".`,
                    );
                    pixelOven.exit("Webpack", ErrorCode.MissingTarget);
                    return;
                }

                /**
                 * @todo Need to list all options in some sorta help style menu
                 */
                Object.keys(parameters.options).forEach(option => {
                    if (!WebpackExecutionOptionTypes.hasOwnProperty(option)) {
                        pixelOven.invalidArgument(
                            `Available options for "${task}" are "--client", "--development", "--entry", "--host", "--ignored", "--library", "--path", "--port", "--protocol", "--server", "--source-map", or "--stats"`,
                            `--${option}`,
                        );
                        pixelOven.exit("Webpack", ErrorCode.InvalidArgument);
                    }
                });

                const compilers = [];
                const mode = development ? Mode.development : Mode.production;
                const defaultEntry = "./src/index.ts";

                if (!!client) {
                    const clientOptions = breakOption(client);
                    compilers.push({
                        entry: clientOptions.entry || defaultEntry,
                        mode,
                        name: Name.client,
                        target: clientOptions.target || Target.web,
                    });
                }
                if (!!library) {
                    const libraryOptions = breakOption(library);
                    compilers.push({
                        entry: libraryOptions.entry || defaultEntry,
                        mode,
                        name: Name.library,
                        target: libraryOptions.target || Target.node,
                    });
                }
                if (!!server) {
                    const serverOptions = breakOption(server);
                    compilers.push({
                        entry: serverOptions.entry || defaultEntry,
                        mode,
                        name: Name.server,
                        target: serverOptions.target || Target.node,
                    });
                }

                /**
                 * @todo Need to type the all the options for this CLI
                 */
                const statusCode = await webpack({
                    compilerOptions: {
                        compilers: compilers.length ? compilers : undefined,
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

                if (statusCode) {
                    if (statusCode === 1) {
                        print.error("client bundling failed to complete");
                        pixelOven.exit(
                            "Webpack",
                            ErrorCode.FailedClientBundling,
                        );
                    } else if (statusCode === 2) {
                        print.error("server bundling failed to complete");
                        pixelOven.exit(
                            "Webpack",
                            ErrorCode.FailedServerBundling,
                        );
                    } else {
                        print.error("bundling failed to complete");
                        pixelOven.exit("Webpack", ErrorCode.FailedBundling);
                    }
                } else {
                    print.success(
                        `Success! Pack your bags we're going home. \n`,
                    );
                    pixelOven.exit("Webpack", 0);
                }
                break;
            }
            default: {
                pixelOven.invalidArgument();
                pixelOven.exit("Webpack", 1);
                break;
            }
        }
    },
};
