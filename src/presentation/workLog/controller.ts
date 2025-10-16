import { Request, Response } from "express";
import { jwtDto } from "../../domain/dtos";
import { CustomError, WorkLogRepository } from "../../domain";

export class WorkLogController {

    constructor(
        private readonly workLogRepository: WorkLogRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }



    async openLog(req: Request, res: Response) {
        const token = req.headers.authorization;
        const scheduleId = req.params.id;
        if (!token)
            return this.handleError(CustomError.badRequest("Missing token"), res, 1);
        const [errorJWT, dto] = jwtDto.create({ token });
        if (errorJWT || !dto)
            return this.handleError(CustomError.badRequest("Invalid token" + errorJWT), res, 2);

        if (!scheduleId)
            return this.handleError(CustomError.badRequest("Missing scheduleId"), res, 3);
        this.workLogRepository.createLog(dto, scheduleId);

    }



    async closeLog(req: Request, res: Response) {
        const token = req.headers.authorization;
        const logId = req.params.id;
        if (!token)
            return this.handleError(CustomError.badRequest("Missing token"), res, 1);
        const [errorJWT, dto] = jwtDto.create({ token });
        if (errorJWT || !dto)
            return this.handleError(CustomError.badRequest("Invalid token" + errorJWT), res, 2);
        if (!logId)
            return this.handleError(CustomError.badRequest("Missing scheduleId"), res, 3);
        this.workLogRepository.closeLog(dto, logId);


    }



    async getAllUserLogs(req: Request, res: Response) {

    }



    async deleteLog(req: Request, res: Response) {

    }



    async deleteAllUserWorkSchedules(req: Request, res: Response) {

    }
}