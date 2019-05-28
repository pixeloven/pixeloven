import { Body, Head } from "@server/views";
import { State } from "@shared/store/types";
import React from "react";
import { HelmetData } from "react-helmet";

interface HtmlProps {
    children: React.ReactNode;
    files?: Express.Files;
    initialState?: State;
    helmet?: HelmetData;
    lang: string;
}

const Html = (props: HtmlProps) => {
    return (
        <html lang={props.lang}>
            <Head files={props.files} helmet={props.helmet} />
            <Body files={props.files} initialState={props.initialState}>
                {props.children}
            </Body>
        </html>
    );
};

export default Html;
