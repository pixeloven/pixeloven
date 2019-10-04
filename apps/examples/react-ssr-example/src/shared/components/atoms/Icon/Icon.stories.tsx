import Readme from "./README.md";

import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Icon from "./Icon";

storiesOf("Components/Atoms/Icon", module).add(
    "Default",
    () => {
        const fontSize = text("container font-size", "");
        const fontColor = text("container color", "");
        const className = text("className", "");
        const iconType = text("iconType", "ui");
        const iconName = text("iconName", "search");
        const isAfterText = boolean("isAfterText", false);
        const isBeforeText = boolean("isBeforeText", false);
        const isLarge = boolean("isLarge", false);
        return (
            <div style={{ fontSize, color: fontColor }}>
                {`${isAfterText ? "Leading text" : ""}`}
                <Icon
                    iconType={iconType}
                    iconName={iconName}
                    className={className}
                    {...(isAfterText ? { isAfterText } : {})}
                    {...(isBeforeText ? { isBeforeText } : {})}
                    {...(isLarge ? { isLarge } : {})}
                />
                {`${isBeforeText ? "Trailing text" : ""}`}
            </div>
        );
    },
    {
        notes: { markdown: Readme },
    },
);
