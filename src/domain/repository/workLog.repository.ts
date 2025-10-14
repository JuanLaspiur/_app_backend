import { WorkLogEntity } from "../entities/workLog.entity";
import { jwtDto } from "../dtos";

export abstract class WorkLogRepository {
  abstract createLog(dto: jwtDto, scheduleId: string): Promise<WorkLogEntity>;
  abstract closeLog(dto: jwtDto, logId: string): Promise<WorkLogEntity>;
  abstract getAllUserLogs(dto: jwtDto): Promise<WorkLogEntity[]>;
  abstract getLogsByDateRange(dto: jwtDto, startDate: Date, endDate: Date): Promise<WorkLogEntity[]>;
  abstract deleteLog(logId: string): Promise<void>;
}
