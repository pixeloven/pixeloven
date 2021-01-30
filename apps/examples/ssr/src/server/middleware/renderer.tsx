import {NextFunction, Request, Response} from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import {Helmet} from "react-helmet";

import {Routing, StaticContext, StaticRouter, UniversalRouteProps} from "@pixeloven-react/routing";
import {Body, Head, Html, Link, Script} from "@pixeloven-react/templating";

import {Config} from "@server/config";
import App from "@shared/components/App";
import routeConfig, {unknownErrorRoutes} from "@shared/routes";

interface TemplateProps {
    data: object;
    req: Request;
    routes: UniversalRouteProps[];
    staticContext: StaticContext;
}

function Template(props: TemplateProps) {
    const content = renderToString(
        <StaticRouter location={props.req.url} context={props.staticContext}>
            <App routes={props.routes} />
        </StaticRouter>,
    );
    const helmetData = Helmet.renderStatic();
    const template = renderToString(
        <Html helmet={helmetData} lang={props.req.language}>
            <Head helmet={helmetData}>
                {props.req.files && <Link href={props.req.files.css} rel="stylesheet" type="text/css" />}
            </Head>
            <Body state={props.data} scripts={props.req.files && <Script src={props.req.files.js} />}>
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
            const routes = Routing.getConfig(unknownErrorRoutes, config.publicPath);
            const output = Template({
                data: {},
                req,
                routes,
                staticContext,
            });
            const statusCode = staticContext.statusCode || 500;
            res.write(output);
            res.status(statusCode);
            res.end();
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
            const routes = Routing.getConfig(routeConfig, config.publicPath);
            const matchedRoutes = Routing.getMatches(routes, {
                as: "switch",
                path: req.path,
            });
            const data = {test: ""};

            matchedRoutes.forEach((matchedRoute) => {
                if (matchedRoute.route.fetchData) {
                    data.test = matchedRoute.route.fetchData();
                }
            });
            const output = Template({
                data,
                req,
                routes,
                staticContext,
            });
            const statusCode = staticContext.statusCode || 200;
            res.write(output);
            res.status(statusCode);
            res.end();
        } catch (e) {
            next(e);
        }
    };
}
