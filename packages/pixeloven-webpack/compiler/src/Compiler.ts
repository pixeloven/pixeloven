import { Name } from "@pixeloven-core/env";
import webpack, { Configuration, MultiCompiler, Stats } from "webpack";

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
            compiler => compiler.name === Name.client,
        );
    }

    /**
     * Attempts to find client compiler
     */
    public get library() {
        return this.combined.compilers.find(
            compiler => compiler.name === Name.library,
        );
    }

    /**
     * Attempts to find server compiler
     */
    public get server() {
        return this.combined.compilers.find(
            compiler => compiler.name === Name.server,
        );
    }

    /**
     * Allows for hooks to be defined for on compile done
     * @todo there seems to be a race condition sometimes where a compiler onDone is called but the compiler falls through. Or we are calling this twice in the dev server.
     * @param type
     * @param callback
     */
    public onDone(name: Name | string, handler: Handler) {
        const time = Date.now();
        switch (name) {
            case Name.client:
                if (this.client) {
                    this.client.hooks.done.tap(
                        `${Compiler.id}-${name}-${time}`,
                        handler,
                    );
                }
            case Name.library:
                if (this.library) {
                    this.library.hooks.done.tap(
                        `${Compiler.id}-${name}-${time}`,
                        handler,
                    );
                }
            case Name.server:
                if (this.server) {
                    this.server.hooks.done.tap(
                        `${Compiler.id}-${name}-${time}`,
                        handler,
                    );
                }
        }
    }
}

export default Compiler;
