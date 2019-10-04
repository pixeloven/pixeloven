import storybook from "@storybook/react/standalone";
import {
    AddonStorybookRunContext,
    StorybookExecutionType,
    StorybookExtension,
} from "../types";

/**
 * @todo Use storybook standalone - https://storybook.js.org/docs/configurations/standalone-options/ instead of the CLI
 * @todo Break this into two extensions since they diverge?
 */
export default (context: AddonStorybookRunContext) => {
    const extension: StorybookExtension = async (
        type: StorybookExecutionType,
        args: string[] = [],
    ) => {
        const { filesystem, print } = context;
        const configEntryPoint = require.resolve("@pixeloven-storybook/config");
        const configDir = filesystem.path(configEntryPoint, "..");
        /**
         * @todo Upgrade to latest version and also see if there are types for this somewhere?
         */
        try {
            switch (type) {
                case (StorybookExecutionType.build): {
                    const outputDir = "./dist/public/docs";
                    await storybook({
                        configDir,
                        mode: "static", // "static"
                        outputDir,
                        quiet: true
                    });

                    return 0;
                    // return pixelOven.run(
                    //     [
                    //         "build-storybook",
                    //         "-c",
                    //         configDir,
                    //         "-o",
                    //         "./dist/public/docs",
                    //     ].concat(args),
                    // );
                }
                case (StorybookExecutionType.start): {
                    await storybook({
                        ci: true,
                        configDir,
                        mode: "dev", // "static"
                        port: 9001, // TODO need to be able to run multiple at the same time??? Also what about scanning the entire learn dir by glob?
                        quiet: true
                    });
                    // return pixelOven.run(
                    //     [
                    //         "start-storybook",
                    //         "--quiet",
                    //         "--ci",
                    //         "-p",
                    //         "9001",
                    //         "-c",
                    //         configDir,
                    //     ].concat(args),
                    // );
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
