import { CustomError, WorkDayLogDataSource, WorkDayLogEntity } from "../../domain";
import { jwtDto } from "../../domain/dtos";
import { WorkDayLogModel, WorkScheduleModel, WorkDayStatus } from "../../data/mogodb";
import { WorkDayLogMapper } from "../mappers/workDayLog.mapper";

export class WorkDayLogDataSourceImpl implements WorkDayLogDataSource {

  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

  async getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]> {
    const userId = this.verifyToken(dto);
    try {

      const workdaysLogs = await WorkDayLogModel.find({ userId })
        .populate({
          path: 'scheduleId',
          model: 'Work_Schedule',
          select: 'id userId day startTime endTime isWorkday',
        })
        .exec();

      return WorkDayLogMapper.toEntitiesWithPopulate(workdaysLogs);
    } catch (error) {
      this.handleError(error);
    }
  }


  async openLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
    const userId = this.verifyToken(dto);

    try {
      if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");

      const workdaylog = await WorkDayLogModel.findById(logId);
      if (!workdaylog) throw CustomError.badRequest("Work day log not found");

      const workSchedule = await WorkScheduleModel.findById(workdaylog.scheduleId);
      if (!workSchedule) throw CustomError.badRequest("Work schedule not found");

      const [hours, minutes] = workSchedule.startTime.split(":").map(Number);
      const scheduledStart = new Date();
      scheduledStart.setHours(hours, minutes, 0, 0);

      const now = new Date();
      const diffMinutes = (now.getTime() - scheduledStart.getTime()) / (1000 * 60);

      workdaylog.status = diffMinutes <= 15 ? WorkDayStatus.ATTENDED : WorkDayStatus.LATE;
      workdaylog.checkIn = now;

      await workdaylog.save();

      return WorkDayLogMapper.toEntity(workdaylog);
    } catch (error) {
      this.handleError(error);
    }
  }

  async closeLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
    const userId = this.verifyToken(dto);
    try {
      if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");

      const workdaylog = await WorkDayLogModel.findById(logId);
      if (!workdaylog) throw CustomError.badRequest("Work day log not found");

      const now = new Date();
      workdaylog.checkOut = now;

      await workdaylog.save();

      return WorkDayLogMapper.toEntity(workdaylog);
    } catch (error) {
      this.handleError(error);
    }
  }

}
