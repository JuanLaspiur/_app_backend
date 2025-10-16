import { WorkLogDataSource, WorkLogEntity } from "../../domain";
import { jwtDto } from "../../domain/dtos";
import { WorkLogModel, WorkScheduleModel } from "../../data/mogodb";
import { WorkLogMapper } from "../mappers/workLog.mapper";

export class WorkLogDataSourceImpl implements WorkLogDataSource {

  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}
async openLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {

}

  closeLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {
    throw new Error("Method not implemented.");
  }
/*
  async openLog(dto: jwtDto, scheduleId: string): Promise<WorkLogEntity> {
    try {
      const userId = this.verifyToken(dto);
      const log = await WorkLogModel.create({
        userId,
        scheduleId,
        checkIn: new Date(),
      });
      return WorkLogMapper.toEntity(log);
    } catch (error) {
      this.handleError(error);
    }
  }

  async closeLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {
    try {
      const userId = this.verifyToken(dto);
      const log = await WorkLogModel.findOneAndUpdate(
        { _id: logId, userId },
        { checkOut: new Date() },
        { new: true }
      );
      if (!log) throw new Error("Log not found");
      return WorkLogMapper.toEntity(log);
    } catch (error) {
      this.handleError(error);
    }
  }
*/
}
