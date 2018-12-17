import ansiHTML from "ansi-html";
import { NextFunction, Request, Response } from "express";
import { AllHtmlEntities } from "html-entities";

const entities = new AllHtmlEntities();

const styles = {
    "background": "rgba(0,0,0,0.85)",
    "bottom": 0,
    "color": "#E8E8E8",
    "font-family": "Menlo, Consolas, monospace",
    "font-size": "13px",
    "left": 0,
    "line-height": "1.2",
    "overflow": "auto",
    "padding": "10px",
    "position": "fixed",
    "right": 0,
    "text-align": "left",
    "top": 0,
    "white-space": "pre",
    "z-index": 9999,
};

const colors = {
    "black": "181818",
    "blue": "7CAFC2",
    "cyan": "C3C2EF",
    "darkgrey": "6D7891",
    "green": "B3CB74",
    "lightgrey": "EBE7E3",
    "magenta": "7FACCA",
    "red": "E36049",
    "reset": ["transparent", "transparent"],
    "yellow": "FFD080",
};

function problemType(type: string) {
    const problemColors = {
        errors: colors.red,
        warnings: colors.yellow,
    };
    const color = problemColors[type] || colors.red;
    return (
        '<span style="background-color:#' +
        color +
        '; color:#fff; padding:2px 4px; border-radius: 2px">' +
        type.slice(0, -1).toUpperCase() +
        "</span>"
    );
}

function renderProblem(type: string, msg: string) {
    msg = ansiHTML(entities.encode(msg));
    const problem = problemType(type) + " in " + msg;
    return '<div style="margin-bottom: 26px">' + problem + "</div>";
}

function renderProblems(type: string, lines: string[]) {
    const inlineStyles: string[] = [];
    for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
            inlineStyles.push(`${key}: ${styles[key]}`);
        }
    }
    const problems: string[] = [];
    lines.forEach(msg => problems.push(renderProblem(type, msg)));
    return (
        "<html>" +
        "<body style=\"" +
        inlineStyles.join(";") +
        "\">" +
        problems.join() +
        "</body>" +
        "</html>"
    );
}

/**
 * Handle errors
 * @param err
 * @param req
 * @param res
 * @param next
 */
const handler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        next(err);
    } else {
        const messages = [err.message];
        if (err.stack) {
            messages.push(err.stack);
        }
        res.status(500).send(renderProblems("error", messages));
    }
};

export default handler;
