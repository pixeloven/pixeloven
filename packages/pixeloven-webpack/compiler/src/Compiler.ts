import { Name } from "@pixeloven-core/env";
import webpack, {
    Compiler as SingleCompiler,
    Configuration,
    MultiCompiler,
    Stats,
} from "webpack";

export type Handler = (stats: Stats) => void;

class Compiler {
    public static id = "PixelOvenWebpackCompiler";

    /**
     * Checks that our configurations follow a specific set of rules and creates a new instance
     * @todo should also validate target
     * @param config
     */
    public static create(configs: Configuration[]) {
        if (!configs.length) {
            throw Error(
                `No webpack configuration provided. Please provide an entry for Webpack to target`,
            );
        }
        configs.forEach(config => {
            if (!config.name || !Name.hasOwnProperty(config.name)) {
                throw Error(
                    `Cannot find configuration property "name" with value  of "client" or "server". Please provide an entry for Webpack to target`,
                );
            }
        });
        return new Compiler(configs);
    }

    /**
     * Defines our combined compiler
     */
    public combined: MultiCompiler;

    /**
     * Array of webpack configs
     */
    protected configs: Configuration[];

    /**
     * Construct compilers
     * @param configs
     */
    constructor(configs: Configuration[]) {
        this.configs = configs;
        this.combined = webpack(configs);
    }

    /**
     * Attempts to find client compiler
     */
    public get client() {
        return this.combined.compilers.find(
            compiler => compiler.name === "client",
        );
    }

    /**
     * Attempts to find client compiler
     */
    public get library() {
        return this.combined.compilers.find(
            compiler => compiler.name === "library",
        );
    }

    /**
     * Attempts to find server compiler
     */
    public get server() {
        return this.combined.compilers.find(
            compiler => compiler.name === "server",
        );
    }

    /**
     * Allows for hooks to be defined for on compile done
     * @param type
     * @param callback
     */
    public onDone(name: Name, handler: Handler) {
        const time = Date.now();

        /**
         * Process compiler with callback
         * @param compiler
         */
        const process = (hand: Handler, compiler?: SingleCompiler) => {
            if (!compiler) {
                throw Error("Could not find compiler type.");
            }
            compiler.hooks.done.tap(`${Compiler.id}-${name}-${time}`, hand);
        };
        switch (name) {
            case "client":
                process(handler, this.client);
            case "library":
                process(handler, this.library);
            case "server":
                process(handler, this.server);
        }
    }
}

export default Compiler;
