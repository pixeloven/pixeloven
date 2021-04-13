import React from "react";

import Logo from "./Logo";

interface LogoStoryProps {
    speed: string;
}

export default {
    component: Logo,
    title: "@examples/component-library/atoms/Logo",
};

export const Primary = (props: LogoStoryProps) => <Logo speed={props.speed} />;

Primary.args = {
    speed: "20s",
};
