import { Request, Response } from "express";
import { jwtDto, CreateCalendarTaskDto, UpdateCalendarTaskDto, DeleteCalendarTaskDto } from "../../domain/dtos";
import { CalendarTaskRepository, CustomError } from "../../domain";

export class CalendarTaskController {
  constructor(
    private readonly calendarTaskRepository: CalendarTaskRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) {}

  createCalendarTask(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) return this.handleError(CustomError.badRequest("Token missing"), res, 1);

    const [errorJwt, dtoJwt] = jwtDto.create({ token });
    if (errorJwt || !dtoJwt) return this.handleError(CustomError.unauthorized(errorJwt ?? "Invalid token"), res, 2);

    const [error, createCalendarTaskDto] = CreateCalendarTaskDto.create(req.body);
    if (error || !createCalendarTaskDto) return this.handleError(CustomError.badRequest(error ?? "Invalid data"), res, 3);

    this.calendarTaskRepository
      .createCalendarTask(dtoJwt!, createCalendarTaskDto!)
      .then(calendarTask => res.status(200).json(calendarTask))
      .catch(error => this.handleError(error, res, 4));
  }

  updateCalendarTask(req: Request, res: Response) {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (!token) return this.handleError(CustomError.badRequest("Token missing"), res, 1);

    const [errorJwt, dtoJwt] = jwtDto.create({ token });
    if (errorJwt || !dtoJwt) return this.handleError(CustomError.unauthorized(errorJwt ?? "Invalid token"), res, 2);

    const [error, updateCalendarTaskDto] = UpdateCalendarTaskDto.create({ ...req.body, id });
    if (error || !updateCalendarTaskDto) return this.handleError(CustomError.badRequest(error ?? "Invalid data"), res, 3);

    this.calendarTaskRepository
      .updateCalendarTask(dtoJwt!, updateCalendarTaskDto!)
      .then(calendarTask => res.status(200).json(calendarTask))
      .catch(error => this.handleError(error, res, 4));
  }

  deleteCalendarTask(req: Request, res: Response) {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (!token) return this.handleError(CustomError.badRequest("Token missing"), res, 1);

    const [errorJwt, dtoJwt] = jwtDto.create({ token });
    if (errorJwt || !dtoJwt) return this.handleError(CustomError.unauthorized(errorJwt ?? "Invalid token"), res, 2);

    const [error, deleteCalendarTaskDto] = DeleteCalendarTaskDto.create({ id });
    if (error || !deleteCalendarTaskDto) return this.handleError(CustomError.badRequest(error ?? "Invalid data"), res, 3);

    this.calendarTaskRepository
      .deleteCalendarTask(dtoJwt!, deleteCalendarTaskDto!)
      .then(() => res.status(200).json({ deleted: true, message: "Calendar task deleted successfully" }))
      .catch(error => this.handleError(error, res, 4));
  }

  getAllCalendarTaskByJWT(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) return this.handleError(CustomError.badRequest("Token missing"), res, 1);

    const [errorJwt, dtoJwt] = jwtDto.create({ token });
    if (errorJwt || !dtoJwt) return this.handleError(CustomError.unauthorized(errorJwt ?? "Invalid token"), res, 2);

    this.calendarTaskRepository
      .getAllCalendarTaskByJWT(dtoJwt!)
      .then(calendarTasks => res.status(200).json(calendarTasks))
      .catch(error => this.handleError(error, res, 3));
  }
}
