import { WorkScheduleEntity } from "../entities/workSchedule.entity";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../dtos";

export abstract class WorkScheduleRepository {
    abstract createWorkShedule(dto: jwtDto, createDto: CreateWorkScheduleDto): Promise<WorkScheduleEntity>;
    abstract updateWorkShedule(updateDto: UpdateWorkScheduleDto): Promise<WorkScheduleEntity>;
    abstract deleteWorkShedule(workScheduleId: string): Promise<void>;
    abstract deleteAllUserWorkShedules(dto: jwtDto): Promise<void>;
    abstract getAllUserWorkShedulesByUserId(dto: jwtDto, userId: string): Promise<WorkScheduleEntity[]>;
    abstract getAllUserWorkShedules(dto: jwtDto): Promise<WorkScheduleEntity[]>;

}