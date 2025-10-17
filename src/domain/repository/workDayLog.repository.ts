import { WorkDayLogEntity } from "../entities/workDayLog.entity";
import { CloseLogDto, jwtDto, OpenLogDto } from "../dtos";

export abstract class WorkDayLogRepository {
  abstract getUserWorkWeekLogs(dto: jwtDto): Promise<WorkDayLogEntity[]>;
  abstract openLog(dto: jwtDto, openLogDto: OpenLogDto): Promise<WorkDayLogEntity>;
  abstract closeLog(dto: jwtDto, closeLogDto:CloseLogDto): Promise<WorkDayLogEntity>;
  abstract markAsAbsentLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
  abstract getTodayWorkLog(dto: jwtDto): Promise<WorkDayLogEntity>;


}
