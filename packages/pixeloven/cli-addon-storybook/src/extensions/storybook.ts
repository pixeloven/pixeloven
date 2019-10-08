import storybook from "@storybook/react/standalone";
import {
    AddonStorybookRunContext,
    StorybookExecutionType,
    StorybookExtension,
} from "../types";

export default (context: AddonStorybookRunContext) => {
    const extension: StorybookExtension = async (
        type: StorybookExecutionType,
        args: string[] = [],
    ) => {
        const { filesystem, print } = context;
        const configEntryPoint = require.resolve("@pixeloven-storybook/config");
        const configDir = filesystem.path(configEntryPoint, "..");
        try {
            switch (type) {
                case (StorybookExecutionType.build): {
                    const outputDir = "./dist/public/docs";
                    await storybook({
                        configDir,
                        mode: "static",
                        outputDir,
                        quiet: true
                    });
                    return 0;
                }
                case (StorybookExecutionType.start): {
                    await storybook({
                        ci: true,
                        configDir,
                        mode: "dev",
                        port: 9001,
                        quiet: true
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
    context.storybook = extension;
};
