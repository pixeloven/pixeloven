import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";

class NoMatch extends React.Component<RouteComponentProps> {
    public render(): React.ReactNode {
        return (
            <Grid.Row>
                <Grid.Column>
                    <Container textAlign={"center"}>
                        <h1 style={{ fontSize: 128 }}>Meow</h1>
                        <h2>This page doesn't exist.</h2>
                        <p style={{ fontSize: 36 }}>( ^..^)</p>
                        <p style={{ fontSize: 18 }}>
                            <a href={"/"}>Home</a> / <a href={"/blog"}>Blog</a>
                        </p>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default NoMatch;
