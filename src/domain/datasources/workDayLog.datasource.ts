import { WorkDayLogEntity } from "../entities/workDayLog.entity";
import { jwtDto, OpenLogDto, CloseLogDto } from "../dtos";

 // TO DO
 // hacer dto

export abstract class WorkDayLogDataSource {
  abstract getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]>;
  abstract openLog(dto: jwtDto, openLogDto: OpenLogDto): Promise<WorkDayLogEntity>;
  abstract closeLog(dto: jwtDto, closeLogDto:CloseLogDto): Promise<WorkDayLogEntity>;
  abstract markAsAbsentLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
  abstract getTodayWorkLog(dto: jwtDto): Promise<WorkDayLogEntity>;

}
