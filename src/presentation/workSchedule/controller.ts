import { Request, Response } from "express";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../../domain/dtos";
import { CustomError, WorkScheduleRepository } from "../../domain";

export class WorkScheduleController {
    constructor(
        private readonly workScheduleRepository: WorkScheduleRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createWorkSchedule(req: Request, res: Response) {
  
        try {
            const token = req.headers.authorization;
            if (!token)
                return this.handleError(CustomError.badRequest("Missing token"), res, 1);
            const [errorJWT, dto] = jwtDto.create({ token }); 
            if (errorJWT || !dto)
                return this.handleError(CustomError.badRequest("Invalid token"+errorJWT), res, 2);

            const [error, createDto] = CreateWorkScheduleDto.create(req.body);

            if (error || !createDto)
                throw CustomError.badRequest("Invalid data:  " +error);

            const workSchedule = await this.workScheduleRepository.createWorkShedule(dto, createDto);
            return res.status(201).json(workSchedule);
        } catch (error) {
            this.handleError(error, res, 3);
        }
    }


    async updateWorkSchedule(req: Request, res: Response) {
        try {
            const [error, updateDto] = UpdateWorkScheduleDto.create({ id: req.params.id, ...req.body });
            if (error || !updateDto) throw CustomError.badRequest(error ?? "Invalid update data");

            const updated = await this.workScheduleRepository.updateWorkShedule(updateDto);
            return res.status(200).json(updated);
        } catch (error) {
            this.handleError(error, res, 1);
        }
    }

    async getAllUserWorkSchedule(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (!token)
                return this.handleError(CustomError.badRequest("Missing token"), res, 1);
            const [error, dto] = jwtDto.create({ token });
            if (error || !dto)
                return this.handleError(CustomError.unauthorized(`${error}`), res, 2);
            const schedules = await this.workScheduleRepository.getAllUserWorkShedules(dto);

            return res.status(200).json(schedules);
        } catch (error) {
            this.handleError(error, res, 1);
        }
    }
}
