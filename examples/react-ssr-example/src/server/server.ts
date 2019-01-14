import { Application } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import { health } from "./controllers/index";
import { errorHandler, renderer } from "./middleware/index";

const server = (app: Application) => {
    /**
     * Setup express logger
     * @todo Log to file AND need to catch stack trace and what not
     */
    app.use(
        expressWinston.logger({
            transports: [
                new winston.transports.Console(),
                // new winston.transports.File({
                //     filename: "error.log",
                //     level: "error",
                // })
            ],
        }),
    );

    /**
     * Register endpoints
     * @todo all endpoints and middleware should respond at the baseUrl https://stackoverflow.com/questions/4375554/is-it-possible-to-set-a-base-url-for-nodejs-app
     */
    app.use("/v1/health", health);
    app.use(renderer);
    app.use(errorHandler);
};

export default server;