import { Request, Response } from "express";
import { jwtDto, CreateTrelloTaskDto, MoveTaskColumnDto, UpdateMemberTaskDto } from "../../domain/dtos";
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


    async addMember(req: Request, res: Response) {
        try {
            const [errordto, addMemberDto] = UpdateMemberTaskDto.create(req.body);
            if (errordto || !addMemberDto) throw CustomError.badRequest('Error bad request addMember ');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            const task = await this.trelloTaskRepository.addMember(dto, addMemberDto);
            return res.status(201).json(task);

        } catch (error) {
            this.handleError(error, res);
        }
    }
    async removeMember(req: Request, res: Response) {
        try {
            const [errordto, removeMemberDto] = UpdateMemberTaskDto.create(req.body);
            if (errordto || !removeMemberDto) throw CustomError.badRequest('Error bad request removeMember ');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            const task = await this.trelloTaskRepository.removeMember(dto, removeMemberDto);
            return res.status(201).json(task);

        } catch (error) {
            this.handleError(error, res);
        }
    }

  async moveTaskToColumn(req: Request, res: Response) {
        try {
            const [errordto, moveTaskDto] = MoveTaskColumnDto.create(req.body);
            if (errordto || !moveTaskDto) throw CustomError.badRequest('Error bad request moveColum ');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            const task = await this.trelloTaskRepository.moveTaskToColumn(dto, moveTaskDto);
            return res.status(201).json(task);

        } catch (error) {
            this.handleError(error, res);
        }
    }


  async deleteTrelloTaskById(req: Request, res: Response) {
      try {
            const taskId = req.params.taskId;
            if (!taskId) throw CustomError.badRequest('Error bad request delete TrelloTask not found taskId ');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            await this.trelloTaskRepository.deleteTrelloTaskById(dto, taskId);
            return res.status(201).json({message:`TrelloTask id:${taskId} has been deleted successful`});

        } catch (error) {
            this.handleError(error, res);
        }
  }

}