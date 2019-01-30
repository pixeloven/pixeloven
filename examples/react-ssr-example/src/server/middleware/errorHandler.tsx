import { Html } from "@server/views";
import { App } from "@shared/components";
import { unknownErrorRoutes } from "@shared/routes";
import { configureStore } from "@shared/store";
import { State } from "@shared/store/types";
import { NextFunction, Request, Response } from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { StaticContext, StaticRouter } from "react-router";

interface RenderError extends Error {
    state?: State;
}

/**
 * Handle errors
 * @param err
 * @param req
 * @param res
 * @param next
 */
const handler = (
    err: RenderError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        next(err);
    } else {
        const staticContext: StaticContext = {
            statusCode: 500,
        };
        const store = configureStore(false);
        const helmet = Helmet.renderStatic();
        const markup = renderToString(
            <Html
                files={req.files}
                helmet={helmet}
                initialState={err.state || store.getState()}
            >
                <Provider store={store}>
                    <StaticRouter location={req.url} context={staticContext}>
                        <App routes={unknownErrorRoutes} />
                    </StaticRouter>
                </Provider>
            </Html>,
        );
        res.status(staticContext.statusCode || 500).send(
            `<!DOCTYPE html>${markup}`,
        );
    }
};

export default handler;
