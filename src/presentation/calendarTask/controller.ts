import { Request, Response } from "express";
import { jwtDto, CreateCalendarTaskDto, UpdateCalendarTaskDto, DeleteCalendarTaskDto } from "../../domain/dtos";
import { CalendarTaskRepository, CustomError } from "../../domain";

export class CalendarTaskController {

    constructor(private readonly calendarTaskRepository: CalendarTaskRepository) { }
    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }


    createCalendarTask(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return res.status(400);
        const [errorJwt, dtoJwt] = jwtDto.create({ token });
        if (errorJwt) return this.handleError(errorJwt, res)

        const [error, createCalendarTaskDto] = CreateCalendarTaskDto.create(req.body);

        if (error) return this.handleError(error, res)

        this.calendarTaskRepository.createCalendarTask(dtoJwt!, createCalendarTaskDto!).
            then(calendarTask => res.status(200).json(calendarTask))
            .catch(error => this.handleError(error, res));

    }


    updateCalendarTask(req: Request, res: Response) {
        const token = req.headers.authorization;
        const { id } = req.params;
        if (!token) return res.status(400);

        const [errorJwt, dtoJwt] = jwtDto.create({ token });
        if (errorJwt) return this.handleError(errorJwt, res)

        const [error, updateNotificationDto] = UpdateCalendarTaskDto.create({ ...req.body, id });
        if (error) return this.handleError(error, res)
        this.calendarTaskRepository
            .updateCalendarTask(dtoJwt!, updateNotificationDto!)
            .then((calendarTask) => res.status(200).json(calendarTask))
            .catch((error) => this.handleError(error, res));

    }


    deleteCalendarTask(req: Request, res: Response) {
        const token = req.headers.authorization;
        const { id } = req.params;
        if (!token) return res.status(400);

        const [errorJwt, dtoJwt] = jwtDto.create({ token });
        if (errorJwt) return this.handleError(errorJwt, res)

        const [error, updateNotificationDto] = DeleteCalendarTaskDto.create({ id });
        if (error) return this.handleError(error, res)
        this.calendarTaskRepository
            .deleteCalendarTask(dtoJwt!, updateNotificationDto!)
           .then(() => res.status(200).json({ deleted: true, message: "Calendar task deleted successfully" }))
           .catch((error) => this.handleError(error, res));

    }


    getAllCalendarTaskByJWT(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return res.status(400);

        const [errorJwt, dtoJwt] = jwtDto.create({ token });
        if (errorJwt) return this.handleError(errorJwt, res)


        this.calendarTaskRepository
            .getAllCalendarTaskByJWT(dtoJwt!)
             .then((calendarTasks) => res.status(200).json(calendarTasks))
            .catch((error) => this.handleError(error, res));

    }


}