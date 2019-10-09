import {
    resolvePath,
} from "@pixeloven-core/filesystem";
import {
    Node,
    RuleSetRule
} from "webpack";
import webpackNodeExternals from "webpack-node-externals";

export function getEntry() {
    return [
        resolvePath("src/server/index.ts")
    ];
}

export function getExternals() {
    return [
        // Exclude from local node_modules dir
        webpackNodeExternals(),
        // Exclude from file - helpful for lerna packages
        webpackNodeExternals({
            modulesFromFile: true,
        }),
    ];
}

/**
 * @description Prevents these common globals from being overwritten
 */
export function getNode(): Node {
    return {
        __dirname: false,
        __filename: false,
    };
}

export function getModuleSCSSLoader(environment: string): RuleSetRule {
    return {
        test: /\.(scss|sass|css)$/i,
        use: [
            {
                loader: require.resolve("css-loader"),
                options: {
                    onlyLocals: true,
                },
            },
        ],
    };
}