import { Mode, Name, Target } from "@pixeloven-core/env";
import { chalk, logger } from "@pixeloven-core/logger";
import { filesystem } from "gluegun";
import p from "path";
import {
    AddonWebpackToolbox,
    ErrorCode,
    WebpackExecutionOptionTypes,
    WebpackExtensionType,
} from "../types";

function getEntryPoint(entry: string) {
    const absolutePath = p.resolve(process.cwd(), entry);
    if (filesystem.isFile(absolutePath)) {
        return absolutePath;
    }
    return false;
}

function getTarget(target: Target | string): Target | false {
    if (Target.hasOwnProperty(target)) {
        return Target[target];
    }
    return false;
}

/**
 * Handles breaking options
 * @param option
 */
function getOptions(option: string | boolean) {
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

        const globalDefaultEntry = "./src/index.ts";
        const globalDefaultOutputPath = "./dist";
        const mode = development ? Mode.development : Mode.production;

        function getCompilerOptions(
            type: string | boolean,
            name: Name,
            defaultEntry: string,
            defaultTarget: Target,
        ) {
            const dynamicOptions = getOptions(type);
            const entry = getEntryPoint(dynamicOptions.entry || defaultEntry);
            if (!entry) {
                logger.error(`code path entry point could not be found`);
                return;
            }
            logger.info(`${chalk.bold(name)} code path has been discovered`);

            /**
             * @todo we don't always want defaults
             */
            const target = getTarget(dynamicOptions.target || defaultTarget);
            if (!target) {
                logger.error(`invalid target provided`);
                return;
            }
            logger.info(`${chalk.bold(name)} targeting ${target}`);
            return {
                entry,
                mode,
                name,
                outputPath: globalDefaultOutputPath,
                profiling: profile,
                publicPath: path,
                sourceMap,
                stats: {
                    enabled: stats || false,
                    host: statsHost || "localhost",
                    outputDir: statsDir || "./stats",
                    port: statsPort || 8081,
                },
                target,
            };
        }

        if (!task) {
            pixelOven.invalidArgument(
                "alease provide a task for Webpack to run.",
            );
            pixelOven.exit("Webpack", ErrorCode.MissingTask);
            return;
        }
        if (!WebpackExtensionType.hasOwnProperty(task)) {
            pixelOven.invalidArgument(
                `available Webpack tasks are "build" or "start".`,
                task,
            );
            pixelOven.exit("Webpack", ErrorCode.InvalidTask);
            return;
        }
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

        /**
         *  @todo: add "help" argument that prints available tasks and options
         */
        switch (task) {
            case "build":
            case "start": {
                const compilerOptions = [];
                if (!!client) {
                    const clientOptions = getCompilerOptions(
                        client,
                        Name.client,
                        globalDefaultEntry,
                        Target.web,
                    );
                    if (clientOptions) {
                        compilerOptions.push(clientOptions);
                    }
                }
                if (!!library) {
                    const libraryOptions = getCompilerOptions(
                        library,
                        Name.library,
                        globalDefaultEntry,
                        Target.node,
                    );
                    if (libraryOptions) {
                        compilerOptions.push(libraryOptions);
                    }
                }
                if (!!server) {
                    const serverOptions = getCompilerOptions(
                        server,
                        Name.server,
                        globalDefaultEntry,
                        Target.node,
                    );
                    if (serverOptions) {
                        compilerOptions.push(serverOptions);
                    }
                }
                /**
                 * @todo Need to type the all the options for this CLI
                 */
                const statusCode = await webpack({
                    bundlerOptions: {
                        clean: true,
                        outputPath: globalDefaultOutputPath,
                    },
                    compilerOptions,
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
                    pixelOven.exit(
                        "Webpack",
                        0,
                        `Success! Pack your bags we're going home. \n`,
                    );
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
