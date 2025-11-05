import { TrelloTaskEntity } from "../entities/trelloTask.entity";
import { jwtDto, CreateTrelloTaskDto } from "../dtos";

export abstract class TrelloTaskDataSource {
    abstract createTrelloTask(dto:jwtDto, createTaskDto:CreateTrelloTaskDto):Promise<TrelloTaskEntity>;
    abstract getAllTrelloTaskByColumnId(dto:jwtDto, columnId:string):Promise<TrelloTaskEntity[]>;


}