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

  deleteWorkShedule(workScheduleId: string): Promise<void> {
    return this.workScheduleDataSource.deleteWorkShedule(workScheduleId);
  }
  deleteAllUserWorkShedules(dto: jwtDto): Promise<void> {
    return this.workScheduleDataSource.deleteAllUserWorkShedules(dto);
  }

  getAllUserWorkShedules(dto: jwtDto): Promise<WorkScheduleEntity[]> {
    return this.workScheduleDataSource.getAllUserWorkShedules(dto);
  }

  getAllUserWorkShedulesByUserId(dto: jwtDto, userId: string): Promise<WorkScheduleEntity[]> {
     return this.workScheduleDataSource.getAllUserWorkShedulesByUserId(dto,userId);
  }

}