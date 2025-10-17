import { WorkDayLogDataSource, WorkDayLogEntity, WorkDayLogRepository } from "../../domain";
import { CloseLogDto, jwtDto, OpenLogDto } from "../../domain/dtos";

export class WorkDayLogRepositoryImpl implements WorkDayLogRepository {

  constructor(
    private readonly datasource: WorkDayLogDataSource
  ) { }


  getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]> {
    return this.datasource.getUserWorkWeekLogs(dto);
  }
  openLog(dto: jwtDto, openLogDto: OpenLogDto): Promise<WorkDayLogEntity> {
    return this.datasource.openLog(dto, openLogDto);
  }
  closeLog(dto: jwtDto, closeLogDto: CloseLogDto): Promise<WorkDayLogEntity> {
    return this.datasource.closeLog(dto, closeLogDto);
  }
  markAsAbsentLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity> {
      return this.datasource.markAsAbsentLog(dto, logId);
  }
  getTodayWorkLog(dto: jwtDto): Promise<WorkDayLogEntity> {
    return this.datasource.getTodayWorkLog(dto);
  }



}