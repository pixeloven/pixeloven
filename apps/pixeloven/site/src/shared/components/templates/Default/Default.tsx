import { Routes, UniversalRouteComponentProps } from "@pixeloven-react/routing";
import React from "react";
import { Helmet } from "react-helmet";

function Default(props: UniversalRouteComponentProps) {
    const { routes } = props;
    return (
        <React.Fragment>
            <Helmet titleTemplate="%s | React App" />
            {routes && <Routes as="switch" config={routes} />}
        </React.Fragment>
    );
}

export default Default;
