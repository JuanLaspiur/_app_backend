import { WorkScheduleEntity } from "../entities/workSchedule.entity";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../dtos";

export abstract class WorkScheduleDataSource {
    abstract createWorkShedule(dto:jwtDto, createDto:CreateWorkScheduleDto ):Promise<WorkScheduleEntity>; 
    abstract updateWorkShedule(updateDto:UpdateWorkScheduleDto ):Promise<WorkScheduleEntity>; 
    abstract deleteWorkShedule(workScheduleId:string):Promise<void>; 
    abstract deleteAllUserWorkShedules(dto:jwtDto):Promise<void>; 
    abstract getAllUserWorkShedules(dto:jwtDto):Promise<WorkScheduleEntity[]>;

}
