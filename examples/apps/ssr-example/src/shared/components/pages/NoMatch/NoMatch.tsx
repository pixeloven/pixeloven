import React from "react";

import {UniversalRouteComponentProps} from "@pixeloven-react/routing";

class NoMatch extends React.Component<UniversalRouteComponentProps> {
    public render(): React.ReactNode {
        return <p>No Match</p>;
    }
}

export default NoMatch;
