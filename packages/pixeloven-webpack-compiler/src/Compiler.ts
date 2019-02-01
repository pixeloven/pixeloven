import webpack, {
    Compiler as SingleCompiler,
    Configuration,
    MultiCompiler,
    Stats,
} from "webpack";

type Type = "client" | "server";
type Handler = (stats: Stats) => void;

class Compiler {
    public static id = "PixelOvenWebpackCompiler";

    /**
     * Checks that our configurations follow a specific set of rules and creates a new instance
     * @todo should also validate target
     * @param config
     */
    public static create(configs: Configuration[]) {
        if (!configs.find(config => config.name === "client")) {
            throw Error(
                `Cannot find configuration property "name" with value "client"`,
            );
        }
        if (!configs.find(config => config.name === "server")) {
            throw Error(
                `Cannot find configuration property "name" with value "server"`,
            );
        }
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
    public onDone(type: Type) {
        const client = this.client;
        const server = this.server;

        /**
         * Process compiler with callback
         * @param compiler
         */
        const process = (handler: Handler, compiler?: SingleCompiler) => {
            if (!compiler) {
                throw Error("Could not find compiler type.");
            }
            compiler.hooks.done.tap(Compiler.id, handler);
        };
        const clientPromise = new Promise<Stats>(resolve => {
            process(stats => resolve(stats), client);
        });
        const serverPromise = new Promise<Stats>(resolve => {
            process(stats => resolve(stats), server);
        });
        switch (type) {
            case "client":
                return clientPromise;
            case "server":
                return serverPromise;
        }
    }
}

export default Compiler;
