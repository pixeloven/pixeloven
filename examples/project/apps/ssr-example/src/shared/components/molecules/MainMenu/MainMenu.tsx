import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";

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

interface MainMenuProps {
    as?: React.ReactNode | string;
    fixed?: boolean;
}

function MainMenu(props: MainMenuProps) {
    const { as, fixed } = props;
    const menuStyles = fixed ? fixedMenuStyle : menuStyle;
    const [activeItem, setActiveItem] = useState("home");
    return (
        <Menu
            borderless={true}
            style={menuStyles}
            {...(fixed && { fixed: "top" })}
        >
            <Container>
                <Menu.Item
                    as={as}
                    to="/"
                    name="home"
                    active={activeItem === "home"}
                    onClick={() => setActiveItem("home")}
                />
                <Menu.Item
                    as={as}
                    to="/blog"
                    name="blog"
                    active={activeItem === "blog"}
                    onClick={() => setActiveItem("blog")}
                />
            </Container>
        </Menu>
    );
}

export default MainMenu;
