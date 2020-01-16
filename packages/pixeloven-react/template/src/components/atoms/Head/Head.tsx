import React from "react";
import { HelmetData } from "react-helmet";

interface HtmlProps {
    children: React.ReactNode;
    helmet?: HelmetData;
}

function Head(props: HtmlProps) {
    const { children, helmet } = props;
    return (
        <head>
            {helmet && helmet.title.toComponent()}
            {helmet && helmet.meta.toComponent()}
            {helmet && helmet.link.toComponent()}
            {children}
        </head>
    );
}

export default Head;
