import { Html } from "@server/views";
import App from "@shared/App";
import store from "@shared/store";
import { NextFunction, Request, Response } from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { StaticContext, StaticRouter } from "react-router";

/**
 * Renderer middleware
 * @description Renders react application to html
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction): void => {
    const staticContext: StaticContext = {
        statusCode: 200,
    };
    try {
        const helmet = Helmet.renderStatic();
        const markup = renderToString(
            <Html files={req.files} helmet={helmet}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={staticContext}>
                        <App />
                    </StaticRouter>
                </Provider>
            </Html>,
        );
        res.status(staticContext.statusCode || 200).send(
            `<!DOCTYPE html>${markup}`,
        );
    } catch (error) {
        next(error);
    }
};
