import fs from "fs";
import path from "path";
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
     * Client code path
     */
    protected clientPath: string;

    /**
     * Server code path
     */
    protected serverPath: string;

    /**
     * Construct compilers
     * @param configs
     */
    constructor(configs: Configuration[]) {
        this.configs = configs;
        this.combined = webpack(configs);

        this.clientPath = path.resolve(process.cwd(), "./src/client");
        this.serverPath = path.resolve(process.cwd(), "./src/server");
    }

    /**
     * Checks if client code path exists
     */
    public get hasClientCodePath() { 
        return fs.existsSync(this.clientPath);
    }

    /**
     * Checks if server code path exists
     */
    public get hasServerCodePath() { 
        return fs.existsSync(this.serverPath);
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
    public onDone(type: Type, handler: Handler) {
        const time = Date.now();

        /**
         * Process compiler with callback
         * @param compiler
         */
        const process = (hand: Handler, compiler?: SingleCompiler) => {
            if (!compiler) {
                throw Error("Could not find compiler type.");
            }
            compiler.hooks.done.tap(`${Compiler.id}-${type}-${time}`, hand);
        };
        switch (type) {
            case "client":
                process(handler, this.client);
            case "server":
                process(handler, this.server);
        }
    }
}

export default Compiler;
