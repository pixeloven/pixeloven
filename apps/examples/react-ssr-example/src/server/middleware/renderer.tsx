import { Routing, UniversalRouteProps } from "@pixeloven-react/routing";
import { Config } from "@server/config";
import App from "@shared/components/App";
import { Body } from "@shared/components/atoms/Body";
import { Head } from "@shared/components/atoms/Head";
import { Html } from "@shared/components/atoms/Html";
import { Link } from "@shared/components/atoms/Link";
import { Script } from "@shared/components/atoms/Script";
import { Favicon } from "@shared/components/molecules/Favicon";

import routeConfig, { unknownErrorRoutes } from "@shared/routes";
import { rootSaga } from "@shared/store/sagas";
import { configureStore } from "@shared/store/store";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { StaticContext, StaticRouter } from "react-router";
import { Store } from "redux";

interface TemplateProps {
    req: Request;
    routes: UniversalRouteProps[];
    store: Store;
    staticContext: StaticContext;
}

function Template(props: TemplateProps) {
    const content = renderToString(
        <Provider store={props.store}>
            <StaticRouter
                location={props.req.url}
                context={props.staticContext}
            >
                <App routes={props.routes} />
            </StaticRouter>
        </Provider>,
    );
    const helmetData = Helmet.renderStatic();
    const template = renderToString(
        <Html helmet={helmetData} lang={props.req.language}>
            <Head helmet={helmetData}>
                <Favicon />
                {props.req.files && (
                    <Link
                        href={props.req.files.css}
                        rel="stylesheet"
                        type="text/css"
                    />
                )}
            </Head>
            <Body
                scripts={props.req.files && <Script src={props.req.files.js} />}
                state={props.store.getState()}
            >
                {content}
            </Body>
        </Html>,
    );
    return `<!DOCTYPE html>${template}`;
}

export function errorHandler(config: Config) {
    return (req: Request, res: Response, next: NextFunction) => {
        const staticContext: StaticContext = {
            statusCode: 500,
        };
        try {
            const store = configureStore("server");
            const routes = Routing.getConfig(
                unknownErrorRoutes,
                config.publicPath,
            );
            store
                .runSaga(rootSaga)
                .toPromise()
                .then(() => {
                    const output = Template({
                        req,
                        routes,
                        staticContext,
                        store,
                    });
                    const statusCode = staticContext.statusCode || 500;
                    res.write(output);
                    res.status(statusCode);
                    res.end();
                })
                .catch(error => {
                    next(error);
                });
            /**
             * Dispatch END action so sagas stop listening after they're resolved
             */
            store.close();
        } catch (e) {
            next(e);
        }
    };
}

export function renderer(config: Config) {
    return (req: Request, res: Response, next: NextFunction) => {
        const staticContext: StaticContext = {
            statusCode: 200,
        };
        try {
            const store = configureStore("server");
            const routes = Routing.getConfig(routeConfig, config.publicPath);
            const matchedRoutes = Routing.getMatches(routes, {
                as: "switch",
                path: req.path,
            });

            /**
             * Setup store to render application after sagas have complete
             * @todo fetch data doesn't seem to be called
             */
            store
                .runSaga(rootSaga)
                .toPromise()
                .then(() => {
                    const output = Template({
                        req,
                        routes,
                        staticContext,
                        store,
                    });
                    const statusCode = staticContext.statusCode || 200;
                    res.write(output);
                    res.status(statusCode);
                    res.end();
                })
                .catch(error => {
                    next(error);
                });
            matchedRoutes.forEach(matchedRoute => {
                if (matchedRoute.route.fetchData) {
                    matchedRoute.route.fetchData(
                        store.dispatch,
                        matchedRoute.matched.params,
                    );
                }
            });

            /**
             * Dispatch END action so sagas stop listening after they're resolved
             */
            store.close();
        } catch (e) {
            next(e);
        }
    };
}
