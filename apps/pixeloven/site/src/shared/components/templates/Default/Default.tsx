import { RouteComponentProps, Routes } from "@pixeloven-react/routing";
import React from "react";
import { Helmet } from "react-helmet";

type DefaultProps = RouteComponentProps;

function Default(props: DefaultProps) {
    const { routes } = props;
    return (
        <React.Fragment>
            <Helmet titleTemplate="%s | React App" />
            {routes && <Routes as="switch" config={routes} />}
        </React.Fragment>
    );
}

export default Default;
