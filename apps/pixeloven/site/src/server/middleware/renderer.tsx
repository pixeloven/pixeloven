import { Body, Head, Html, Link, Script } from "@pixeloven-react/common";
import {
    Routing,
    StaticContext,
    StaticRouter,
    UniversalRouteProps,
} from "@pixeloven-react/routing";
import { Config } from "@server/config";
import { App } from "@shared/components";
import routeConfig from "@shared/routes";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";

interface TemplateProps {
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
            res.write("Error");
            res.status(staticContext.statusCode || 500);
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
            const output = Template({
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
