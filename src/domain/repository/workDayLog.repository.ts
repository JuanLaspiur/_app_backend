import { WorkDayLogEntity } from "../entities/workDayLog.entity";
import { jwtDto } from "../dtos";

export abstract class WorkDayLogRepository {
  abstract getUserWorkWeekLogs(dto:jwtDto):Promise<WorkDayLogEntity[]>;
  abstract openLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
  abstract closeLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
}
