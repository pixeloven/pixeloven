import { NextFunction, Request, Response } from "express";

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
        res.status(500).send(err.message);
    }
};

export default handler;
