import { WorkScheduleDataSource, WorkScheduleEntity, WorkScheduleRepository } from "../../domain";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../../domain/dtos";

export class WorkScheduleRepositoryImpl implements WorkScheduleRepository {

    constructor(private readonly workScheduleDataSource: WorkScheduleDataSource) { }

    createWorkShedule(dto: jwtDto, createDto: CreateWorkScheduleDto): Promise<WorkScheduleEntity> {
        return this.workScheduleDataSource.createWorkShedule(dto, createDto);
    }
    updateWorkShedule(updateDto: UpdateWorkScheduleDto): Promise<WorkScheduleEntity> {
        return this.workScheduleDataSource.updateWorkShedule(updateDto);
    }
    getAllUserWorkShedules(dto: jwtDto): Promise<WorkScheduleEntity[]> {
        return this.workScheduleDataSource.getAllUserWorkShedules(dto);
    }



}