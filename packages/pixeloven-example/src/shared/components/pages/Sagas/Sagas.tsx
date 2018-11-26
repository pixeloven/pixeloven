import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps } from "react-router-dom";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import { Logo } from "../../atoms/";

export interface SagasProps extends RouteComponentProps {
    incrementAsync:
        | ((event: React.MouseEvent<HTMLButtonElement>) => void)
        | undefined;
}

export default class Sagas extends React.Component<SagasProps> {
    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Saga test page</title>
                    <meta name="description" content="Home page and stuff" />
                </Helmet>
                <Grid.Row>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment
                                    inverted={true}
                                    vertical={true}
                                    textAlign="center"
                                >
                                    <Container>
                                        <Logo speed="10s" />
                                        <Header as="h1" inverted={true}>
                                            Saga test page
                                        </Header>
                                        <p>ooooOOOooOOO sagas</p>
                                        <button
                                            onClick={this.props.incrementAsync}
                                        >
                                            Increment after 1 second
                                        </button>
                                    </Container>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
            </React.Fragment>
        );
    }
}
