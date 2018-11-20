import * as React from "react";
import { Container, Menu } from "semantic-ui-react";
import { MenuItem, MenuItemArray } from "../";

import "./MainMenu.scss";

const menuStyle = {
    border: "none",
    boxShadow: "none",
    marginBottom: "1em",
    marginTop: "1em",
};

const fixedMenuStyle = {
    border: "none",
    boxShadow: "none",
};

interface DefaultProps {
    as: string;
}

interface Props {
    as?: string | React.ReactNode;
    fixed?: boolean;
    items: MenuItem[];
}

class MainMenu extends React.Component<Props> {
    public static defaultProps: DefaultProps = {
        as: "a",
    };

    public render(): React.ReactNode {
        const { as, fixed, items } = this.props;
        const menuStyles = fixed ? fixedMenuStyle : menuStyle;
        return (
            <Menu
                borderless={true}
                style={menuStyles}
                {...fixed && { fixed: "top" }}
            >
                <Container text={true}>
                    <MenuItemArray as={as} items={items} />
                </Container>
            </Menu>
        );
    }
}

export default MainMenu;
