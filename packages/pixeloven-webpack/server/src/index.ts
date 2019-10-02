/**
 * Register libraries here
 */
import { mergeOptions } from "@pixeloven-core/common";
import { Compiler } from "@pixeloven-webpack/compiler";
import Server from "./Server";
import {Config, Protocol} from "./types";

/**
 * Default compiler options
 */
const defaultServerOptions: Config = {
    host: "localhost",
    ignored: /node_modules/,
    path: "/",
    poll: 500,
    port: 8080,
    protocol: Protocol.http,
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getServer(
    compiler: Compiler,
    options: Partial<Config> = {},
) {
    const config = mergeOptions(defaultServerOptions, options);
    return new Server(compiler, config);
}

export default getServer;
export {
    Server,
    Config,
    Protocol
}