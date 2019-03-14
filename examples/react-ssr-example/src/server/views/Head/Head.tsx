import { Link } from "@server/views";
import * as React from "react";
import { HelmetData } from "react-helmet";

interface HtmlProps {
    files?: Express.Files;
    helmet?: HelmetData;
}

const Head = (props: HtmlProps) => {
    const cssTags =
        props.files && props.files.css ? (
            <Link href={props.files.css} rel="stylesheet" type="text/css" />
        ) : (
            undefined
        );
    return (
        <head>
            {props.helmet && props.helmet.title.toComponent()}
            {props.helmet && props.helmet.meta.toComponent()}
            {props.helmet && props.helmet.link.toComponent()}
            <Link href="favicon.ico" rel="icon" />
            {cssTags}
        </head>
    );
};

export default Head;
