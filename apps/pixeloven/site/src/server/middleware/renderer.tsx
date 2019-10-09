import { RouteProps, Router } from "@pixeloven-react/routing";
import { Config } from "@server/config";
import { Body, Head, Html } from "@server/views";
import { App } from "@shared/components";
import routeConfig from "@shared/routes";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";
import { StaticContext, StaticRouter } from "react-router";

interface RenderProps {
    req: Request;
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
        <Body files={props.req.files}>{props.children}</Body>
    </Html>
);

/**
 * Encapsulate application content
 * @param props
 */
const Content = (props: ContentRenderProps) => (
    <StaticRouter location={props.req.url} context={props.staticContext}>
        <App routes={props.routes} />
    </StaticRouter>
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
) {
    const contentString = renderToString(
        <Content req={req} routes={routes} staticContext={staticContext} />,
    );
    const helmetData = Helmet.renderStatic();
    const output = renderToString(
        <Template helmetData={helmetData} req={req}>
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
            const routes = Router.getConfig(routeConfig, config.publicPath);
            const output = render(req, routes, staticContext);
            const statusCode = staticContext.statusCode || 200;
            res.write(output);
            res.status(statusCode);
            res.end();
        } catch (e) {
            next(e);
        }
    };
}
