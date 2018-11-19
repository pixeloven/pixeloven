import { Route, RouteComponentProps } from "@shared/components";
import * as React from "react";
import { Link, Switch } from "react-router-dom";
import {
    Container,
    Icon,
    Responsive,
    Segment,
    Visibility,
} from "semantic-ui-react";
import { MainMenu, MenuItem } from "../../molecules";

interface State {
    fixedTopMenu: boolean;
}

class Default extends React.PureComponent<RouteComponentProps, State> {
    public state: State = {
        fixedTopMenu: false,
    };

    public stickMainMenu = (): void => {
        this.setState({ fixedTopMenu: true });
    };

    public unStickMainMenu = (): void => {
        this.setState({ fixedTopMenu: false });
    };

    public render(): React.ReactNode {
        const { routes, match } = this.props;
        const { fixedTopMenu } = this.state;
        const mappedSubRoutes = routes
            ? routes.map((route, index) => <Route key={index} {...route} />)
            : undefined;
        const items: MenuItem[] = [
            { name: "Home", path: "/", active: true },
            { name: "Blog", path: "/blog", active: false },
            { name: "Sagas", path: "/sagas", active: false },
        ];
        items.forEach((item, index) => {
            items[index].active = match.isExact
                ? match.path === item.path
                : match.path.startsWith(item.path);
        });
        return (
            <Responsive>
                <Container fluid={true}>
                    <Visibility
                        onBottomPassed={this.stickMainMenu}
                        onBottomVisible={this.unStickMainMenu}
                        once={false}
                    >
                        <MainMenu
                            as={Link}
                            items={items}
                            fixed={fixedTopMenu}
                        />
                    </Visibility>
                </Container>
                <Container fluid={true}>
                    <Switch>{mappedSubRoutes}</Switch>
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
}

export default Default;
