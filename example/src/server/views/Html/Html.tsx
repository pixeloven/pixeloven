import { Link, Script } from "@server/views";
import { State } from "@shared/store/types";
import * as React from "react";
import { HelmetData } from "react-helmet";

interface HtmlProps {
    children: React.ReactNode;
    files?: Express.Files;
    helmet?: HelmetData;
    initialState?: State;
}

const Html = (props: HtmlProps) => {
    const serializedState = JSON.stringify(props.initialState);
    const cssTags =
        props.files && props.files.css ? (
            <Link href={props.files.css} rel="stylesheet" type="text/css" />
        ) : (
            undefined
        );
    const jsTags =
        props.files && props.files.js ? (
            <Script src={props.files.js} />
        ) : (
            undefined
        );
    return (
        <html lang="en">
            <head>
                {props.helmet && props.helmet.title.toComponent()}
                {props.helmet && props.helmet.meta.toComponent()}
                {props.helmet && props.helmet.link.toComponent()}
                <Link href="favicon.ico" rel="icon" />
                {cssTags}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.INIT_STATE = ${serializedState};`,
                    }}
                />
            </head>
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">{props.children}</div>
                {jsTags}
            </body>
        </html>
    );
};

export default Html;
