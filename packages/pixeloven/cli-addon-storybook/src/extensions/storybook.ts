import { storybook } from "@pixeloven-storybook/common";
import {
    AddonStorybookToolbox,
    StorybookExecutionOptions,
    StorybookExecutionType,
} from "../types";

export default (toolbox: AddonStorybookToolbox) => {
    async function story(
        type: StorybookExecutionType,
        options: StorybookExecutionOptions,
    ) {
        const { filesystem } = toolbox;
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
        } catch (e) {
            return 1;
        }
    }
    toolbox.storybook = story;
};
