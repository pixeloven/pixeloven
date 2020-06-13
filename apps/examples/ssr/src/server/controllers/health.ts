import {Request, Response} from "express";

/**
 * Health check up
 * @param req
 * @param res
 */
export default (req: Request, res: Response): void => {
    res.status(200).send("OK");
};
