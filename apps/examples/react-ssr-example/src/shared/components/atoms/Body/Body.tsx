import React from "react";
import { HelmetData } from "react-helmet";

interface BodyProps {
    children: string;
    scripts?: React.ReactNode;
    state?: object; // Todo make generic
    helmet?: HelmetData;
}

function Body(props: BodyProps) {
    const { children, scripts, state } = props;
    const serializedState = JSON.stringify(state || {});
    const innerHTML = {
        __html: children,
    };
    const initialState = {
        __html: `window.initialState = ${serializedState};`,
    };
    return (
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root" dangerouslySetInnerHTML={innerHTML} />
            <script dangerouslySetInnerHTML={initialState} />
            {scripts}
        </body>
    );
}

export default Body;
