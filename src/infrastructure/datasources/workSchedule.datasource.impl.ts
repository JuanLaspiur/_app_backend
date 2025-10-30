import { WorkScheduleDataSource, WorkScheduleEntity, CustomError } from "../../domain";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../../domain/dtos";
import { WorkDayLogModel } from "../../data/mogodb";
import { WorkScheduleMapper } from "../mappers/workSchedule.mapper";
import * as useCases from "../../domain/use-cases/workSchedule";

export class WorkScheduleDataSourceImpl implements WorkScheduleDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
        return userId;
    }

  async createWorkShedule(dto: jwtDto, createDto: CreateWorkScheduleDto): Promise<WorkScheduleEntity> {
    try {
      const userId = this.authorize(dto);

      const workShedule = await useCases.Create.execute(userId, createDto);
      
      return WorkScheduleMapper.toEntity(workShedule);
    } catch (error) {
      this.handleError(error);
    }
  }


  async updateWorkShedule(updateDto: UpdateWorkScheduleDto): Promise<WorkScheduleEntity> {
    try {
      const updated = await useCases.Update.execute(updateDto.id, updateDto);

      if (!updated) throw CustomError.notFound("Work schedule not found");
      return WorkScheduleMapper.toEntity(updated);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteWorkShedule(workScheduleId: string): Promise<void> {
    try {
      await useCases.Delete.execute(workScheduleId);
    } catch (error) {
      this.handleError(error);
    }

  }

  async deleteAllUserWorkShedules(dto: jwtDto): Promise<void> {
    try {
      const userId = this.authorize(dto);

      await WorkDayLogModel.deleteMany({ userId });
      await useCases.DeleteAllFromUser.execute(userId);

    } catch (error) {
      this.handleError(error);
    }
  }


  async getAllUserWorkShedules(dto: jwtDto): Promise<WorkScheduleEntity[]> {
    try {
      const userId = this.authorize(dto);

      const docs = await useCases.GetAllByUserId.execute(userId);
      return WorkScheduleMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }
  async getAllUserWorkShedulesByUserId(dto: jwtDto, userId: string): Promise<WorkScheduleEntity[]> {
    try {
      this.authorize(dto)
      
      const docs = await useCases.GetAllByUserId.execute(userId);
      return WorkScheduleMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

}
