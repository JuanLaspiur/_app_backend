import { CustomError } from "../../domain";
import { Request, Response } from "express";

export function handleErrorController(error: unknown, res: Response, num?: number) {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error', message: error, num });
}
