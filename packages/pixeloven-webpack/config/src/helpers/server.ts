import {
    Node,
    RuleSetRule
} from "webpack";

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