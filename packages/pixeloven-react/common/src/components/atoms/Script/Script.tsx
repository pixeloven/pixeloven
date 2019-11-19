import React from "react";

interface ScriptProps {
    async?: boolean;
    defer?: boolean;
    src?: string | string[];
}

/**
 * Renders Script tags from an array
 * @param props
 */
function Script(props: ScriptProps) {
    const { async, defer, src } = props;
    if (Array.isArray(src)) {
        const scripts = src.map((value, index) => (
            <script
                key={index}
                type="text/javascript"
                src={value}
                defer={defer || true}
                async={async || true}
            />
        ));
        return <React.Fragment>{scripts}</React.Fragment>;
    }
    return src ? (
        <script
            type="text/javascript"
            src={src}
            defer={defer || true}
            async={async || true}
        />
    ) : (
        <React.Fragment />
    );
}

export default Script;
