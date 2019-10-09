import {
    resolvePath,
} from "@pixeloven-core/filesystem";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import {
    Entry,
    Node,
    RuleSetRule
} from "webpack";
import { 
    getIfUtils, 
    removeEmpty 
} from "webpack-config-utils";

/**
 * Returns entry point for client
 * @param environment 
 * @param publicPath 
 */
export function getEntry(environment: string, publicPath: string): Entry {
    const { ifDevelopment } = getIfUtils(environment);
    const hmrPath = path.normalize(`/${publicPath}/__webpack_hmr`);
    return {
        main: removeEmpty([
            require.resolve("@babel/polyfill"),
            ifDevelopment(
                `webpack-hot-middleware/client?path=${hmrPath}`,
                undefined,
            ),
            resolvePath("src/client/index.tsx"),
        ]),
    }
}

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