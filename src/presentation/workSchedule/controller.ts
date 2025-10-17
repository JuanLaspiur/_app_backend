import { Request, Response } from "express";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../../domain/dtos";
import { CustomError, WorkScheduleRepository } from "../../domain";

export class WorkScheduleController {
  constructor(
    private readonly workScheduleRepository: WorkScheduleRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) {}

  async createWorkSchedule(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);

      const [error, createDto] = CreateWorkScheduleDto.create(req.body);
      if (error || !createDto) throw CustomError.badRequest("Invalid data: " + error);

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
      if (!token) throw CustomError.badRequest("Missing token");

      const [error, dto] = jwtDto.create({ token });
      if (error || !dto) throw CustomError.unauthorized(`${error}`);

      const schedules = await this.workScheduleRepository.getAllUserWorkShedules(dto);
      return res.status(200).json(schedules);

    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteWorkSchedule(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest("Missing schedule ID");

      await this.workScheduleRepository.deleteWorkShedule(id);
      return res.status(204).send();

    } catch (error) {
      this.handleError(error, res, 4);
    }
  }

  async deleteAllUserWorkSchedules(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw CustomError.badRequest("Missing token");

      const [error, dto] = jwtDto.create({ token });
      if (error || !dto) throw CustomError.unauthorized(error ?? "Invalid token");

      await this.workScheduleRepository.deleteAllUserWorkShedules(dto);
      return res.status(204).send();

    } catch (error) {
      this.handleError(error, res, 5);
    }
  }
}
