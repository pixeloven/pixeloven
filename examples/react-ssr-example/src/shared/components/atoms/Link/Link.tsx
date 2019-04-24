import * as React from "react";

interface LinkProps {
    href: string | string[];
    rel: "icon" | "preload" | "stylesheet";
    as?: "font" | "script" | "style";
    type?: "text/css" | "font/woff2";
    crossOrigin?: "anonymous";
}

/**
 * Renders Style sheet tags from an array
 * @param props
 */
function Link(props: LinkProps) {
    if (typeof props.href === "string") {
        return (
            <link
                href={props.href}
                rel={props.rel}
                type={props.type}
                crossOrigin="anonymous"
            />
        );
    }
    const files = props.href
        ? props.href.map((href, index) => (
              <link key={index} href={href} rel={props.rel} type={props.type} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
}

export default Link;
