import React from "react";

import {Routes, UniversalRouteComponentProps} from "@pixeloven-react/routing";
import {Container, Icon, Responsive, Segment} from "semantic-ui-react";

function Default(props: UniversalRouteComponentProps) {
    const {routes} = props;
    return (
        <Responsive>
            <Container fluid={true}>
                {routes && <Routes as="switch" config={routes} />}
            </Container>
            <Container fluid={true}>
                <Segment inverted={true} vertical={true} textAlign="center">
                    <p>
                        Powered with <Icon name="heart" /> by PixelOven
                    </p>
                </Segment>
            </Container>
        </Responsive>
    );
}

export default Default;
