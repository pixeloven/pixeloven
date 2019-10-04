import { NodeInvalidArgumentException } from "@pixeloven-core/exceptions";
import {
    AddonStorybookRunContext,
    StorybookExecutionType,
    StorybookExtension,
} from "../types";

/**
 * @todo Add support for custom config path
 * @todo Need to clean this up - the cmd and this have similar logic that could be condensed
 * @todo This should really be two different extensions
 */
export default (context: AddonStorybookRunContext) => {
    const storybook: StorybookExtension = async (
        type: StorybookExecutionType,
        args: string[] = [],
    ) => {
        const { filesystem, pixelOven } = context;
        const pluginPath = pixelOven.resolvePlugin("@pixeloven-storybook", "config");
        if (!pluginPath) {
            throw new Error(
                "Could not find peer dependency @pixeloven-storybook/config",
            );
        }
        const configPath = filesystem.path(pluginPath, "./config");

        switch (type) {
            case "build": {
                return pixelOven.run(
                    [
                        "build-storybook",
                        "-c",
                        configPath,
                        "-o",
                        "./dist/public/docs",
                    ].concat(args),
                );
            }
            case "start": {
                return pixelOven.run(
                    [
                        "start-storybook",
                        "--quiet",
                        "--ci",
                        "-s",
                        "./public",
                        "-p",
                        "9001",
                        "-c",
                        configPath,
                    ].concat(args),
                );
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    };
    context.storybook = storybook;
};
