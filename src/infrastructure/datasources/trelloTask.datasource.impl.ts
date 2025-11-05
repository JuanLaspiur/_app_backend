import { CustomError, TrelloTaskDataSource, TrelloTaskEntity } from "../../domain";
import { jwtDto, CreateTrelloTaskDto, MoveTaskColumnDto, UpdateMemberTaskDto } from "../../domain/dtos";
import { TrelloTaskMapper } from "../mappers/trelloTask.mapper";
import * as trelloTaskUseCases from "../../domain/use-cases/trelloTask";

export class TrelloTaskDataSourceImpl implements TrelloTaskDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }


    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
        return userId;
    }
    async createTrelloTask(dto: jwtDto, createTaskDto: CreateTrelloTaskDto): Promise<TrelloTaskEntity> {
        try {
            this.authorize(dto);
            const trelloTask = await trelloTaskUseCases.Create.execute(createTaskDto);

            return TrelloTaskMapper.toEntity(trelloTask);
        } catch (error) {
            this.handleError(error);
        }
    }
    async getAllTrelloTaskByColumnId(dto: jwtDto, columnId: string): Promise<TrelloTaskEntity[]> {
        try {
            this.authorize(dto);
            const trelloTasks = await trelloTaskUseCases.GetAllByColumnId.execute(columnId);

            return TrelloTaskMapper.toEntities(trelloTasks);
        } catch (error) {
            this.handleError(error);
        }
    }
    async addMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity> {
        try {
            this.authorize(dto);
            const trelloTask = await trelloTaskUseCases.AddMember.execute(updateMemberTaskDto);

            return TrelloTaskMapper.toEntity(trelloTask);
        } catch (error) {
            this.handleError(error);
        }
    }
    async removeMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity> {
         try {
            this.authorize(dto);
            const trelloTask = await trelloTaskUseCases.RemoveMember.execute(updateMemberTaskDto);

            return TrelloTaskMapper.toEntity(trelloTask);
        } catch (error) {
            this.handleError(error);
        }
    }
    async moveTaskToColumn(dto: jwtDto, moveTaskColumnDto: MoveTaskColumnDto): Promise<TrelloTaskEntity> {
          try {
            this.authorize(dto);
            const trelloTask = await trelloTaskUseCases.MoveToColumn.execute(moveTaskColumnDto);
            return TrelloTaskMapper.toEntity(trelloTask);
        } catch (error) {
            this.handleError(error);
        }
    }
    async deleteTrelloTaskById(dto: jwtDto, taskId: string): Promise<void> {
            try {
            this.authorize(dto);
            const trelloTask = await trelloTaskUseCases.Delete.execute(taskId);
        } catch (error) {
            this.handleError(error);
        }
    }

}