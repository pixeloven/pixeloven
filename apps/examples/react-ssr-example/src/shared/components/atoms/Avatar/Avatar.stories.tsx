import Readme from "./README.md";

import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Avatar from "./Avatar";

storiesOf("Components/Atoms/Avatar", module)
    .add(
        "Avatar with an image",
        () => {
            const className = text("className", "");
            const avatarName = text("avatarName", "User Name");
            const avatarURL = text("avatarURL", "http://i.pravatar.cc");

            return (
                <Avatar
                    avatarName={avatarName}
                    avatarURL={avatarURL}
                    className={className}
                />
            );
        },
        {
            notes: { markdown: Readme },
        },
    )
    .add(
        "Avatar without an image",
        () => {
            const avatarInitials = text("avatarInitials", "UN");
            const className = text("className", "");

            return (
                <Avatar avatarInitials={avatarInitials} className={className} />
            );
        },
        {
            notes: { markdown: Readme },
        },
    )
    .add(
        "anonymous user Avatar",
        () => {
            const className = text("className", "");

            return <Avatar className={className} />;
        },
        {
            notes: { markdown: Readme },
        },
    );
