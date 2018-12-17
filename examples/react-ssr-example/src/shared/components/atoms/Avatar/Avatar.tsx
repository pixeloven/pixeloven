import classNames from "classnames";
import * as React from "react";
import { Icon } from "../Icon";

import "./Avatar.scss";

interface Props {
    avatarInitials?: string;
    avatarName?: string;
    avatarURL?: string;
    className?: string;
}

class Avatar extends React.Component<Props> {
    public render() {
        const { avatarURL, avatarInitials, avatarName, className } = this.props;
        const avatarClasses = classNames(className, {
            "a-avatar": true,
            "a-avatar--anonymous": !avatarURL && !avatarInitials,
            "a-avatar--initials": !avatarURL && avatarInitials,
        });
        // TODO Update the url pattern to match the image service
        const srcSet = `
            ${avatarURL}/38,
            ${avatarURL}/76 2x,
            ${avatarURL}/114 3x,
            ${avatarURL}/152 4x
        `;

        if (avatarURL) {
            return (
                <img
                    alt={`${avatarName ? avatarName : ""}`}
                    className={avatarClasses}
                    src={`${avatarURL}/38`}
                    srcSet={srcSet}
                />
            );
        } else if (avatarInitials) {
            return <div className={avatarClasses}>{avatarInitials}</div>;
        }

        // Always default to an anonymous user if the above conditions failed
        // TODO: Update iconName when correct icon becomes available
        return (
            <div className={avatarClasses}>
                <Icon iconType="value-prop" iconName="add-people" />
            </div>
        );
    }
}

export default Avatar;
