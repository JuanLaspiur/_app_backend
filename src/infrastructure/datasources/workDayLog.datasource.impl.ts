import { CustomError, WorkDayLogDataSource, WorkDayLogEntity } from "../../domain";
import { CloseLogDto, jwtDto, OpenLogDto } from "../../domain/dtos";
import { WorkDayStatus } from "../../data/mogodb";
import { WorkDayLogMapper } from "../mappers/workDayLog.mapper";
import { determineAttendanceStatus } from "../../config/helpers/status.helper";
import * as scheduleUseCase from '../../domain/use-cases/workSchedule'
import * as LogUseCase from "../../domain/use-cases/workDayLog";

export class WorkDayLogDataSourceImpl implements WorkDayLogDataSource {

  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }


  private authorize(dto: jwtDto) {
    const userId = this.verifyToken(dto);
    if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");
    return userId;
  }


  private async getLogById(logId: string) {
    return LogUseCase.GetById.execute(logId);
  }
  

  async openLog(dto: jwtDto, openLogDto: OpenLogDto): Promise<WorkDayLogEntity> {
    try {
      this.authorize(dto);

      const workdaylog = await this.getLogById(openLogDto.logId);

      const workSchedule = await scheduleUseCase.GetById.execute(workdaylog.scheduleId);

      workdaylog.status = determineAttendanceStatus(workSchedule.startTime);
      workdaylog.checkIn = new Date();
      await workdaylog.save();

      return WorkDayLogMapper.toEntity(workdaylog);
    } catch (error) {
      this.handleError(error);
    }
  }

  async closeLog(dto: jwtDto, closeLog: CloseLogDto): Promise<WorkDayLogEntity> {
    try {
      this.authorize(dto);

      const workdaylog = await this.getLogById(closeLog.logId);

      workdaylog.checkOut = new Date();
      await workdaylog.save();

      return WorkDayLogMapper.toEntity(workdaylog);
    } catch (error) {
      this.handleError(error);
    }
  }

  async markAsAbsentLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
    try {
      this.authorize(dto);

      const workdaylog = await this.getLogById(logId);
      workdaylog.status = WorkDayStatus.ABSENT;
      await workdaylog.save();

      return WorkDayLogMapper.toEntity(workdaylog);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]> {
    try {
      const userId = this.authorize(dto);

      const workdayLogs = await LogUseCase.GetAllByUserId.execute(userId);

      return WorkDayLogMapper.toEntitiesWithPopulate(workdayLogs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTodayWorkLog(dto: jwtDto): Promise<WorkDayLogEntity> {
    try {
      const userId = this.authorize(dto);

      const todaySchedule = await scheduleUseCase.GetToday.execute(userId);

      const todayLog = await scheduleUseCase.GetTodayByScheduleId.execute(todaySchedule.id);

      return WorkDayLogMapper.toEntityWithPopulate(todayLog);
    } catch (error) {
      this.handleError(error);
    }
  }
}
