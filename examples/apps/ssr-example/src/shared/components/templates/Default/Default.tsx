import React from "react";

import {Routes, UniversalRouteComponentProps} from "@pixeloven-react/routing";

function Default(props: UniversalRouteComponentProps) {
    const {routes} = props;
    return <div>{routes && <Routes as="switch" config={routes} />}</div>;
}

export default Default;
