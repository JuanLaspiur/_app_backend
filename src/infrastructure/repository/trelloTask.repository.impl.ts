import { TrelloTaskDataSource, TrelloTaskEntity, TrelloTaskRepository } from "../../domain";
import { jwtDto, CreateTrelloTaskDto, MoveTaskColumnDto, UpdateMemberTaskDto } from "../../domain/dtos";

export class TrelloTaskRepositoryImpl implements TrelloTaskRepository {

    constructor(private readonly dataSource: TrelloTaskDataSource) { }


    createTrelloTask(dto: jwtDto, createTaskDto: CreateTrelloTaskDto): Promise<TrelloTaskEntity> {
        return this.dataSource.createTrelloTask(dto, createTaskDto);
    }
    getAllTrelloTaskByColumnId(dto: jwtDto, columnId: string): Promise<TrelloTaskEntity[]> {
        return this.dataSource.getAllTrelloTaskByColumnId(dto, columnId);
    }
    addMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity> {
        return this.dataSource.addMember(dto, updateMemberTaskDto);
    }
    removeMember(dto: jwtDto, updateMemberTaskDto: UpdateMemberTaskDto): Promise<TrelloTaskEntity> {
        return this.dataSource.removeMember(dto, updateMemberTaskDto);
    }
    moveTaskToColumn(dto: jwtDto, moveTaskColumnDto: MoveTaskColumnDto): Promise<TrelloTaskEntity> {
        return this.dataSource.moveTaskToColumn(dto, moveTaskColumnDto);
    }
    deleteTrelloTaskById(dto: jwtDto, taskId: string): Promise<void> {
         return this.dataSource.deleteTrelloTaskById(dto, taskId);
    }


}