import { Script } from "@server/views";
import { State } from "@shared/store/types";
import React from "react";

interface BodyProps {
    children: React.ReactNode;
    files?: Express.Files;
    initialState?: State;
}

const Body = (props: BodyProps) => {
    const serializedState = JSON.stringify(props.initialState);
    const jsTags =
        props.files && props.files.js ? (
            <Script src={props.files.js} />
        ) : (
            undefined
        );
    const html = {
        __html: `window.INIT_STATE = ${serializedState};`,
    };
    return (
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="portal" />
            <div id="root">{props.children}</div>
            <script dangerouslySetInnerHTML={html} />
            {jsTags}
        </body>
    );
};

export default Body;
