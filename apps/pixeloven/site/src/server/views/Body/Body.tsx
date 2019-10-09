import { Script } from "@server/views";
import React from "react";
import { HelmetData } from "react-helmet";

interface BodyProps {
    children: string;
    files?: {
        css?: string[];
        js?: string[];
    };
    helmet?: HelmetData;
}

function Body(props: BodyProps) {
    // const bodyAttrs = props.helmet
    //     ? props.helmet.bodyAttributes.toComponent()
    //     : false;
    const jsTags =
        props.files && props.files.js ? <Script src={props.files.js} /> : false;
    const innerHtml = {
        __html: props.children,
    };
    return (
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            {/** @todo CA-441 make that dynamic and not hardcoded */}
            <div id="portal" />
            <div id="root" dangerouslySetInnerHTML={innerHtml} />
            {jsTags}
        </body>
    );
}

export default Body;
