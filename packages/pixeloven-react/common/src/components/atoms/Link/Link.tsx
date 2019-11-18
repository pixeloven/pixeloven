import React from "react";

interface LinkProps {
    href?: string | string[];
    rel: "icon" | "preload" | "stylesheet";
    type?: "text/css" | "font/woff2";
}

function Link(props: LinkProps) {
    const { href, rel, type } = props;
    if (Array.isArray(href)) {
        const links = href.map((value, index) => (
            <link key={index} href={value} rel={rel} type={type} />
        ));
        return <React.Fragment>{links}</React.Fragment>;
    }
    return href ? (
        <link href={href} rel={rel} type={type} />
    ) : (
        <React.Fragment />
    );
}

export default Link;
