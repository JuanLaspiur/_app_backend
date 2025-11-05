import { Request, Response } from "express";
import { jwtDto, CreateTrelloTaskDto } from "../../domain/dtos";
import { CustomError, TrelloTaskRepository } from "../../domain";

export class TrelloTaskController {
    constructor(
        private readonly trelloTaskRepository: TrelloTaskRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }


    async createTrelloTask(req: Request, res: Response) {
        try {
            const [errorTask, createTaskDto] = CreateTrelloTaskDto.create(req.body);
            if (errorTask || !createTaskDto) throw CustomError.badRequest(errorTask ? errorTask : 'Error bad request create task body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const task = await this.trelloTaskRepository.createTrelloTask(dto, createTaskDto);
            return res.status(201).json(task);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getAllTrelloTaskByColumnId(req: Request, res: Response) {
        try {
            const columnId = req.params.columnId;
            if (!columnId) throw CustomError.badRequest('Error bad request getting tasks not found :columnId by url params ');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const tasks = await this.trelloTaskRepository.getAllTrelloTaskByColumnId(dto, columnId);
            return res.status(201).json(tasks);

        } catch (error) {
            this.handleError(error, res);
        }
    }

}