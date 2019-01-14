import webpack, { Configuration, MultiCompiler } from "webpack";

class Compiler {
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

    public get client() {
        return this.combined.compilers.find(
            compiler => compiler.name === "client",
        );
    }

    public get server() {
        return this.combined.compilers.find(
            compiler => compiler.name === "server",
        );
    }
}

export default Compiler;
