import storybook from "@storybook/react/standalone";
import {
    AddonStorybookToolbox,
    StorybookExecutionType,
    StorybookExtension,
    StorybookExtensionOptions,
} from "../types";

export default (toolbox: AddonStorybookToolbox) => {
    const story: StorybookExtension = async (
        type: StorybookExecutionType,
        options: StorybookExtensionOptions,
    ) => {
        const { filesystem, print } = toolbox;
        const configEntryPoint = require.resolve("@pixeloven-storybook/config");
        const configDir = filesystem.path(configEntryPoint, "..");
        const {outputDir, port, noQuiet} = options;

        try {
            switch (type) {
                case StorybookExecutionType.build: {
                    /**
                     * configure output, port, quiet
                     * include feedback validation on bad values if possible
                     * look into adding exit code to invalidargument in toolbox
                     * look at webpack cli for examples of erroring
                     * put logic in extensions vs commands being dumb
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
                        quiet: true,
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
