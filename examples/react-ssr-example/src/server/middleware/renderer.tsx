import { config } from "@server/config";
import { Html } from "@server/views";
import App from "@shared/App";
import { convertCustomRouteConfig, matchRoutes } from "@shared/router";
import routeConfig from "@shared/routes";
import { configureStore, rootSaga } from "@shared/store";
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
    const store = configureStore(false);
    const staticContext: StaticContext = {
        statusCode: 200,
    };
    const routes = convertCustomRouteConfig(routeConfig, config.baseUrl);

    // run saga middleware and then proceed with rendering once END action is received
    store
        .runSaga(rootSaga)
        .done.then(() => {
            const helmet = Helmet.renderStatic();
            const markup = renderToString(
                <Html
                    files={req.files}
                    helmet={helmet}
                    initialState={store.getState()}
                >
                    <Provider store={store}>
                        <StaticRouter
                            location={req.url}
                            context={staticContext}
                        >
                            <App routes={routes} />
                        </StaticRouter>
                    </Provider>
                </Html>,
            );
            res.status(staticContext.statusCode || 200).send(
                `<!DOCTYPE html>${markup}`,
            );
        })
        .catch(error => {
            next(error);
        });

    /**
     * This likely will break prod build and we should find a better way
     * @todo perhaps by modifying nginx proxy on the docker side so that this is needed
     */
    const relativeUrlPath = req.url.replace(config.baseUrl, "/");

    /**
     * Finds any matching routes attempts to init state on each
     */
    try {
        const matchedRoutes = matchRoutes(routes, relativeUrlPath);
        matchedRoutes.forEach(matchedRoute => {
            if (matchedRoute.route.fetchData) {
                matchedRoute.route.fetchData(
                    store.dispatch,
                    matchedRoute.matched.params,
                );
            }
        });
    } catch (e) {
        console.error(e);
    }
    // dispatch END action so sagas stop listening after they're resolved
    store.close();
};
