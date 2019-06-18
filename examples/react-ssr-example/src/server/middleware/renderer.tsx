import { RouteProps, Router } from "@pixeloven/react-router-config";
import { Config } from "@server/config";
import { Body, Head, Html } from "@server/views";
import { App } from "@shared/components";
import routeConfig, { unknownErrorRoutes } from "@shared/routes";
import { configureStore, rootSaga } from "@shared/store";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";
import { Provider } from "react-redux";
import { StaticContext, StaticRouter } from "react-router";
import { Store } from "redux";

interface RenderProps {
    req: Request;
    store: Store;
}

interface TemplateRenderProps extends RenderProps {
    children: string;
    helmetData: HelmetData;
}

interface ContentRenderProps extends RenderProps {
    routes: RouteProps[];
    staticContext: StaticContext;
}

const Template = (props: TemplateRenderProps) => (
    <Html helmet={props.helmetData} lang={props.req.language}>
        <Head files={props.req.files} helmet={props.helmetData} />
        <Body files={props.req.files} initialState={props.store.getState()}>
            {props.children}
        </Body>
    </Html>
);

/**
 * Encapsulate application content
 * @param props
 */
const Content = (props: ContentRenderProps) => (
    <Provider store={props.store}>
        <StaticRouter location={props.req.url} context={props.staticContext}>
            <App routes={props.routes} />
        </StaticRouter>
    </Provider>
);

/**
 * Render application from templates
 * @param req
 * @param routes
 * @param staticContext
 * @param store
 */
function render(
    req: Request,
    routes: RouteProps[],
    staticContext: StaticContext,
    store: Store,
) {
    const contentString = renderToString(
        <Content
            req={req}
            routes={routes}
            staticContext={staticContext}
            store={store}
        />,
    );
    const helmetData = Helmet.renderStatic();
    const output = renderToString(
        <Template helmetData={helmetData} req={req} store={store}>
            {contentString}
        </Template>,
    );
    return `<!DOCTYPE html>${output}`;
}

export function errorHandler(config: Config) {
    return (req: Request, res: Response, next: NextFunction) => {
        const staticContext: StaticContext = {
            statusCode: 500,
        };
        try {
            const store = configureStore("server");
            const routes = Router.getConfig(
                unknownErrorRoutes,
                config.publicPath,
            );
            store
                .runSaga(rootSaga)
                .done.then(() => {
                    const output = render(req, routes, staticContext, store);
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
            const routes = Router.getConfig(routeConfig, config.publicPath);
            const matchedRoutes = Router.getMatches(routes, {
                as: "switch",
                path: req.path,
            });

            /**
             * Setup store to render application after sagas have complete
             * @todo react-helmet-async instead
             */
            store
                .runSaga(rootSaga)
                .done.then(() => {
                    const output = render(req, routes, staticContext, store);
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
