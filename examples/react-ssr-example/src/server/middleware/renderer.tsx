import {
    Router,
    RouteProps,
} from "@pixeloven/react-router-config";
import { Body, Head } from "@server/views";
import { App } from "@shared/components";
import routeConfig, { unknownErrorRoutes } from "@shared/routes";
import { configureStore, rootSaga } from "@shared/store";
import { NextFunction, Request, Response } from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { StaticContext, StaticRouter } from "react-router";
import { Store } from "redux";

interface ContentProps {
    routes: RouteProps[];
    store: Store;
}

export default (publicPath: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const staticContext: StaticContext = {
            statusCode: 200,
        };
        try {
            const store = configureStore("server");
            const routes = Router.getConfig(routeConfig, publicPath);
            const matchedRoutes = Router.getMatches(routes, req.path);

            /**
             * Encapsulate application head
             * @param props
             */
            const head = () => {
                const helmet = Helmet.renderStatic();
                return <Head files={req.files} helmet={helmet} />;
            };

            /**
             * Encapsulate application content
             * @param props
             */
            const content = (props: ContentProps) => (
                <Body files={req.files} initialState={props.store.getState()}>
                    <Provider store={props.store}>
                        <StaticRouter
                            location={req.url}
                            context={staticContext}
                        >
                            <App routes={props.routes} />
                        </StaticRouter>
                    </Provider>
                </Body>
            );

            /**
             * Setup store to render application after sagas have complete
             * @todo react-helmet-async instead
             */
            store
                .runSaga(rootSaga)
                .done.then(() => {
                    const contentString = renderToString(
                        content({
                            routes,
                            store,
                        }),
                    );
                    const headString = renderToString(head());
                    res.write(headString);
                    res.write(contentString);
                    res.write(`</html>`);
                    res.end();
                })
                .catch(error => {
                    const contentString = renderToString(
                        content({
                            routes: unknownErrorRoutes,
                            store,
                        }),
                    );
                    const headString = renderToString(head());
                    res.write(headString);
                    res.write(contentString);
                    res.write(`</html>`);
                    res.end();
                });
            /**
             * @todo Make this logic available in package
             * @todo Display some dummy info from JSON file
             * @todo make this so it can act like a switch - or sust handle this logic in the component
             */
            let matchedStatusCodeCount = 0;
            matchedRoutes.forEach(matchedRoute => {
                if (matchedRoute.route.statusCode && !matchedStatusCodeCount) {
                    console.log(matchedRoute.route);
                    staticContext.statusCode = matchedRoute.route.statusCode;
                    matchedStatusCodeCount++;
                }
                if (matchedRoute.route.fetchData) {
                    matchedRoute.route.fetchData(
                        store.dispatch,
                        matchedRoute.matched.params,
                    );
                }
            });
            res.status(staticContext.statusCode || 200);
            res.write(`<!DOCTYPE html><html lang="en">`);
            /**
             * Dispatch END action so sagas stop listening after they're resolved
             */
            store.close();
        } catch (e) {
            next(e);
        }
    };
};
