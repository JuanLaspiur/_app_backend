import { WorkScheduleDataSource, WorkScheduleEntity, CustomError } from "../../domain";
import { jwtDto, CreateWorkScheduleDto, UpdateWorkScheduleDto } from "../../domain/dtos";
import { WorkDayLogModel, WorkScheduleModel } from "../../data/mogodb";
import { WorkScheduleMapper } from "../mappers/workSchedule.mapper";

export class WorkScheduleDataSourceImpl implements WorkScheduleDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

async createWorkShedule(dto: jwtDto, createDto: CreateWorkScheduleDto): Promise<WorkScheduleEntity> {
  const userId = this.verifyToken(dto);
  if (!userId) throw CustomError.unauthorized('Error AuthToken');

  const [error, validDto] = CreateWorkScheduleDto.create(createDto);
  if (error || !validDto) throw CustomError.badRequest('Bad Request');

  const doc = await WorkScheduleModel.findOneAndUpdate(
    { userId, day: validDto.day }, 
    { userId, ...validDto },       
    { new: true, upsert: true }   
  );

  return WorkScheduleMapper.toEntity(doc);
}


  async updateWorkShedule(updateDto: UpdateWorkScheduleDto): Promise<WorkScheduleEntity> {
    try {
      const [error, validDto] = UpdateWorkScheduleDto.create(updateDto);
      if (error || !validDto) throw CustomError.badRequest(error ?? "Invalid update data");

      const updated = await WorkScheduleModel.findByIdAndUpdate(
        validDto.id,
        { ...validDto, updatedAt: new Date() },
        { new: true }
      );

      if (!updated) throw CustomError.notFound("Work schedule not found");
      return WorkScheduleMapper.toEntity(updated);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteWorkShedule(workScheduleId: string): Promise<void> {
    const deleted = await WorkScheduleModel.findByIdAndDelete(workScheduleId);
    if (!deleted) throw CustomError.notFound("Work schedule not found");
  }

  async deleteAllUserWorkShedules(dto: jwtDto): Promise<void> {
    const userId = this.verifyToken(dto);
    if (!userId) throw CustomError.unauthorized('Error AuthToken');
    await WorkDayLogModel.deleteMany({ userId });
    await WorkScheduleModel.deleteMany({ userId });
  }


  async getAllUserWorkShedules(dto: jwtDto): Promise<WorkScheduleEntity[]> {
    try {
      const userId = this.verifyToken(dto);

      const docs = await WorkScheduleModel.find({ userId });
      return WorkScheduleMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }


}
