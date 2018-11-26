import { ScriptTags, StyleSheetTags } from "@server/views";
import * as React from "react";
import { HelmetData } from "react-helmet";

interface HtmlProps {
    children: React.ReactNode;
    files?: Express.Files;
    helmet?: HelmetData;
}

/**
 * @todo CA-103 manifest and favicon should be absolute to basePath
 * @param props
 */
const Html = (props: HtmlProps) => {
    return (
        <html lang="en">
            <head>
                {props.helmet && props.helmet.title.toComponent()}
                {props.helmet && props.helmet.meta.toComponent()}
                {props.helmet && props.helmet.link.toComponent()}
                <link rel="manifest" href="manifest.json" />
                <link rel="shortcut icon" href="favicon.ico" />
                {props.files && <StyleSheetTags hrefs={props.files.css} />}
            </head>
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">{props.children}</div>
                {props.files && <ScriptTags sources={props.files.js} />}
            </body>
        </html>
    );
};

export default Html;
