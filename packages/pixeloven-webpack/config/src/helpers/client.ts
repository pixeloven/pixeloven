import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
    Node,
    RuleSetRule
} from "webpack";
import { 
    getIfUtils, 
    removeEmpty 
} from "webpack-config-utils";

/**
 * @description Some libraries import Node modules but don"t use them in the browser.
 * Tell Webpack to provide empty mocks for them so importing them works.
 */
export function getNode(): Node {
    return {
        child_process: "empty",
        dgram: "empty",
        dns: "mock",
        fs: "empty",
        http2: "empty",
        module: "empty",
        net: "empty",
        tls: "empty",
    };
}

export function getModuleSCSSLoader(environment: string): RuleSetRule {
    const { ifDevelopment } = getIfUtils(environment);
    const postCssPlugin = () => [
        require("postcss-flexbugs-fixes"),
        autoprefixer({
            flexbox: "no-2009",
        }),
    ];
    return {
        test: /\.(scss|sass|css)$/i,
        use: removeEmpty([
            ifDevelopment({
                loader: require.resolve("css-hot-loader"),
            }),
            MiniCssExtractPlugin.loader,
            {
                loader: require.resolve("css-loader"),
            },
            {
                loader: require.resolve("postcss-loader"),
                options: {
                    ident: "postcss",
                    plugins: postCssPlugin,
                },
            },
            {
                loader: require.resolve("sass-loader"),
            },
        ]),
    };
}