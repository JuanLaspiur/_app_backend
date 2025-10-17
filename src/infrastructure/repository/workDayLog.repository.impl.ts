import { WorkDayLogDataSource, WorkDayLogEntity, WorkDayLogRepository } from "../../domain";
import { jwtDto } from "../../domain/dtos";

export class WorkDayLogRepositoryImpl implements WorkDayLogRepository {

  constructor(
    private readonly datasource: WorkDayLogDataSource
  ) { }


  getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]> {
    return this.datasource.getUserWorkWeekLogs(dto);
  }
  openLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
    return this.datasource.openLog(dto, logId);
  }
  closeLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
    return this.datasource.closeLog(dto, logId);
  }
  markAsAbsentLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
      return this.datasource.markAsAbsentLog(dto, logId);
  }
  getTodayWorkLog(dto: jwtDto): Promise<WorkDayLogEntity> {
    return this.datasource.getTodayWorkLog(dto);
  }



}