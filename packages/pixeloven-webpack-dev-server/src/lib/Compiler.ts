import webpack, { Configuration, MultiCompiler, Stats } from "webpack";

type OnCompleteType = "client" | "server"
type OnCompleteCallback = (stats: Stats) => void

class Compiler {

    public static id = "PixelOvenWebpackCompiler";

    /**
     * Defines our combined compiler
     */
    public combined: MultiCompiler;

    /**
     * Array of webpack configs
     */
    protected config: Configuration[];

    /**
     * Construct compilers
     * @param config
     */
    constructor(config: Configuration[]) {
        this.config = config;
        this.combined = webpack(config);
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
    public onDone(type: OnCompleteType, callback: OnCompleteCallback) {
        if (type === "client" && this.client) {
            this.client.hooks.done.tap(Compiler.id, callback);
        }
        if (type === "server" && this.server) {
            this.server.hooks.done.tap(Compiler.id, callback);
        }
    }
}

export default Compiler;
