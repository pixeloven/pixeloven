import { Script } from "@server/views";
import { State } from "@shared/store/types";
import React from "react";
import { HelmetData } from "react-helmet";

interface BodyProps {
    children: string;
    files?: {
        css?: string[];
        js?: string[];
    };
    initialState?: State;
    helmet?: HelmetData;
}

function Body(props: BodyProps) {
    const bodyAttrs = props.helmet
        ? props.helmet.bodyAttributes.toComponent()
        : {};
    const serializedState = JSON.stringify(props.initialState);
    const jsTags =
        props.files && props.files.js ? <Script src={props.files.js} /> : false;
    const innerHtml = {
        __html: props.children,
    };
    const initialState = {
        __html: `window.initialState = ${serializedState};`,
    };
    return (
        <body {...bodyAttrs}>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            {/** @todo CA-441 make that dynamic and not hardcoded */}
            <div id="portal" />
            <div id="root" dangerouslySetInnerHTML={innerHtml} />
            <script dangerouslySetInnerHTML={initialState} />
            {jsTags}
        </body>
    );
}

export default Body;
