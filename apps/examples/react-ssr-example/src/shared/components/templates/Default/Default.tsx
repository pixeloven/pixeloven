import { RouteComponentProps, Routes } from "@pixeloven-react/routing";
import { MainMenu } from "@shared/components/molecules";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Responsive, Segment } from "semantic-ui-react";

function Default(props: RouteComponentProps) {
    const { routes } = props;
    return (
        <Responsive>
            <Container fluid={true}>
                <MainMenu as={Link} fixed={false} />
            </Container>
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
