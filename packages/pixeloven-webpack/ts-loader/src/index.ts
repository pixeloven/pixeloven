import { resolveTsConfig } from "@pixeloven-core/filesystem";
import { RuleSetUse } from "webpack";

/**
 * Loader for handling TypeScript
 * @description Should always be used with ForkTsCheckerWebpackPlugin since we only transpile here
 *
 */
const loader: RuleSetUse = [
    {
        loader: require.resolve("babel-loader"),
        options: {
            cacheDirectory: true,
            plugins: [
                [
                    require.resolve("@babel/plugin-proposal-decorators"),
                    {
                        legacy: true,
                    },
                ],
                [
                    require.resolve("@babel/plugin-proposal-class-properties"),
                    {
                        loose: true,
                    },
                ],
                require.resolve("@babel/plugin-syntax-dynamic-import"),
            ],
            presets: [
                [
                    require.resolve("@babel/preset-env"),
                    {
                        useBuiltIns: false,
                    },
                ],
                require.resolve("@babel/preset-react"),
                require.resolve("@babel/preset-typescript"),
            ],
        },
    },
    {
        loader: require.resolve("ts-loader"),
        options: {
            configFile: resolveTsConfig(),
            transpileOnly: true,
        },
    },
];

export default loader;
