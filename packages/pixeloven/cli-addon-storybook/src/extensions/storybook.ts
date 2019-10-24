import storybook from "@storybook/react/standalone";
import {
    AddonStorybookToolbox,
    StorybookExecutionOptions,
    StorybookExecutionType,
    StorybookExtension,
} from "../types";

export default (toolbox: AddonStorybookToolbox) => {
    const story: StorybookExtension = async (
        type: StorybookExecutionType,
        options: StorybookExecutionOptions,
    ) => {
        const { filesystem, print } = toolbox;
        const configEntryPoint = require.resolve("@pixeloven-storybook/config");
        const configDir = filesystem.path(configEntryPoint, "..");
        const { outputDir, port, quiet } = options;

        try {
            switch (type) {
                case StorybookExecutionType.build: {
                    await storybook({
                        configDir,
                        mode: "static",
                        outputDir: outputDir || "./stories",
                        quiet,
                    });
                    return 0;
                }
                case StorybookExecutionType.start: {
                    await storybook({
                        ci: true,
                        configDir,
                        mode: "dev",
                        port: port || 9001,
                        quiet,
                    });
                    return 0;
                }
            }
        } catch (err) {
            if (err && err.message) {
                print.error(err.message);
            }
        }
        return 1;
    };
    toolbox.storybook = story;
};
