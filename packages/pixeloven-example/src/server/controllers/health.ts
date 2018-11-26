import { Request, Response, Router } from "express";

/**
 * Create router
 */
const router = Router();

/**
 * Health check up
 * @param req
 * @param res
 */
router.get(
    "/health",
    (req: Request, res: Response): void => {
        res.status(200).send("OK");
    },
);

export default router;
