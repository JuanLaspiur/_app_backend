import { TrelloTaskDataSource, TrelloTaskEntity, TrelloTaskRepository } from "../../domain";
import { jwtDto, CreateTrelloTaskDto } from "../../domain/dtos";

export class TrelloTaskRepositoryImpl implements TrelloTaskRepository {

    constructor(private readonly dataSource: TrelloTaskDataSource) { }

    createTrelloTask(dto: jwtDto, createTaskDto: CreateTrelloTaskDto): Promise<TrelloTaskEntity> {
        return this.dataSource.createTrelloTask(dto, createTaskDto);
    }
    getAllTrelloTaskByColumnId(dto: jwtDto, columnId: string): Promise<TrelloTaskEntity[]> {
        return this.dataSource.getAllTrelloTaskByColumnId(dto, columnId);
    }



}