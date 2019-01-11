import express from "express";
import path from "path";
import { ServerConfig } from "./ServerConfig";

type ServerOnComplete = (error?: Error) => void;

class Server {
    protected config: ServerConfig;

    /**
     * Construct server
     * @param config 
     */
    constructor(config: ServerConfig) {
        this.config = config;
    }

    /**
     * Start server from webpack configuration
     * @param compilerConfig 
     * @param onComplete 
     */
    public start(
        onComplete: ServerOnComplete,
    ) {
        const app = express();
        if (this.config.before) {
            this.config.before(app);
        }
        // Register static file serving
        app.use(
            this.config.server.path,
            express.static(path.resolve(process.cwd(), "public")), // TODO check it exists first
        );
        // TODO we should also host coverage docs and docs if they exist
        if (this.config.middle) {
            this.config.middle(app);
        }
        if (this.config.after) {
            this.config.after(app);
        }
        // Start express server on specific host and port
        app.listen(
            this.config.server.port,
            this.config.server.host,
            onComplete,
        );
    }
}

export default Server;
