import { WorkDayLogEntity } from "../entities/workDayLog.entity";
import { jwtDto } from "../dtos";

export abstract class WorkDayLogDataSource {
  abstract openLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
  abstract closeLog(dto: jwtDto, logId: string): Promise<WorkDayLogEntity>;
}
