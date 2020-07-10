/* tslint:disable no-any */

import ansiHTML from "ansi-html";
import { AllHtmlEntities } from "html-entities";
import type { ClientOverlayOptions } from "./types";

const entities = new AllHtmlEntities();

const clientOverlay = document.createElement("div");
clientOverlay.id = "webpack-hot-middleware-clientOverlay";

const styles = {
    background: "rgba(0,0,0,0.85)",
    color: "#e8e8e8",
    lineHeight: "1.6",
    whiteSpace: "pre",
    fontFamily: "Menlo, Consolas, monospace",
    fontSize: "13px",
    position: "fixed",
    zIndex: 999999,
    padding: "10px",
    left: 0,
    right: 0, // why aren't these working
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    dir: "ltr",
    textAlign: "left",
};

const colors = {
    reset: ["transparent", "transparent"],
    black: "181818",
    red: "ff3348",
    green: "3fff4f",
    yellow: "ffd30e",
    blue: "169be0",
    magenta: "f840b7",
    cyan: "0ad8e9",
    lightgrey: "ebe7e3",
    darkgrey: "6d7891",
};

function showProblems(type: string, lines: string[]) {
    clientOverlay.innerHTML = "";
    lines.forEach((msg: string) => {
        msg = ansiHTML(entities.encode(msg));
        const div = document.createElement("div");
        div.style.marginBottom = "26px";
        div.innerHTML = problemType(type) + " in " + msg;
        clientOverlay.appendChild(div);
    });
    if (document.body) {
        document.body.appendChild(clientOverlay);
    }
}

export function clear() {
    if (document.body && clientOverlay.parentNode) {
        document.body.removeChild(clientOverlay);
    }
}

export function problemType(type: string) {
    const problemColors = {
        errors: colors.red,
        warnings: colors.yellow,
    };
    const color = problemColors[type] || colors.red;
    return (
        '<span style="background-color:#' +
        color +
        '; color:#000000; padding:3px 6px; border-radius: 4px;">' +
        type.slice(0, -1).toUpperCase() +
        "</span>"
    );
}

export default function (options: ClientOverlayOptions) {
    for (const color in options.ansiColors) {
        if (options.ansiColors[color]) {
            if (color in colors) {
                colors[color] = options.ansiColors[color];
            }
            ansiHTML.setColors(colors);
        }
    }

    for (const style in options.overlayStyles) {
        if (options.overlayStyles[style]) {
            styles[style] = options.overlayStyles[style];
        }
    }

    for (const key in styles) {
        if (styles[key]) {
            clientOverlay.style[key] = styles[key];
        }
    }

    return {
        showProblems,
        clear,
    };
}
