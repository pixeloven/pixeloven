import { RouteComponentProps, Routes } from "@pixeloven-react/routing";
import { Favicon } from "@shared/components/molecules";
import React from "react";
import { Helmet } from "react-helmet";

type DefaultProps = RouteComponentProps;

/**
 * @todo Implement Material-UI. Use this as inspiration?
 * https://github.com/creativetimofficial/material-kit-react
 */
function Default(props: DefaultProps) {
    const { routes } = props;
    return (
        <React.Fragment>
            <Helmet>
                <title>PixelOven</title>
                <Favicon />
            </Helmet>
            <h1>Coming Soon</h1>
            {routes && <Routes as="switch" config={routes} />}
        </React.Fragment>
    );
}

export default Default;
