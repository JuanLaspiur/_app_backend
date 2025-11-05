import { TrelloTaskEntity } from "../entities/trelloTask.entity";
import { jwtDto, CreateTrelloTaskDto, UpdateMemberTaskDto, MoveTaskColumnDto } from "../dtos";

export abstract class TrelloTaskDataSource {
    abstract createTrelloTask(dto: jwtDto, createTaskDto: CreateTrelloTaskDto): Promise<TrelloTaskEntity>;
    abstract getAllTrelloTaskByColumnId(dto: jwtDto, columnId: string): Promise<TrelloTaskEntity[]>;
    abstract addMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity>;
    abstract removeMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity>;
    abstract moveTaskToColumn(dto: jwtDto, moveTaskColumnDto: MoveTaskColumnDto): Promise<TrelloTaskEntity>;
    abstract deleteTrelloTaskById(dto: jwtDto, taskId: string): Promise<void>;

}