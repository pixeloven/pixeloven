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
        const {outputDir, port, noQuiet} = options;

        try {
            switch (type) {
                case StorybookExecutionType.build: {
                    /**
                     * [x] configure output, port, quiet
                     * [x] include feedback validation on bad values if possible
                     * [x] - look into adding exit code to invalidargument in toolbox
                     * [x] - look at webpack cli for examples of erroring
                     * [ ] - put logic in extensions vs commands being dumb
                     */

                    await storybook({
                        configDir,
                        mode: "static",
                        outputDir: outputDir || "./dist/public/docs",
                        quiet: !noQuiet,
                    });
                    return 0;
                }
                case StorybookExecutionType.start: {
                    await storybook({
                        ci: true,
                        configDir,
                        mode: "dev",
                        port: port || 9001,
                        quiet: !noQuiet,
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
