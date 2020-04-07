import { getUtils, UtilOptions } from "@pixeloven-core/env";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

interface ForkTsCheckerWebpackOptions extends UtilOptions {
    tsConfig: string;
}

/**
 * @todo create a plugins package under webpack so we can reuse with storybook
 * @param options
 */
export function createForkTsCheckerWebpack(
    options: ForkTsCheckerWebpackOptions,
) {
    const { ifProduction } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

    return ifProduction(
        new ForkTsCheckerWebpackPlugin({
            formatter: "codeframe",
            memoryLimit: 4096,
            silent: true,
            tsconfig: options.tsConfig,
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            formatter: "codeframe",
            memoryLimit: 4096,
            silent: true,
            tsconfig: options.tsConfig,
        }),
    );
}
