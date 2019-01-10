import express from "express";
import path from "path";
import webpack, { Configuration } from "webpack";
import { Config } from "./config";
import Features from "./Features";
import { 
    createWebpackDevMiddleware,
    createWebpackHotMiddleware,
    createWebpackHotServerMiddleware,
    errorHandler
} from "./middleware";

type ServerOnComplete = (error?: Error) => void;

class Server {

    protected config: Config;
    protected features: Features;

    constructor(config: Config, features: Features) {
        this.config = config;
        this.features = features;
    }

    public start(compilerConfig: Configuration[], onComplete: ServerOnComplete) {
        const app = express();
        app.use(this.config.publicPath, express.static(path.resolve(process.cwd(), "public")));

        /**
         * Run before hook
         */
        this.features.before(app);

        /**
         * Setup webpack dev server
         */
        const combinedCompiler = webpack(compilerConfig);
        const clientCompiler = combinedCompiler.compilers.find(
            compiler => compiler.name === "client",
        );
        app.use(createWebpackDevMiddleware(this.config, combinedCompiler));
        if (clientCompiler) {
            app.use(createWebpackHotMiddleware(this.config, clientCompiler));
        }
        app.use(createWebpackHotServerMiddleware(this.config, combinedCompiler));
        
        /**
         * Run after hook
         */
        this.features.after(app);

        /**
         * Register error handler
         */
        app.use(errorHandler);

        /**
         * Start express server on specific host and port
         */
        app.listen(this.config.server.port, this.config.server.host, onComplete);
    }
}

export default Server;